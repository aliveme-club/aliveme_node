<template>
  <div class="language-switcher">
    <el-dropdown @command="handleLanguageChange">
      <span class="el-dropdown-link">
        {{ getCurrentLanguageLabel() }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-CN">
            <div class="language-item">
              <span class="language-icon">🇨🇳</span>
              <span>{{ $t('components.common.languageSwitcher.languages.zhCN') }}</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="zh-TW">
            <div class="language-item">
              <span class="language-icon">🇹🇼</span>
              <span>{{ $t('components.common.languageSwitcher.languages.zhTW') }}</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="en-US">
            <div class="language-item">
              <span class="language-icon">🇺🇸</span>
              <span>{{ $t('components.common.languageSwitcher.languages.enUS') }}</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { setLocale } from '@/i18n'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const handleLanguageChange = (lang) => {
  if (locale.value !== lang) {
    setLocale(lang)
  }
}

const getCurrentLanguageLabel = () => {
  switch (locale.value) {
    case 'zh-CN':
      return t('components.common.languageSwitcher.languages.zhCN')
    case 'zh-TW':
      return t('components.common.languageSwitcher.languages.zhTW')
    case 'en-US':
      return t('components.common.languageSwitcher.languages.enUS')
    default:
      return t('components.common.languageSwitcher.languages.zhCN')
  }
}
</script>

<style scoped>
.language-switcher {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.el-dropdown-link {
  color: var(--el-color-primary);
  display: inline-flex;
  align-items: center;
}

.language-item {
  display: flex;
  align-items: center;
}

.language-icon {
  margin-right: 8px;
  font-size: 1.2em;
}
</style> 