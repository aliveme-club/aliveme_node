import json
import re

# 读取JS文件并提取翻译对象
def read_js_file(file_path):
    """
    读取JS文件并将export default对象转换为Python字典
    
    Args:
        file_path: JS文件路径
        
    Returns:
        dict: 解析后的对象，解析失败则返回空字典
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 提取export default {...}中的内容
        match = re.search(r'export\s+default\s+(\{[\s\S]*\})', content)
        if not match:
            print(f"无法在文件中找到export default语句: {file_path}")
            return {}
        
        # 将JS对象字符串转换为Python字典
        js_obj_str = match.group(1)
        
        # 尝试多种解析方法
        try:
            # 方法1：替换JS对象键值对为JSON格式
            json_str = re.sub(r'(\w+):', r'"\1":', js_obj_str)
            json_str = re.sub(r'\'([^\']*?)\'', r'"\1"', json_str)
            json_str = re.sub(r',\s*\}', '}', json_str)
            
            return json.loads(json_str)
        except json.JSONDecodeError as e:
            print(f"JSON解析方法1失败 ({file_path}): {e}")
            
            try:
                # 方法2：更严格的替换
                py_obj_str = js_obj_str.replace("'", '"')  # 单引号替换为双引号
                py_obj_str = re.sub(r'(\w+):', r'"\1":', py_obj_str)  # 将键名加上引号
                py_obj_str = re.sub(r',\s*\}', '}', py_obj_str)  # 移除尾部逗号
                py_obj_str = re.sub(r'\\\'', "'", py_obj_str)  # 处理转义的单引号
                
                return json.loads(py_obj_str)
            except json.JSONDecodeError as e2:
                print(f"JSON解析方法2失败 ({file_path}): {e2}")
                
                # 如果两种方法都失败，返回一个空字典
                print(f"无法解析文件: {file_path}，将返回空字典")
                return {}
    except Exception as e:
        print(f"读取文件时发生错误 ({file_path}): {e}")
        return {}

# 将Python字典转换为JS对象字符串
def dict_to_js_object(data):
    """
    将Python字典转换为JS对象字符串
    
    Args:
        data: Python字典
        
    Returns:
        str: 格式化的JS对象字符串
    """
    js_lines = ['export default {']
    
    for key, value in data.items():
        if isinstance(value, dict):
            # 处理嵌套对象
            nested_obj = dict_to_js_object(value)
            indented_nested_obj = '\n  '.join(nested_obj.split('\n'))
            js_lines.append(f'  {key}: {indented_nested_obj},')
        elif isinstance(value, list):
            # 处理数组
            json_array = json.dumps(value, ensure_ascii=False)
            js_lines.append(f'  {key}: {json_array},')
        else:
            # 处理字符串
            escaped_value = str(value).replace("'", "\\'")
            js_lines.append(f"  {key}: '{escaped_value}',")
    
    js_lines.append('}')
    return '\n'.join(js_lines) 