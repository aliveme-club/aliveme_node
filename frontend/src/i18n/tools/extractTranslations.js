/**
 * 翻译提取工具
 * 
 * 此脚本用于从Vue组件中提取需要国际化的文本
 * 提取规则：
 * 1. 提取模板中的静态文本
 * 2. 提取脚本中的字符串常量
 * 
 * 使用方法: node extractTranslations.js <组件路径>
 * 例如: node extractTranslations.js ../components/home/HeroSection.vue
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('@vue/compiler-sfc');

// 基础路径
const SRC_PATH = path.resolve(__dirname, '../../');
const LOCALES_PATH = path.resolve(__dirname, '../locales');

// 目标语言
const TARGET_LOCALE = 'zh-CN';

// 提取Vue组件中的文本
function extractFromComponent(componentPath) {
  console.log(`正在分析组件: ${componentPath}`);
  
  // 读取组件文件内容
  const content = fs.readFileSync(componentPath, 'utf8');
  
  // 解析Vue组件
  const { descriptor } = parse(content);
  
  // 提取的文本
  const extractedTexts = [];
  
  // 从模板中提取文本
  if (descriptor.template) {
    extractFromTemplate(descriptor.template.content, extractedTexts);
  }
  
  // 从脚本中提取文本
  if (descriptor.script) {
    extractFromScript(descriptor.script.content, extractedTexts);
  }
  
  return extractedTexts;
}

// 从模板中提取文本
function extractFromTemplate(template, extractedTexts) {
  // 提取HTML标签中的文本内容
  const textRegex = />([^<>]+)</g;
  let match;
  
  while ((match = textRegex.exec(template)) !== null) {
    const text = match[1].trim();
    if (text && isChineseText(text)) {
      extractedTexts.push(text);
    }
  }
  
  // 提取属性值中的文本
  const attrRegex = /\s(\w+)=["']([^"']+)["']/g;
  
  while ((match = attrRegex.exec(template)) !== null) {
    const attrName = match[1];
    const attrValue = match[2].trim();
    
    // 只提取特定属性中的中文文本
    if (['title', 'placeholder', 'label', 'alt'].includes(attrName) && isChineseText(attrValue)) {
      extractedTexts.push(attrValue);
    }
  }
}

// 从脚本中提取文本
function extractFromScript(script, extractedTexts) {
  // 提取字符串常量
  const stringRegex = /['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = stringRegex.exec(script)) !== null) {
    const text = match[1].trim();
    if (text && isChineseText(text) && text.length > 1) {
      extractedTexts.push(text);
    }
  }
}

// 判断文本是否包含中文
function isChineseText(text) {
  return /[\u4e00-\u9fa5]/.test(text);
}

// 生成翻译文件
function generateTranslationFile(componentPath, extractedTexts) {
  // 计算相对路径
  const relativePath = path.relative(SRC_PATH, componentPath);
  
  // 确定组件类型和名称
  let componentType, componentName;
  
  if (relativePath.includes('components/')) {
    componentType = 'components';
    const componentParts = relativePath.split('components/')[1].split('/');
    const componentCategory = componentParts[0];
    componentName = path.basename(componentParts[componentParts.length - 1], '.vue');
    
    // 创建翻译文件路径
    const translationDir = path.join(LOCALES_PATH, TARGET_LOCALE, componentType, componentCategory);
    const translationPath = path.join(translationDir, `${componentName}.js`);
    
    // 确保目录存在
    if (!fs.existsSync(translationDir)) {
      fs.mkdirSync(translationDir, { recursive: true });
    }
    
    // 生成翻译内容
    let translationContent = 'export default {\n';
    
    // 根据提取的文本生成键值对
    extractedTexts.forEach((text, index) => {
      // 生成键名
      const key = generateKeyFromText(text, index);
      translationContent += `  ${key}: '${text}',\n`;
    });
    
    translationContent += '}\n';
    
    // 写入翻译文件
    fs.writeFileSync(translationPath, translationContent, 'utf8');
    
    console.log(`已生成翻译文件: ${translationPath}`);
    console.log(`提取了 ${extractedTexts.length} 条文本`);
  } else if (relativePath.includes('views/')) {
    componentType = 'views';
    componentName = path.basename(relativePath, '.vue').toLowerCase();
    
    // 创建翻译文件路径
    const translationDir = path.join(LOCALES_PATH, TARGET_LOCALE, componentType);
    const translationPath = path.join(translationDir, `${componentName}.js`);
    
    // 确保目录存在
    if (!fs.existsSync(translationDir)) {
      fs.mkdirSync(translationDir, { recursive: true });
    }
    
    // 生成翻译内容
    let translationContent = 'export default {\n';
    
    // 根据提取的文本生成键值对
    extractedTexts.forEach((text, index) => {
      // 生成键名
      const key = generateKeyFromText(text, index);
      translationContent += `  ${key}: '${text}',\n`;
    });
    
    translationContent += '}\n';
    
    // 写入翻译文件
    fs.writeFileSync(translationPath, translationContent, 'utf8');
    
    console.log(`已生成翻译文件: ${translationPath}`);
    console.log(`提取了 ${extractedTexts.length} 条文本`);
  } else {
    console.error(`无法确定组件类型: ${relativePath}`);
  }
}

// 根据文本生成键名
function generateKeyFromText(text, index) {
  // 将文本转换为驼峰命名
  let key = text
    .substring(0, 20) // 限制长度
    .replace(/[^\w\s\u4e00-\u9fa5]/g, '') // 移除特殊字符
    .replace(/\s+/g, '_') // 空格替换为下划线
    .toLowerCase();
  
  // 如果是纯中文，使用拼音首字母或索引
  if (/^[\u4e00-\u9fa5]+$/.test(key)) {
    key = `text_${index + 1}`;
  }
  
  return key;
}

// 主函数
function extractTranslations() {
  // 获取命令行参数
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('请提供组件路径');
    console.error('使用方法: node extractTranslations.js <组件路径>');
    process.exit(1);
  }
  
  // 解析组件路径
  const componentPath = path.resolve(__dirname, args[0]);
  
  if (!fs.existsSync(componentPath)) {
    console.error(`组件不存在: ${componentPath}`);
    process.exit(1);
  }
  
  // 提取文本
  const extractedTexts = extractFromComponent(componentPath);
  
  if (extractedTexts.length === 0) {
    console.log('未找到需要提取的文本');
    return;
  }
  
  // 生成翻译文件
  generateTranslationFile(componentPath, extractedTexts);
}

// 执行提取
extractTranslations(); 