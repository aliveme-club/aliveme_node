import json
import base64
import hmac
import hashlib
import datetime
import ssl
import _thread as thread
import websocket
import time
import random
import re
from urllib.parse import urlparse, urlencode
from time import mktime
from wsgiref.handlers import format_date_time

# API限流配置
MAX_RETRIES = 3  # 最大重试次数
BASE_DELAY = 1.0  # 基础延迟时间(秒)
MAX_DELAY = 5.0  # 最大延迟时间(秒)
QPS_DELAY = 0.5  # QPS限制为2，所以每个请求间隔0.5秒

class TranslationResult:
    def __init__(self):
        self.translated_text = ""
        self.is_complete = False
        self.error = None

class Ws_Param(object):
    # 初始化
    def __init__(self, APPID, APIKey, APISecret, gpt_url):
        self.APPID = APPID
        self.APIKey = APIKey
        self.APISecret = APISecret
        self.host = urlparse(gpt_url).netloc
        self.path = urlparse(gpt_url).path
        self.gpt_url = gpt_url

    # 生成url
    def create_url(self):
        # 生成RFC1123格式的时间戳
        now = datetime.datetime.now()
        date = format_date_time(mktime(now.timetuple()))

        # 拼接字符串
        signature_origin = "host: " + self.host + "\n"
        signature_origin += "date: " + date + "\n"
        signature_origin += "GET " + self.path + " HTTP/1.1"

        # 进行hmac-sha256进行加密
        signature_sha = hmac.new(self.APISecret.encode('utf-8'), signature_origin.encode('utf-8'),
                                 digestmod=hashlib.sha256).digest()

        signature_sha_base64 = base64.b64encode(signature_sha).decode(encoding='utf-8')

        authorization_origin = f'api_key="{self.APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="{signature_sha_base64}"'

        authorization = base64.b64encode(authorization_origin.encode('utf-8')).decode(encoding='utf-8')

        # 将请求的鉴权参数组合为字典
        v = {
            "authorization": authorization,
            "date": date,
            "host": self.host
        }
        # 拼接鉴权参数，生成url
        url = self.gpt_url + '?' + urlencode(v)
        return url

# 带重试机制的延迟函数
def delay_with_backoff(retry_count):
    # 指数退避算法: delay = base_delay * (2^retry_count) + random_jitter
    delay = min(BASE_DELAY * (2 ** retry_count) + random.uniform(0, 1), MAX_DELAY)
    print(f"  等待 {delay:.2f} 秒后重试...")
    time.sleep(delay)

# 调用讯飞星火API翻译文本
def translate_text(text, target_language, api_config):
    """
    使用讯飞星火API翻译文本
    
    Args:
        text: 要翻译的文本
        target_language: 目标语言代码 ('en-US' 或 'zh-TW')
        api_config: API配置字典，包含以下键:
            - app_id: 应用ID
            - api_secret: API密钥
            - api_key: API密钥
            - url: API URL
            - domain: 模型版本
            
    Returns:
        str: 翻译后的文本
        
    Raises:
        Exception: 当API调用失败时抛出异常
    """
    if not text:
        return ""
    
    # 构建提示
    if target_language == 'en-US':
        prompt = f"我正在做i18n的多语言UI设计，帮我把以下中文文本翻译为英文，直接给我最终的翻译结果，不要其他内容：\n\n{text}"
    else:  # zh-TW
        prompt = f"我正在做i18n的多语言UI设计，帮我把以下简体中文文本翻译为繁体中文，直接给我最终的翻译结果，不要其他内容：\n\n{text}"
    
    # 不再使用重试机制，直接调用API
    result = TranslationResult()
    
    def on_message(ws, message):
        data = json.loads(message)
        code = data['header']['code']
        if code != 0:
            result.error = f"请求错误: {code}, {data}"
            ws.close()
        else:
            choices = data["payload"]["choices"]
            status = choices["status"]
            content = choices["text"][0]["content"]
            result.translated_text += content
            if status == 2:
                result.is_complete = True
                ws.close()
    
    def on_error(ws, error):
        result.error = f"连接错误: {error}"
        ws.close()
    
    def on_close(ws, close_status_code=None, close_msg=None):
        pass
    
    def on_open(ws):
        def run(*args):
            data = json.dumps(gen_params(appid=ws.appid, query=ws.query, domain=ws.domain))
            ws.send(data)
        thread.start_new_thread(run, ())
    
    def gen_params(appid, query, domain):
        data = {
            "header": {
                "app_id": appid,
                "uid": "12345",  # 可选字段
            },
            "parameter": {
                "chat": {
                    "domain": domain,
                    "temperature": 0.3,
                    "max_tokens": 2048,
                }
            },
            "payload": {
                "message": {
                    "text": [{"role": "user", "content": query}]
                }
            }
        }
        return data
    
    try:
        wsParam = Ws_Param(api_config['app_id'], api_config['api_key'], 
                          api_config['api_secret'], api_config['url'])
        websocket.enableTrace(False)
        wsUrl = wsParam.create_url()
        
        ws = websocket.WebSocketApp(wsUrl, 
                                  on_message=on_message, 
                                  on_error=on_error, 
                                  on_close=on_close, 
                                  on_open=on_open)
        ws.appid = api_config['app_id']
        ws.query = prompt
        ws.domain = api_config['domain']
        ws.run_forever(sslopt={"cert_reqs": ssl.CERT_NONE})
        
        if result.error:
            # 直接抛出异常，不再重试
            raise Exception(result.error)
        
        # 成功获取翻译结果
        return result.translated_text
    
    except Exception as e:
        # 直接抛出异常，不再重试
        raise Exception(f"星火API调用失败: {e}")

# 翻译对象
def translate_object(obj, target_language, api_config):
    """
    翻译对象中的所有字符串
    
    Args:
        obj: 要翻译的对象
        target_language: 目标语言代码
        api_config: API配置
        
    Returns:
        dict: 翻译后的对象
    """
    translated_obj = {}
    
    for key, value in obj.items():
        if isinstance(value, dict):
            # 递归翻译嵌套对象
            translated_obj[key] = translate_object(value, target_language, api_config)
        elif isinstance(value, list):
            # 翻译列表中的每个元素
            if all(isinstance(item, str) for item in value):
                # 如果列表中全是字符串，一次性翻译
                list_text = "\n".join([f"{i+1}. {item}" for i, item in enumerate(value)])
                translated_list_text = translate_text(list_text, target_language, api_config)
                # 解析翻译后的列表
                translated_items = []
                for line in translated_list_text.split("\n"):
                    # 去除序号和可能的空格
                    match = re.match(r'\d+\.\s*(.*)', line)
                    if match:
                        translated_items.append(match.group(1))
                translated_obj[key] = translated_items
            else:
                # 复杂列表，逐项翻译
                translated_items = []
                for item in value:
                    if isinstance(item, dict):
                        translated_items.append(translate_object(item, target_language, api_config))
                    elif isinstance(item, str):
                        translated_items.append(translate_text(item, target_language, api_config))
                        # 添加QPS限制的延迟
                        time.sleep(QPS_DELAY)
                    else:
                        translated_items.append(item)
                translated_obj[key] = translated_items
        elif isinstance(value, str):
            # 翻译字符串
            translated_obj[key] = translate_text(value, target_language, api_config)
            # 添加QPS限制的延迟
            time.sleep(QPS_DELAY)
        else:
            # 非字符串值保持不变
            translated_obj[key] = value
    
    return translated_obj 