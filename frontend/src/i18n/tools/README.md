# ALiveMe国际化工具

本目录包含用于辅助国际化开发的工具脚本。

## 工具列表

1. **syncTranslations.js** - 翻译同步工具
   - 将中文(zh-CN)翻译文件同步到英文(en-US)和繁体中文(zh-TW)
   - 只会创建文件结构和键名，不会翻译内容
   - 使用方法: `node syncTranslations.js`

2. **checkTranslations.js** - 翻译检查工具
   - 检查翻译文件的完整性和一致性
   - 检查项包括：文件结构一致性、键名一致性、空翻译项
   - 使用方法: `node checkTranslations.js`

3. **extractTranslations.js** - 翻译提取工具
   - 从Vue组件中提取需要国际化的文本
   - 提取规则：模板中的静态文本、脚本中的字符串常量
   - 使用方法: `node extractTranslations.js <组件路径>`
   - 例如: `node extractTranslations.js ../../components/home/HeroSection.vue`

4. **autoTranslate.py** - 自动翻译工具
   - 使用大模型API自动将中文(zh-CN)翻译文件翻译为英文(en-US)和繁体中文(zh-TW)
   - 支持处理嵌套对象、数组和字符串
   - 只翻译缺失或为空的翻译项，不会覆盖已有翻译
   - 使用方法: `python autoTranslate.py`
   - 使用前需要配置API密钥和安装依赖: `pip install requests`

## 使用流程

### 1. 提取文本

从组件中提取需要国际化的文本：

```bash
node extractTranslations.js ../../components/home/HeroSection.vue
```

### 2. 同步翻译文件

将中文翻译文件同步到其他语言：

```bash
node syncTranslations.js
```

### 3. 自动翻译

使用大模型API自动翻译缺失的翻译项：

```bash
python autoTranslate.py
```

### 4. 检查翻译完整性

检查翻译文件的完整性和一致性：

```bash
node checkTranslations.js
```

## 注意事项

1. 执行工具脚本前，请确保已安装所需依赖：
   ```bash
   npm install @vue/compiler-sfc
   pip install requests  # 用于Python脚本
   ```

2. 翻译提取工具可能无法提取所有需要国际化的文本，请手动检查并补充。

3. 同步工具不会覆盖已存在的翻译，只会创建新的翻译文件。

4. 自动翻译工具需要配置API密钥，请在使用前修改脚本中的`API_KEY`变量。 