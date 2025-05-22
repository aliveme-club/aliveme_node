import ssl
import os
import time
from zhipuai import ZhipuAI

# 解决SSL证书问题
ssl._create_default_https_context = ssl._create_unverified_context

class GLMFlashAPI:
    """智谱GLM-4-flash API封装类"""
    
    def __init__(self, api_key=None):
        """
        初始化API客户端
        
        Args:
            api_key: 智谱API密钥，如果为None则尝试从环境变量获取
        """
        if api_key is None:
            api_key = os.environ.get("ZHIPU_API_KEY", "")
            if not api_key:
                raise ValueError("未提供API密钥，请通过参数传入或设置ZHIPU_API_KEY环境变量")
        
        self.api_key = api_key
        self.client = ZhipuAI(api_key=api_key)
        self.use_proxy = False
    
    def set_proxy(self, enable=True, proxy_url="http://127.0.0.1:7890"):
        """
        设置HTTP代理
        
        Args:
            enable: 是否启用代理
            proxy_url: 代理URL
        """
        if enable:
            os.environ["HTTP_PROXY"] = proxy_url
            os.environ["HTTPS_PROXY"] = proxy_url
            self.use_proxy = True
        else:
            if "HTTP_PROXY" in os.environ:
                del os.environ["HTTP_PROXY"]
            if "HTTPS_PROXY" in os.environ:
                del os.environ["HTTPS_PROXY"]
            self.use_proxy = False
    
    def translate(self, text, target_language, retry_count=3):
        """
        翻译文本
        
        Args:
            text: 要翻译的文本
            target_language: 目标语言代码 ('en-US' 或 'zh-TW')
            retry_count: 重试次数
            
        Returns:
            str: 翻译后的文本，如果翻译失败则返回原文本
        """
        if not text:
            return ""
        
        # 构建提示
        if target_language == 'en-US':
            prompt = f"我正在做i18n的多语言UI设计，帮我把以下中文文本翻译为英文，直接给我最终的翻译结果，不要其他内容：\n\n{text}"
        else:  # zh-TW
            prompt = f"我正在做i18n的多语言UI设计，帮我把以下简体中文文本翻译为繁体中文，直接给我最终的翻译结果，不要其他内容：\n\n{text}"
        
        # 重试机制
        for attempt in range(retry_count):
            try:
                response = self.client.chat.completions.create(
                    model="glm-4-flash",  # 使用flash模型
                    messages=[
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=4096,
                )
                
                # 提取翻译结果
                translated_text = response.choices[0].message.content
                return translated_text.strip()
                
            except Exception as e:
                print(f"  翻译尝试 {attempt + 1}/{retry_count} 失败: {e}")
                
                # 如果还没有使用代理且不是最后一次尝试，尝试使用代理
                if not self.use_proxy and attempt == 0:
                    print("  尝试使用代理重新连接...")
                    self.set_proxy(True)
                
                # 如果不是最后一次尝试，等待后重试
                if attempt < retry_count - 1:
                    delay = (attempt + 1) * 2  # 递增延迟
                    print(f"  等待 {delay} 秒后重试...")
                    time.sleep(delay)
                else:
                    print("  翻译失败，返回原文本")
                    return text
        
        return text
    
    def translate_object(self, obj, target_language):
        """
        翻译对象中的所有字符串
        
        Args:
            obj: 要翻译的对象
            target_language: 目标语言代码
            
        Returns:
            dict: 翻译后的对象
        """
        translated_obj = {}
        
        for key, value in obj.items():
            if isinstance(value, dict):
                # 递归翻译嵌套对象
                translated_obj[key] = self.translate_object(value, target_language)
            elif isinstance(value, list):
                # 翻译列表中的每个元素
                if all(isinstance(item, str) for item in value):
                    # 如果列表中全是字符串，一次性翻译
                    list_text = "\n".join([f"{i+1}. {item}" for i, item in enumerate(value)])
                    translated_list_text = self.translate(list_text, target_language)
                    # 解析翻译后的列表
                    translated_items = []
                    for line in translated_list_text.split("\n"):
                        # 去除序号和可能的空格
                        import re
                        match = re.match(r'\d+\.\s*(.*)', line)
                        if match:
                            translated_items.append(match.group(1))
                    translated_obj[key] = translated_items
                else:
                    # 复杂列表，逐项翻译
                    translated_items = []
                    for item in value:
                        if isinstance(item, dict):
                            translated_items.append(self.translate_object(item, target_language))
                        elif isinstance(item, str):
                            translated_items.append(self.translate(item, target_language))
                        else:
                            translated_items.append(item)
                    translated_obj[key] = translated_items
            elif isinstance(value, str):
                # 翻译字符串
                translated_obj[key] = self.translate(value, target_language)
            else:
                # 非字符串值保持不变
                translated_obj[key] = value
        
        return translated_obj

# 简单测试
if __name__ == "__main__":
    # 从环境变量获取API密钥，或者直接填写
    api_key = os.environ.get("ZHIPU_API_KEY", "")
    
    if not api_key:
        api_key = input("请输入智谱API密钥: ")
    
    api = GLMFlashAPI(api_key)
    
    # 测试翻译
    test_text = "你好，世界！这是一个测试。"
    print(f"原文: {test_text}")
    
    # 翻译为英文
    en_text = api.translate(test_text, "en-US")
    print(f"英文翻译: {en_text}")
    
    # 翻译为繁体中文
    tw_text = api.translate(test_text, "zh-TW")
    print(f"繁体中文翻译: {tw_text}")
    
    # 测试对象翻译
    test_obj = {
        "title": "测试标题",
        "description": "这是一段描述文本",
        "items": ["项目一", "项目二", "项目三"],
        "nested": {
            "key": "嵌套值"
        }
    }
    
    print("\n测试对象翻译:")
    print(f"原对象: {test_obj}")
    
    # 翻译为英文
    en_obj = api.translate_object(test_obj, "en-US")
    print(f"英文翻译对象: {en_obj}") 