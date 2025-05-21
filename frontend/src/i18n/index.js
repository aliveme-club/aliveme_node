import { createI18n } from 'vue-i18n'

// 命名规则：
// 1. import的文件名命名格式为：语言_上级文件夹_文件名称,例如：zhCN_home_FeaturesSection，来自frontend\src\i18n\locales\zh-CN\components\lifeExchange\FeaturesSection.js
// 因为有些不同文件路径的文件可能重名，导致重复赋值。
// 2. 而messages中的命名格式为：文件名称

// 导入语言文件
import zhCN from './locales/zh-CN/common'
import enUS from './locales/en-US/common'
import zhTW from './locales/zh-TW/common'

// 导入footer翻译文件
import zhCN_AppFooter from './locales/zh-CN/appfooter.js'
import enUS_AppFooter from './locales/en-US/appfooter.js'
import zhTW_AppFooter from './locales/zh-TW/appfooter.js'

// 导入语言切换器翻译
import zhCN_common_LanguageSwitcher from './locales/zh-CN/components/common/LanguageSwitcher.js'
import enUS_common_LanguageSwitcher from './locales/en-US/components/common/LanguageSwitcher.js'
import zhTW_common_LanguageSwitcher from './locales/zh-TW/components/common/LanguageSwitcher.js'

// 导入简体中文组件翻译文件
import zhCN_layout_NavBar from './locales/zh-CN/components/layout/NavBar.js'
import zhCN_home_HeroSection from './locales/zh-CN/components/home/HeroSection.js'
import zhCN_home_AboutSection from './locales/zh-CN/components/home/AboutSection.js'
import zhCN_home_FeaturesSection from './locales/zh-CN/components/home/FeaturesSection.js'
import zhCN_home_TeamSection from './locales/zh-CN/components/home/TeamSection.js'
import zhCN_home_TimelineSection from './locales/zh-CN/components/home/TimelineSection.js'
import zhCN_home_PostersSection from './locales/zh-CN/components/home/PostersSection.js'
import zhCN_home_PartnersSection from './locales/zh-CN/components/home/PartnersSection.js'
import zhCN_home_CollaborationSection from './locales/zh-CN/components/home/CollaborationSection.js'
import zhCN_home_EnergyCommunitySection from './locales/zh-CN/components/home/EnergyCommunitySection.js'

// 导入简体中文OH卡组件翻译
import zhCN_ohCard_OHCardHero from './locales/zh-CN/components/ohCard/OHCardHero.js'
import zhCN_ohCard_OHCardProcess from './locales/zh-CN/components/ohCard/OHCardProcess.js'
import zhCN_ohCard_OHCardIntroduction from './locales/zh-CN/components/ohCard/OHCardIntroduction.js'
import zhCN_ohCard_index from './locales/zh-CN/components/ohCard/index.js'
import zhCN_ohCard_IntroStep from './locales/zh-CN/components/ohCard/OHCardGame/IntroStep.js'
import zhCN_ohCard_EnergyGatheringStep from './locales/zh-CN/components/ohCard/OHCardGame/EnergyGatheringStep.js'
import zhCN_ohCard_CardDrawingStep from './locales/zh-CN/components/ohCard/OHCardGame/CardDrawingStep.js'
import zhCN_ohCard_CardFront from './locales/zh-CN/components/ohCard/OHCardGame/CardFront.js'
import zhCN_ohCard_CardBack from './locales/zh-CN/components/ohCard/OHCardGame/CardBack.js'
import zhCN_ohCard_QuestionOption from './locales/zh-CN/components/ohCard/OHCardGame/QuestionOption.js'
import zhCN_ohCard_FinalStep from './locales/zh-CN/components/ohCard/OHCardGame/FinalStep.js'
import zhCN_ohCard_SimpleModal from './locales/zh-CN/components/ohCard/OHCardModals/SimpleModal.js'
import zhCN_ohCard_RedrawConfirmation from './locales/zh-CN/components/ohCard/OHCardModals/RedrawConfirmation.js'

// 导入简体中文交换人生组件翻译
import zhCN_lifeExchange_HeroSection from './locales/zh-CN/components/lifeExchange/HeroSection.js'
import zhCN_lifeExchange_GameIntroSection from './locales/zh-CN/components/lifeExchange/GameIntroSection.js'
import zhCN_lifeExchange_GameFeaturesSection from './locales/zh-CN/components/lifeExchange/GameFeaturesSection.js'
import zhCN_lifeExchange_HowItWorksSection from './locales/zh-CN/components/lifeExchange/HowItWorksSection.js'
import zhCN_lifeExchange_FeaturesSection from './locales/zh-CN/components/lifeExchange/FeaturesSection.js'

// 导入简体中文无界女性组件翻译
import zhCN_womenUnlimited_HeroSection from './locales/zh-CN/components/womenUnlimited/WomenUnlimitedHeroSection.js'
import zhCN_womenUnlimited_ContentSection from './locales/zh-CN/components/womenUnlimited/WomenUnlimitedContentSection.js'

// 导入英文组件翻译文件
import enUS_layout_NavBar from './locales/en-US/components/layout/NavBar.js'
import enUS_home_HeroSection from './locales/en-US/components/home/HeroSection.js'
import enUS_home_AboutSection from './locales/en-US/components/home/AboutSection.js'
import enUS_home_FeaturesSection from './locales/en-US/components/home/FeaturesSection.js'
import enUS_home_TeamSection from './locales/en-US/components/home/TeamSection.js'

// 导入繁体中文组件翻译文件
import zhTW_layout_NavBar from './locales/zh-TW/components/layout/NavBar.js'
import zhTW_home_HeroSection from './locales/zh-TW/components/home/HeroSection.js'
import zhTW_home_AboutSection from './locales/zh-TW/components/home/AboutSection.js'
import zhTW_home_FeaturesSection from './locales/zh-TW/components/home/homeFeaturesSection.js'
import zhTW_home_TeamSection from './locales/zh-TW/components/home/TeamSection.js'

// 创建消息对象
const messages = {
  'zh-CN': {
    ...zhCN,
    appfooter: zhCN_AppFooter,
    components: {
      common: {
        languageSwitcher: zhCN_common_LanguageSwitcher
      },
      layout: {
        NavBar: zhCN_layout_NavBar
      },
      home: {
        HeroSection: zhCN_home_HeroSection,
        AboutSection: zhCN_home_AboutSection,
        FeaturesSection: zhCN_home_FeaturesSection,
        TeamSection: zhCN_home_TeamSection,
        TimelineSection: zhCN_home_TimelineSection,
        PostersSection: zhCN_home_PostersSection,
        PartnersSection: zhCN_home_PartnersSection,
        CollaborationSection: zhCN_home_CollaborationSection,
        EnergyCommunitySection: zhCN_home_EnergyCommunitySection
      },
      ohCard: {
        ohCardHero: zhCN_ohCard_OHCardHero,
        ohCardProcess: zhCN_ohCard_OHCardProcess,
        ohCardIntroduction: zhCN_ohCard_OHCardIntroduction,
        ohCardGame: zhCN_ohCard_index,
        OHCardGame: {
          IntroStep: zhCN_ohCard_IntroStep,
          EnergyGatheringStep: zhCN_ohCard_EnergyGatheringStep,
          CardDrawingStep: zhCN_ohCard_CardDrawingStep,
          CardFront: zhCN_ohCard_CardFront,
          CardBack: zhCN_ohCard_CardBack,
          QuestionOption: zhCN_ohCard_QuestionOption,
          FinalStep: zhCN_ohCard_FinalStep
        },
        OHCardModals: {
          SimpleModal: zhCN_ohCard_SimpleModal,
          RedrawConfirmation: zhCN_ohCard_RedrawConfirmation
        }
      },
      lifeExchange: {
        heroSection: zhCN_lifeExchange_HeroSection,
        gameIntroSection: zhCN_lifeExchange_GameIntroSection,
        gameFeaturesSection: zhCN_lifeExchange_GameFeaturesSection,
        howItWorksSection: zhCN_lifeExchange_HowItWorksSection,
        featuresSection: zhCN_lifeExchange_FeaturesSection
      },
      womenUnlimited: {
        womenUnlimitedHeroSection: zhCN_womenUnlimited_HeroSection,
        womenUnlimitedContentSection: zhCN_womenUnlimited_ContentSection
      }
    }
  },
  'en-US': {
    ...enUS,
    appfooter: enUS_AppFooter,
    components: {
      common: {
        languageSwitcher: enUS_common_LanguageSwitcher
      },
      layout: {
        NavBar: enUS_layout_NavBar
      },
      home: {
        HeroSection: enUS_home_HeroSection,
        AboutSection: enUS_home_AboutSection,
        FeaturesSection: enUS_home_FeaturesSection,
        TeamSection: enUS_home_TeamSection
      }
    }
  },
  'zh-TW': {
    ...zhTW,
    appfooter: zhTW_AppFooter,
    components: {
      common: {
        languageSwitcher: zhTW_common_LanguageSwitcher
      },
      layout: {
        NavBar: zhTW_layout_NavBar
      },
      home: {
        HeroSection: zhTW_home_HeroSection,
        AboutSection: zhTW_home_AboutSection,
        FeaturesSection: zhTW_home_FeaturesSection,
        TeamSection: zhTW_home_TeamSection
      }
    }
  }
}

// 检查浏览器首选语言
function getDefaultLocale() {
  const userLanguage = navigator.language || navigator.userLanguage
  const storedLanguage = localStorage.getItem('locale')
  
  // 优先使用存储的语言
  if (storedLanguage) {
    return storedLanguage
  }
  
  // 根据浏览器语言设置默认语言
  if (userLanguage.includes('zh')) {
    if (userLanguage.includes('TW') || userLanguage.includes('HK')) {
      return 'zh-TW'
    }
    return 'zh-CN'
  }
  
  // 默认使用英文
  return 'en-US'
}

// 创建i18n实例
const i18n = createI18n({
  legacy: false, // 使用Composition API
  locale: getDefaultLocale(),
  fallbackLocale: 'zh-CN',
  messages
})

// 设置语言的函数
export function setLocale(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.querySelector('html').setAttribute('lang', locale)
}

export default i18n 