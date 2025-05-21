<template>
  <section class="content-section bg-light">
    <div class="container mx-auto px-4">
      <div class="title-container">
        <div class="yellow-line"></div>
        <h2 class="section-title">{{ $t('components.womenUnlimited.womenUnlimitedContentSection.mainTitle') }}</h2>
      </div>

      <div class="cards-grid">
        <div class="info-card">
          <div class="card-icon-wrapper">
            <el-icon :size="32"><Avatar /></el-icon>
          </div>
          <h3 class="card-title">{{ $t('components.womenUnlimited.womenUnlimitedContentSection.highlightsTitle') }}</h3>
          <ul class="info-list">
            <li v-for="(item, index) in $t('components.womenUnlimited.womenUnlimitedContentSection.highlightsList', [], { returnObjects: true })" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="info-card">
          <div class="card-icon-wrapper">
            <el-icon :size="32"><Opportunity /></el-icon>
          </div>
          <h3 class="card-title">{{ $t('components.womenUnlimited.womenUnlimitedContentSection.benefitsTitle') }}</h3>
          <ul class="info-list">
            <li v-for="(item, index) in $t('components.womenUnlimited.womenUnlimitedContentSection.benefitsList', [], { returnObjects: true })" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <div class="full-width-card">
        <h3 class="card-title">{{ $t('components.womenUnlimited.womenUnlimitedContentSection.whatIsTitle') }}</h3>
        <p>{{ $t('components.womenUnlimited.womenUnlimitedContentSection.whatIsDescription1') }}</p>
        <p>{{ $t('components.womenUnlimited.womenUnlimitedContentSection.whatIsDescription2') }}</p>
      </div>

      <div class="full-width-card">
        <h3 class="card-title">{{ $t('components.womenUnlimited.womenUnlimitedContentSection.scheduleTitle') }}</h3>
        <p>{{ $t('components.womenUnlimited.womenUnlimitedContentSection.scheduleDescription') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Avatar, Opportunity } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const activityHighlights = ref([
  {
    title: t('components.womenUnlimited.womenUnlimitedContentSection.highlightsTitle'),
    description: t('components.womenUnlimited.womenUnlimitedContentSection.highlightsList', [], { returnObjects: true })[0],
    icon: Avatar,
  },
  {
    title: t('components.womenUnlimited.womenUnlimitedContentSection.benefitsTitle'),
    description: t('components.womenUnlimited.womenUnlimitedContentSection.benefitsList', [], { returnObjects: true })[0],
    icon: Opportunity,
  },
]);
</script>

<style scoped>
.content-section {
  padding: 60px 0;
  background-color: #f8f9fa; /* 浅灰色背景 */
}
.title-container {
  position: relative;
  margin-bottom: 40px;
  text-align: center;
}
.yellow-line {
  height: 4px;
  width: 60px;
  background-color: var(--warning-color); /* 黄色 */
  margin: 0 auto 15px;
}
.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}
.info-card {
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}
.card-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #e8f5e9; /* 浅绿色背景，同截图 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: var(--green-color); /* 绿色图标 */
}
.card-title {
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--text-primary);
}
.info-list {
  list-style-type: disc;
  padding-left: 20px;
  color: var(--text-secondary);
}
.info-list li {
  margin-bottom: 10px;
  line-height: 1.6;
}
.full-width-card {
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}
.full-width-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 15px;
}
.full-width-card p:last-child {
  margin-bottom: 0;
}
</style> 