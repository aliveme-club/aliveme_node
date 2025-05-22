import json
import asyncio
import websockets
import base64
import hmac
import hashlib
import datetime
from urllib.parse import urlencode
import requests
import _thread as thread
import os
import time
from urllib.parse import urlparse
import ssl
from datetime import datetime
from time import mktime
import websocket
from wsgiref.handlers import format_date_time
# 讯飞星火API配置
SPARKAI_URL = 'wss://spark-api.xf-yun.com/v1/x1'  # 更新为x1模型的地址
SPARKAI_APP_ID = 'a3e9246e'  # 替换为你的APP ID
SPARKAI_API_SECRET = 'N2MwNzViZTQ1YTliMTU3ZTMyZjBmNmRl'  # 替换为你的API SECRET
SPARKAI_API_KEY = '068d90a2de701871ca96e813f7629754'  # 替换为你的API KEY
SPARKAI_DOMAIN = 'x1'  # 指定访问x1模型版本

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
        now = datetime.now()
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

# 收到websocket错误的处理
def on_error(ws, error):
    print("### error:", error)

# 收到websocket关闭的处理
def on_close(ws, close_status_code=None, close_msg=None):
    print("### closed ###")

# 收到websocket连接建立的处理
def on_open(ws):
    ws.messages = []  # 新增行：初始化消息列表
    thread.start_new_thread(run, (ws,))

def run(ws, *args):
    data = json.dumps(gen_params(appid=ws.appid, query=ws.query, domain=ws.domain))
    ws.send(data)

# 收到websocket消息的处理
def on_message(ws, message):
    data = json.loads(message)
    code = data['header']['code']
    if code != 0:
        print(f'请求错误: {code}, {data}')
        ws.close()
    else:
        choices = data["payload"]["choices"]
        status = choices["status"]
        content = choices["text"][0]["content"]
        
        # 这里将内容存储到一个列表中
        ws.messages.append(content)  # 新增行：存储消息内容
        
        if status == 2:
            print("#### 关闭会话")
            # 在会话关闭时输出所有消息
            print("所有消息内容：")
            for msg in ws.messages:  # 新增行：输出所有消息
                print(msg, end='')
            ws.close()

def gen_params(appid, query, domain):
    data = {
        "header": {
            "app_id": appid,
            "uid": "12345",  # 可选字段
        },
        "parameter": {
            "chat": {
                "domain": domain,
                "temperature": 0.5,
                "max_tokens": 1024,
            }
        },
        "payload": {
            "message": {
                "text": [{"role": "user", "content": query}]
            }
        }
    }
    return data

def main(appid, api_secret, api_key, Spark_url, domain, query):
    wsParam = Ws_Param(appid, api_key, api_secret, Spark_url)
    websocket.enableTrace(False)
    wsUrl = wsParam.create_url()

    ws = websocket.WebSocketApp(wsUrl, on_message=on_message, on_error=on_error, on_close=on_close, on_open=on_open)
    ws.appid = appid
    ws.query = query
    ws.domain = domain
    ws.run_forever(sslopt={"cert_reqs": ssl.CERT_NONE})

# 运行测试
if __name__ == "__main__":
    main(
        appid="a3e9246e",  # 替换为你的APP ID
        api_secret="N2MwNzViZTQ1YTliMTU3ZTMyZjBmNmRl",  # 替换为你的API SECRET
        api_key="068d90a2de701871ca96e813f7629754",  # 替换为你的API KEY
        Spark_url="wss://spark-api.xf-yun.com/v1/x1",  # x1模型的地址
        domain="x1",  # x1版本
        query="讲个笑话"
    )

# 请求模型，并将结果输出
def get_answer(messages):  # 确保这里是 messages 而不是 message
    # 初始化请求体
    headers = {
        'Authorization': api_key,
        'content-type': "application/json"
    }
    body = {
        "model": "x1",
        "user": "user_id",
        "messages": messages,  # 确保这里是一个列表
        "stream": True,
        "tools": [
            {
                "type": "web_search",
                "web_search": {
                    "enable": True,
                    "search_mode": "deep"
                }
            }
        ]
    }
    full_response = ""  # 存储返回结果
    isFirstContent = True  # 首帧标识

    response = requests.post(url=url, json=body, headers=headers, stream=True)
    
    # 检查响应状态
    if response.status_code != 200:
        print(f"请求失败: {response.status_code}, {response.text}")
        return full_response

    for chunks in response.iter_lines():
        if chunks and '[DONE]' not in str(chunks):
            data_org = chunks[6:]  # 可能需要根据实际返回格式调整
            
            try:
                chunk = json.loads(data_org)
                text = chunk['choices'][0]['delta']
                
                # 判断思维链状态并输出
                if 'reasoning_content' in text and text['reasoning_content']:
                    reasoning_content = text["reasoning_content"]
                    print(reasoning_content, end="")
                
                # 判断最终结果状态并输出
                if 'content' in text and text['content']:
                    content = text["content"]
                    if isFirstContent:
                        print("\n*******************以上为思维链内容，模型回复内容如下********************\n")
                        isFirstContent = False
                    print(content, end="")
                    full_response += content
            except json.JSONDecodeError:
                print("解析返回数据时出错:", data_org)

    return full_response
