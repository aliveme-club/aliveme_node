/**
 * 翻译检查工具
 * 
 * 此脚本用于检查翻译文件的完整性和一致性
 * 检查项包括：
 * 1. 所有语言是否具有相同的文件结构
 * 2. 所有语言文件是否具有相同的键名
 * 3. 是否存在空翻译或未翻译的项
 * 
 * 使用方法: node checkTranslations.js
 */

const fs = require('fs');
const path = require('path');

// 支持的语言
const LOCALES = ['zh-CN', 'en-US', 'zh-TW'];

// 基础路径
const LOCALES_PATH = path.resolve(__dirname, '../locales');

// 存储所有文件路径
const filePathMap = {};

// 存储检查结果
const checkResults = {
  missingFiles: [],
  missingKeys: [],
  emptyTranslations: []
};

// 递归遍历目录，收集所有JS文件路径
function collectFiles() {
  LOCALES.forEach(locale => {
    filePathMap[locale] = [];
    const localePath = path.join(LOCALES_PATH, locale);
    
    if (fs.existsSync(localePath)) {
      traverseDirectory(localePath, filePath => {
        const relativePath = path.relative(localePath, filePath);
        filePathMap[locale].push(relativePath);
      });
    }
  });
}

// 递归遍历目录
function traverseDirectory(dir, callback) {
  if (!fs.existsSync(dir)) return;
  
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

// 检查文件结构一致性
function checkFileStructure() {
  // 以第一个语言的文件列表为基准
  const baseLocale = LOCALES[0];
  const baseFiles = filePathMap[baseLocale];
  
  LOCALES.slice(1).forEach(locale => {
    const localeFiles = filePathMap[locale];
    
    // 检查基准语言中存在但目标语言中不存在的文件
    baseFiles.forEach(file => {
      if (!localeFiles.includes(file)) {
        checkResults.missingFiles.push({
          locale,
          file
        });
      }
    });
  });
}

// 检查键名一致性和空翻译
function checkTranslationKeys() {
  const baseLocale = LOCALES[0];
  const baseFiles = filePathMap[baseLocale];
  
  baseFiles.forEach(relativeFilePath => {
    const baseFilePath = path.join(LOCALES_PATH, baseLocale, relativeFilePath);
    
    try {
      // 动态导入基准语言文件
      const baseTranslation = require(baseFilePath);
      const baseKeys = extractKeys(baseTranslation);
      
      // 检查其他语言文件
      LOCALES.slice(1).forEach(locale => {
        const localeFilePath = path.join(LOCALES_PATH, locale, relativeFilePath);
        
        if (fs.existsSync(localeFilePath)) {
          try {
            // 动态导入目标语言文件
            const localeTranslation = require(localeFilePath);
            
            // 检查键名一致性
            baseKeys.forEach(key => {
              const baseValue = getNestedValue(baseTranslation, key);
              const localeValue = getNestedValue(localeTranslation, key);
              
              if (localeValue === undefined) {
                checkResults.missingKeys.push({
                  locale,
                  file: relativeFilePath,
                  key
                });
              } else if (localeValue === '') {
                checkResults.emptyTranslations.push({
                  locale,
                  file: relativeFilePath,
                  key
                });
              }
            });
          } catch (error) {
            console.error(`Error parsing file: ${localeFilePath}`, error);
          }
        }
      });
    } catch (error) {
      console.error(`Error parsing file: ${baseFilePath}`, error);
    }
  });
}

// 提取对象中的所有键路径
function extractKeys(obj, prefix = '') {
  let keys = [];
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        keys = keys.concat(extractKeys(value, newKey));
      } else {
        keys.push(newKey);
      }
    }
  }
  
  return keys;
}

// 根据键路径获取嵌套值
function getNestedValue(obj, path) {
  const keys = path.split('.');
  let value = obj;
  
  for (const key of keys) {
    if (value === undefined || value === null) return undefined;
    value = value[key];
  }
  
  return value;
}

// 打印检查结果
function printResults() {
  console.log('\n===== 翻译检查结果 =====\n');
  
  if (checkResults.missingFiles.length === 0 &&
      checkResults.missingKeys.length === 0 &&
      checkResults.emptyTranslations.length === 0) {
    console.log('恭喜！所有翻译文件完整且一致。');
    return;
  }
  
  // 打印缺失文件
  if (checkResults.missingFiles.length > 0) {
    console.log('\n缺失文件:');
    checkResults.missingFiles.forEach(item => {
      console.log(`- [${item.locale}] 缺少文件: ${item.file}`);
    });
  }
  
  // 打印缺失键名
  if (checkResults.missingKeys.length > 0) {
    console.log('\n缺失键名:');
    checkResults.missingKeys.forEach(item => {
      console.log(`- [${item.locale}] ${item.file} 缺少键: ${item.key}`);
    });
  }
  
  // 打印空翻译
  if (checkResults.emptyTranslations.length > 0) {
    console.log('\n空翻译:');
    checkResults.emptyTranslations.forEach(item => {
      console.log(`- [${item.locale}] ${item.file} 键 ${item.key} 为空`);
    });
  }
}

// 主函数
function checkTranslations() {
  console.log('开始检查翻译文件...');
  
  // 收集所有文件路径
  collectFiles();
  
  // 检查文件结构一致性
  checkFileStructure();
  
  // 检查键名一致性和空翻译
  checkTranslationKeys();
  
  // 打印检查结果
  printResults();
}

// 执行检查
checkTranslations(); 