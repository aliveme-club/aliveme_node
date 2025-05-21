<template>
  <section id="about" class="section bg-light about-section-updated">
    <div class="container mx-auto px-4">
      <h2 class="section-title text-3xl text-center mb-16">{{ $t('components.home.AboutSection.title') }}</h2>
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10 fade-in about-text-custom">
          <h3 class="text-2xl font-bold mb-4">{{ $t('components.home.AboutSection.subtitle') }}</h3>
          <p class="text-base mb-4">{{ $t('components.home.AboutSection.description1') }}</p>
          <p class="text-base mb-4">{{ $t('components.home.AboutSection.description2') }}</p>
          <div class="flex flex-col space-y-4 mt-6 internal-links">
            <router-link to="/OHCard" class="text-primary hover:text-primary-dark">{{ $t('components.home.AboutSection.links.ohcard') }}</router-link>
            <router-link to="/life-exchange" class="text-primary hover:text-primary-dark">{{ $t('components.home.AboutSection.links.lifeExchange') }}</router-link>
            <router-link to="/women-unlimited" class="text-primary hover:text-primary-dark">{{ $t('components.home.AboutSection.links.womenUnlimited') }}</router-link>
          </div>
        </div>
        <div class="md:w-1/2 fade-in image-grid-custom" style="animation-delay: 0.3s">
          <div class="grid grid-cols-2 gap-4">
            <img :src="eventImg1Url" :alt="$t('components.home.AboutSection.images.alt1')" class="rounded-lg shadow h-40 w-full object-cover">
            <img :src="lifeExchangeImg1Url" :alt="$t('components.home.AboutSection.images.alt2')" class="rounded-lg shadow h-40 w-full object-cover">
            <img :src="lifeExchangeImg2Url" :alt="$t('components.home.AboutSection.images.alt3')" class="rounded-lg shadow h-40 w-full object-cover">
            <img :src="alivemeIntroImgUrl" :alt="$t('components.home.AboutSection.images.alt4')" class="rounded-lg shadow h-40 w-full object-cover">
          </div>
        </div>
      </div>
      <!-- 用户路线图 -->
      <div class="mt-16 fade-in roadmap-container-custom">
        <img :src="roadmapImgUrl" :alt="$t('components.home.AboutSection.images.roadmap')" class="w-full max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
      </div>
    </div>
  </section>
</template>

<script setup>
import eventImg1Url from '@/assets/images/events/shanghai_new_year_2025.jpg';
import lifeExchangeImg1Url from '@/assets/images/life-exchange/life_exchange_beta_group_photo2.jpg';
import lifeExchangeImg2Url from '@/assets/images/life-exchange/life_exchange_beta_photo.jpg';
import alivemeIntroImgUrl from '@/assets/images/aliveme/aliveme_intro_beta_venue.jpg';
import roadmapImgUrl from '@/assets/images/aliveme/user_roadmap.svg';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// No new script imports needed based on main.html for this section
// Removed Connection, TrendCharts, Share as the core values section from the previous Vue component is not in main.html's About section.
</script>

<style scoped>
/* Styles adapted from main.html and AboutSection.vue original styles */
.about-section-updated {
  padding: 80px 0; 
  background-color: #f9fafb; /* bg-light is often this or similar */
}

.container {
  max-width: 1200px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.section-title {
  color: var(--text-primary, #333);
  font-size: 1.875rem; /* text-3xl */
  text-align: center;
  margin-bottom: 4rem; /* mb-16 */
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.md\:flex-row {
 /* For medium screens and up */
}

.md\:w-1\/2 {
  /* For medium screens and up */
}

.mb-10 {
  margin-bottom: 2.5rem;
}

.md\:mb-0 {
  /* For medium screens and up */
}

.pr-0 {
  padding-right: 0;
}

.md\:pr-10 {
  /* For medium screens and up */
}

.text-2xl {
  font-size: 1.5rem; /* 24px */
}

.font-bold {
  font-weight: 700;
}

.mb-4 {
  margin-bottom: 1rem;
}

.text-base {
  font-size: 1rem; /* 16px */
}

.space-y-4 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}

.mt-6 {
  margin-top: 1.5rem;
}

.text-primary {
  color: var(--primary-color, #4A90E2);
}

.hover\:text-primary-dark:hover {
  filter: brightness(0.9);
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gap-4 {
  gap: 1rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow {
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06);
}

.h-40 {
  height: 10rem; /* 160px */
}

.w-full {
  width: 100%;
}

.object-cover {
  object-fit: cover;
}

.mt-16 {
  margin-top: 4rem;
}

.max-w-4xl {
  max-width: 56rem; /* 896px */
}

.transform {
  /* For Tailwind transform utilities */
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.transition-transform {
  transition-property: transform;
}

.duration-300 {
  transition-duration: 300ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
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

/* Custom classes for clarity or if Tailwind isn't fully set up for specific utilities */
.about-text-custom {
  /* any specific styling for the text block */
}

.image-grid-custom {
  /* any specific styling for the image grid block */
}

.roadmap-container-custom {
  /* any specific styling for the roadmap container */
}

.internal-links a {
  text-decoration: none;
  margin-bottom: 0.5rem; /* Add some space between links */
  display: inline-block;
}

@media (min-width: 768px) { /* md */
  .md\:flex-row {
    flex-direction: row;
  }
  .md\:w-1\/2 {
    width: 50%;
  }
  .md\:mb-0 {
    margin-bottom: 0;
  }
  .md\:pr-10 {
    padding-right: 2.5rem;
  }
}
</style> 