<template>
  <section class="hero-section text-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-10 md:mb-0 fade-in hero-text-custom">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">ALiveMe</h1>
          <p class="text-xl md:text-2xl mb-6">{{ $t('components.home.HeroSection.title') }}</p>
          <p class="text-lg mb-8">{{ $t('components.home.HeroSection.description') }}</p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 cta-buttons-custom">
            <el-button type="primary" size="large" @click="scrollToAbout" class="btn-custom-primary">{{ $t('components.home.HeroSection.actionButton') }}</el-button>
            <router-link to="/ohCard">
              <el-button type="success" size="large" class="btn-custom-oh-card">{{ $t('components.home.HeroSection.joinNow') }}</el-button>
            </router-link>
            <el-button size="large" @click="scrollToContact" class="btn-custom-outline">{{ $t('components.home.HeroSection.contact') }}</el-button>
          </div>
        </div>
        <div class="md:w-1/2 fade-in hero-image-custom" style="animation-delay: 0.3s">
          <img :src="heroImageUrl" alt="ALiveMe活动照片" class="rounded-lg shadow-xl mx-auto main-image-custom">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import heroImageUrl from '@/assets/images/team/sunnyonthe38meeting.jpg';

const router = useRouter();
const { t } = useI18n();

const scrollToAbout = () => {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

const goToOhCard = () => {
  router.push('/oh-card');
};
</script>

<style scoped>
/* Styles adapted from main.html and HeroSection.vue original styles */
.hero-section {
  height: 550px; /* Unified height */
  overflow: hidden; /* Prevent content overflow */
  background: linear-gradient(to right, #56C271, #4A90E2); /* Standardized gradient */
  color: white;
  padding: 80px 0; /* Standardized padding */
  display: flex;
  align-items: center;
}

.container {
  max-width: 1200px; /* Standard container width */
}

/* Replicating tailwind classes for structure */
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
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

.font-bold {
  font-weight: 700;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.text-4xl {
  font-size: 2.25rem; /* 36px */
}

.md\:text-6xl {
  /* For medium screens and up */
}

.text-xl {
  font-size: 1.25rem; /* 20px */
}

.md\:text-2xl {
  /* For medium screens and up */
}

.text-lg {
  font-size: 1.125rem; /* 18px */
}

.sm\:flex-row {
  /* For small screens and up */
}

.space-y-4 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}

.sm\:space-y-0 > :not([hidden]) ~ :not([hidden]) {
   /* For small screens and up */
}

.sm\:space-x-4 > :not([hidden]) ~ :not([hidden]) {
  /* For small screens and up */
}

.rounded-lg {
  border-radius: 0.5rem; /* 8px */
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
}

/* Custom styles for elements if needed, or rely on Element Plus styles for buttons */
.hero-text-custom {
  /* Specific styles for text block if needed */
}

.hero-image-custom {
  display: flex;
  justify-content: center;
}

.main-image-custom {
  max-height: 500px; 
  object-fit: cover;
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); /* shadow-xl */
}

.cta-buttons-custom .el-button {
  margin: 0.5rem;
}

.btn-custom-primary.el-button--primary {
  /* Ensure it matches: <a href="#about" class="btn btn-primary bg-white text-primary hover:bg-gray-100"> */
  background-color: white !important;
  color: var(--primary-color, #4A90E2) !important;
  border-color: white !important;
}
.btn-custom-primary.el-button--primary:hover {
  background-color: #f3f4f6 !important; /* gray-100 */
  color: var(--primary-color, #4A90E2) !important;
}

.btn-custom-oh-card.el-button--success {
  background-color: #10b981 !important;
  color: white !important;
  border-color: #10b981 !important;
}
.btn-custom-oh-card.el-button--success:hover {
  background-color: #059669 !important;
  transform: translateY(-2px);
}

.btn-custom-outline.el-button {
  /* Ensure it matches: <a href="#contact" class="btn btn-outline-light border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-primary transition"> */
  background-color: transparent !important;
  color: white !important;
  border: 2px solid white !important;
  /* padding: 0.75rem 2rem; Tailwind px-8 py-3 might be larger for a elements*/
  border-radius: 9999px !important; /* rounded-full */
}

.btn-custom-outline.el-button:hover {
  background-color: white !important;
  color: var(--primary-color, #4A90E2) !important;
}

.fade-in {
  animation: fadeIn 0.8s ease-out forwards;
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

/* Responsive styles from main.html (Tailwind's md and sm prefixes) */
@media (min-width: 640px) { /* sm */
  .sm\:flex-row {
    flex-direction: row;
  }
  .sm\:space-y-0 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0px * var(--tw-space-y-reverse));
  }
  .sm\:space-x-4 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(1rem * var(--tw-space-x-reverse));
    margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
  }
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
  .md\:text-6xl {
    font-size: 3.75rem; /* 60px */
  }
  .md\:text-2xl {
    font-size: 1.5rem; /* 24px */
  }
}
</style> 