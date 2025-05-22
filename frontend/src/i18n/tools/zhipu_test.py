import os
import json
from zhipuai import ZhipuAI

def test_zhipu_api(api_key, prompt):
    """
    测试智谱AI API
    
    Args:
        api_key: 智谱API密钥
        prompt: 提示词
        
    Returns:
        API响应内容
    """
    try:
        client = ZhipuAI(api_key=api_key)
        response = client.chat.completions.create(
            model="glm-z1-airx",  # 智谱AI的模型名称
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=12000,
        )
        return response
    except Exception as e:
        print(f"API调用出错: {e}")
        return None

def main():
    # 从环境变量获取API密钥，或者直接填写
    api_key = os.environ.get("ZHIPU_API_KEY", "")
    
    if not api_key:
        api_key = input("请输入智谱API密钥: ")
    
    # 测试问题
    test_prompt = "一个袋子中有5个红球和3个蓝球,随机抽取2个球,抽到至少1个红球的概率为:"
    
    print(f"正在调用智谱AI API，问题：{test_prompt}")
    response = test_zhipu_api(api_key, test_prompt)
    
    if response:
        print("\n=== API响应结果 ===")
        print(f"回答内容: {response.choices[0].message.content}")
        print("\n=== 完整响应 ===")
        print(response)

if __name__ == "__main__":
    main() 