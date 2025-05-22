<template>
  <section class="section bg-light posters-section">
    <div class="container mx-auto px-4">
      <h2 class="section-title text-3xl text-center centered mb-16">{{ $t('components.home.PostersSection.title') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="(poster, index) in posters" :key="index"
             class="card overflow-hidden fade-in interactive-card yellow-accent" 
             :style="{ animationDelay: `${index * 0.1}s` }">
          <img :src="poster.imgUrl" :alt="poster.title" class="w-full h-64 object-cover">
          <div class="poster-overlay">
            <h3 class="poster-title">{{ poster.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import womenUnlimitedPosterUrl from '@/assets/images/events/women_unlimited_poster.jpg';
import hackathonEventUrl from '@/assets/images/events/weekly_hackathon_gdc_venue.jpg';
import charityCampPosterUrl from '@/assets/images/charity-camp/ai_product_charity_camp_poster.jpg';
import charityCampSpeakerUrl from '@/assets/images/charity-camp/charity_camp_speaker_intro2.jpg';
import { computed } from 'vue';
const { t,tm } = useI18n();

// 图片映射对象
const imageMap = {
  womenUnlimitedPosterUrl,
  hackathonEventUrl,
  charityCampPosterUrl,
  charityCampSpeakerUrl
};

// 从i18n文件中获取海报数据，并添加图片URL
const postersData = computed(() => tm('components.home.PostersSection.posters'));
const posters = computed(() => Array.isArray(postersData.value) ? postersData.value.map(poster => ({
  ...poster,
  imgUrl: imageMap[poster.imgUrlKey]
})): []);
</script>

<style scoped>
.posters-section {
  padding: 80px 0;
  background-color: var(--background-color, #f9fafb);
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

.gap-6 {
  gap: 1.5rem;
}

.card {
  background: var(--card-background, #fff);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
}

.interactive-card {
  cursor: pointer;
}

.overflow-hidden {
  overflow: hidden;
}

.yellow-accent {
  border-bottom: 4px solid var(--accent-color, #F5A623);
}

.interactive-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.interactive-card:hover .poster-overlay {
  opacity: 1;
}

.w-full {
  width: 100%;
}

.h-64 {
  height: 16rem;
}

.object-cover {
  object-fit: cover;
}

.poster-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 1.5rem 1rem 1rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.poster-title {
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
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
@media (min-width: 640px) {
  .sm\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style> 