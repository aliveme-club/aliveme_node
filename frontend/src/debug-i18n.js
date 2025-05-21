// 调试国际化配置

import i18n from './i18n'

// 调试函数，打印当前的国际化配置
export function debugI18n() {
  console.log('Current i18n locale:', i18n.global.locale.value)
  console.log('Current i18n fallbackLocale:', i18n.global.fallbackLocale.value)
  console.log('Current i18n messages:', i18n.global.messages)
  
  // 测试关键路径
  const paths = [
    'components.layout.NavBar.home',
    'components.layout.NavBar.ohCard',
    'components.home.HeroSection.title',
    'components.home.HeroSection.description',
    'components.home.HeroSection.actionButton'
  ]
  
  console.log('Testing key paths:')
  paths.forEach(path => {
    console.log(`${path}: ${i18n.global.t(path)}`)
  })
}
