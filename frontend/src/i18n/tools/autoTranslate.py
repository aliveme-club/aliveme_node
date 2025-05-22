import os
import time
import re
from pathlib import Path
import random
import sys

# 导入自定义模块
from js_parser import read_js_file, dict_to_js_object
from spark_api import translate_object as spark_translate_object
from glm_flash_api import GLMFlashAPI

# 配置参数
SOURCE_LOCALE = 'zh-CN'
TARGET_LOCALES = ['en-US', 'zh-TW']
# 修正相对路径，使用绝对路径
SCRIPT_DIR = Path(os.path.dirname(os.path.abspath(__file__)))
LOCALES_PATH = SCRIPT_DIR.parent / 'locales'  # 使用绝对路径

# 讯飞星火API配置
SPARK_API_CONFIG = {
    'app_id': 'a3e9246e',  # 替换为你的APP ID
    'api_secret': 'N2MwNzViZTQ1YTliMTU3ZTMyZjBmNmRl',  # 替换为你的API SECRET
    'api_key': '068d90a2de701871ca96e813f7629754',  # 替换为你的API KEY
    'url': 'wss://spark-api.xf-yun.com/v1.1/chat',  # Lite环境的地址
    'domain': 'lite'  # 指定访问的模型版本
}

# 智谱GLM API配置
GLM_API_KEY = "4dd76198187b261ddb4f4d192dc35348.ZNjOtDmr64Wn4LD7"  # 智谱API密钥

# API限流配置
QPS_DELAY = 0.5  # QPS限制为2，所以每个请求间隔0.5秒

# API交替使用配置
API_COUNTER = 0  # API调用计数器
GLM_API_COUNT = 4  # 每次使用讯飞API后，连续使用GLM API的次数
LAST_SPARK_TIME = 0  # 上次使用讯飞API的时间戳

# 初始化GLM API客户端
glm_api = GLMFlashAPI(GLM_API_KEY)

# 确保目录存在
def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

# 检查目标语言文件是否都已存在
def check_target_files_exist(source_file, target_locales):
    """
    检查目标语言文件是否都已存在
    
    Args:
        source_file: 源文件路径
        target_locales: 目标语言列表
        
    Returns:
        dict: 每种语言的文件是否存在 {locale: exists}
    """
    result = {}
    rel_path = source_file.relative_to(LOCALES_PATH / SOURCE_LOCALE)
    
    for locale in target_locales:
        target_file = LOCALES_PATH / locale / rel_path
        result[locale] = target_file.exists()
    
    return result

# 翻译对象
def translate_object(obj, target_language):
    """
    使用智谱GLM API翻译对象
    
    Args:
        obj: 要翻译的对象
        target_language: 目标语言代码
        
    Returns:
        dict: 翻译后的对象
    """
    print("  使用智谱GLM API进行翻译...")
    try:
        return glm_api.translate_object(obj, target_language)
    except Exception as e:
        print(f"  翻译出错: {e}")
        return obj  # 如果翻译失败，返回原对象

# 处理单个文件
def process_file(source_file, target_language):
    try:
        # 确定目标文件路径
        rel_path = source_file.relative_to(LOCALES_PATH / SOURCE_LOCALE)
        target_file = LOCALES_PATH / target_language / rel_path
        
        # 确保目标目录存在
        ensure_dir(target_file.parent)
        
        print(f"处理文件: {source_file} -> {target_file}")
        
        # 如果目标文件已存在，跳过处理
        if target_file.exists():
            print(f"  文件已存在: {target_file}")
            return
        
        # 读取源文件
        source_data = read_js_file(source_file)
        if not source_data:
            print(f"  跳过空文件: {source_file}")
            return
        
        # 翻译内容
        print(f"  翻译文件内容...")
        translated_data = translate_object(source_data, target_language)
        
        # 写入目标文件
        js_content = dict_to_js_object(translated_data)
        with open(target_file, 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print(f"  完成: {target_file}")
    except Exception as e:
        print(f"处理文件 {source_file} 时出错: {e}")

# 主函数
def main():
    source_dir = LOCALES_PATH / SOURCE_LOCALE
    
    if not source_dir.exists():
        print(f"源目录不存在: {source_dir}")
        print(f"当前脚本路径: {SCRIPT_DIR}")
        print(f"尝试查找的翻译目录: {LOCALES_PATH}")
        return
    
    # 仅翻译一个文件进行测试
    test_file = 'common.js'  # 选择一个要翻译的文件
    source_file = source_dir / test_file
    
    if not source_file.exists():
        print(f"测试文件不存在: {source_file}")
        # 尝试列出可用的文件
        print("可用的文件:")
        for file in source_dir.glob('*.js'):
            print(f"  {file.name}")
        return
    
    print(f"正在翻译单个文件: {source_file}")
    
    # 检查目标文件是否存在
    file_exists = check_target_files_exist(source_file, TARGET_LOCALES)
    
    for target_language in TARGET_LOCALES:
        if not file_exists[target_language]:
            process_file(source_file, target_language)
        else:
            print(f"  跳过已存在的文件: {LOCALES_PATH / target_language / source_file.relative_to(LOCALES_PATH / SOURCE_LOCALE)}")

# 如果需要翻译所有文件，可以使用此函数
def translate_all_files():
    source_dir = LOCALES_PATH / SOURCE_LOCALE
    
    if not source_dir.exists():
        print(f"源目录不存在: {source_dir}")
        return
    
    # 遍历源目录中的所有JS文件
    for source_file in source_dir.glob('**/*.js'):
        # 检查目标文件是否存在
        file_exists = check_target_files_exist(source_file, TARGET_LOCALES)
        
        # 如果所有目标文件都已存在，跳过此文件
        if all(file_exists.values()):
            rel_path = source_file.relative_to(LOCALES_PATH / SOURCE_LOCALE)
            print(f"跳过所有语言都已翻译的文件: {rel_path}")
            continue
        
        # 只翻译不存在的目标文件
        for target_language in TARGET_LOCALES:
            if not file_exists[target_language]:
                process_file(source_file, target_language)
            else:
                rel_path = source_file.relative_to(LOCALES_PATH / SOURCE_LOCALE)
                print(f"  跳过已存在的文件: {LOCALES_PATH / target_language / rel_path}")

if __name__ == "__main__":
    print("开始自动翻译...")
    
    # 检查命令行参数
    if len(sys.argv) > 1 and sys.argv[1] == "--test":
        main()  # 仅翻译一个文件进行测试
    else:
        translate_all_files()  # 翻译所有文件
    
    print("翻译完成!") 