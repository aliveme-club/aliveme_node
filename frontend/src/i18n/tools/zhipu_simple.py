from zhipuai import ZhipuAI

# 初始化客户端
client = ZhipuAI(api_key="")  # 请填写您自己的APIKey

# 调用API
response = client.chat.completions.create(
    model="glm-z1-airx",  # 请填写您要调用的模型名称
    messages=[
        {"role": "user", "content": "一个袋子中有5个红球和3个蓝球,随机抽取2个球,抽到至少1个红球的概率为:"}
    ],
    max_tokens=12000,
)

# 打印响应
print(response)

# 提取并打印回答内容
print("\n=== 回答内容 ===")
print(response.choices[0].message.content) 