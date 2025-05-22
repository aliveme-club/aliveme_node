<template>
  <section id="partners" class="section yellow-bg partners-section">
    <div class="container mx-auto px-4">
      <h2 class="section-title text-3xl text-center centered mb-16">{{ $t('components.home.PartnersSection.title') }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div v-for="(partner, index) in partners" :key="index" class="card p-6 fade-in interactive-card"
          :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="flex items-center mb-4">
            <img :src="partner.imgUrl" :alt="partner.name" class="w-16 h-16 rounded-full object-cover mr-4">
            <h3 class="text-xl font-bold">{{ partner.name }}</h3>
          </div>
          <p class="text-gray-700">{{ partner.description }}</p>
        </div>
      </div>
      <h3 class="text-2xl text-center mb-8">{{ $t('components.home.PartnersSection.subtitle') }}</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="(org, index) in organizations" :key="index"
          class="card overflow-hidden fade-in interactive-card yellow-accent"
          :style="{ animationDelay: `${index * 0.1}s` }">
          <img :src="org.imgUrl" :alt="org.name" class="w-full h-48 object-cover">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import timImgUrl from '@/assets/images/team/tim.jpg';
import cheraxImgUrl from '@/assets/images/team/cherax.jpg';
import jackieImgUrl from '@/assets/images/team/jackie.jpg';
import kevinImgUrl from '@/assets/images/team/kevin.jpg';
import lianmeiImgUrl from '@/assets/images/team/li_lianmei.jpg';
import yinianImgUrl from '@/assets/images/team/yinian.jpg';
import rinaImgUrl from '@/assets/images/team/rina.jpg';
import whiteBearImgUrl from '@/assets/images/team/white_bear.png';

import modusSpaceImgUrl from '@/assets/images/events/modus_space_venue.jpg';
import chineseMedicineImgUrl from '@/assets/images/chinese-medicine/chinese_medicine_series.jpg';
import chineseMedicineDoctorImgUrl from '@/assets/images/chinese-medicine/chinese_medicine_doctor.jpg';
import hackathonImgUrl from '@/assets/images/events/weekly_hackathon_gdc_venue.jpg';
import sunnyAtRoundtableImgUrl from '@/assets/images/team/sunny_at_roundtable_hosting.jpg';

import { computed } from 'vue';
const { t, tm } = useI18n();

// 图片映射对象
const imageMap = {
  timImgUrl,
  cheraxImgUrl,
  jackieImgUrl,
  kevinImgUrl,
  lianmeiImgUrl,
  yinianImgUrl,
  rinaImgUrl,
  whiteBearImgUrl,
  modusSpaceImgUrl,
  chineseMedicineImgUrl,
  chineseMedicineDoctorImgUrl,
  hackathonImgUrl,
  sunnyAtRoundtableImgUrl
};

// 从i18n文件中获取合作伙伴数据，并添加图片URL
const partnersData = computed(() => tm('components.home.PartnersSection.partners'));
const partners = computed(() => Array.isArray(partnersData.value) ? partnersData.value.map(partner => ({
  ...partner, imgUrl: imageMap[partner.imgUrlKey]
})): []);

// 从i18n文件中获取组织数据，并添加图片URL
const organizationsData = computed(() => tm('components.home.PartnersSection.organizations'));
const organizations = computed(() => Array.isArray(organizationsData.value) ? organizationsData.value.map(org => ({
  ...org,
  imgUrl: imageMap[org.imgUrlKey]
})): []);

</script>

<style scoped>
.partners-section {
  padding: 80px 0;
  background-color: var(--background-color);
}

.yellow-bg {
  background-color: #FEF9E7;
  /* 淡黄色背景 */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  color: var(--text-primary, #333);
  font-size: 1.875rem;
  text-align: center;
  margin-bottom: 4rem;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gap-8 {
  gap: 2rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.card {
  background: var(--card-background, #fff);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.interactive-card {
  cursor: pointer;
}

.interactive-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.yellow-accent {
  border-left: 4px solid var(--accent-color, #F5A623);
}

.overflow-hidden {
  overflow: hidden;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.w-16 {
  width: 4rem;
}

.h-16 {
  height: 4rem;
}

.w-full {
  width: 100%;
}

.h-48 {
  height: 12rem;
}

.rounded-full {
  border-radius: 9999px;
}

.object-cover {
  object-fit: cover;
}

.mr-4 {
  margin-right: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.text-xl {
  font-size: 1.25rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.font-bold {
  font-weight: 700;
}

.text-center {
  text-align: center;
}

.mb-8 {
  margin-bottom: 2rem;
}

.text-gray-700 {
  color: var(--text-secondary, #606266);
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式布局 */
@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>