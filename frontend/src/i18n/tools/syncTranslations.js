/**
 * 翻译同步工具
 * 
 * 此脚本用于将中文(zh-CN)翻译文件同步到英文(en-US)和繁体中文(zh-TW)
 * 只会创建文件结构和键名，不会翻译内容
 * 
 * 使用方法: node syncTranslations.js
 */

const fs = require('fs');
const path = require('path');

// 源语言和目标语言
const SOURCE_LOCALE = 'zh-CN';
const TARGET_LOCALES = ['en-US', 'zh-TW'];

// 基础路径
const LOCALES_PATH = path.resolve(__dirname, '../locales');

// 递归创建目录
function mkdirRecursive(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 递归遍历目录
function traverseDirectory(dir, callback) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      traverseDirectory(fullPath, callback);
    } else if (stats.isFile() && file.endsWith('.js')) {
      callback(fullPath);
    }
  });
}

// 创建目标语言的文件结构
function createTargetStructure(sourceFilePath) {
  const relativePath = path.relative(path.join(LOCALES_PATH, SOURCE_LOCALE), sourceFilePath);
  
  TARGET_LOCALES.forEach(locale => {
    const targetPath = path.join(LOCALES_PATH, locale, relativePath);
    const targetDir = path.dirname(targetPath);
    
    // 创建目录
    mkdirRecursive(targetDir);
    
    // 如果目标文件不存在，则创建
    if (!fs.existsSync(targetPath)) {
      // 读取源文件内容
      const sourceContent = fs.readFileSync(sourceFilePath, 'utf8');
      
      // 创建目标文件内容（保持键名，但值为空）
      const targetContent = createEmptyTranslation(sourceContent);
      
      // 写入目标文件
      fs.writeFileSync(targetPath, targetContent, 'utf8');
      console.log(`Created: ${targetPath}`);
    }
  });
}

// 创建空翻译内容（保留键名，值为空）
function createEmptyTranslation(sourceContent) {
  // 使用正则表达式匹配键名
  const keyRegex = /([\s\w]+):\s*['"]([^'"]*)['"]/g;
  
  // 替换值为空字符串，保留键名
  return sourceContent.replace(keyRegex, (match, key, value) => {
    return `${key}: ''`;
  });
}

// 主函数
function syncTranslations() {
  console.log('开始同步翻译文件...');
  
  // 确保目标语言目录存在
  TARGET_LOCALES.forEach(locale => {
    const localePath = path.join(LOCALES_PATH, locale);
    mkdirRecursive(localePath);
  });
  
  // 遍历源语言目录
  const sourceDir = path.join(LOCALES_PATH, SOURCE_LOCALE);
  traverseDirectory(sourceDir, createTargetStructure);
  
  console.log('翻译文件同步完成！');
}

// 执行同步
syncTranslations(); 