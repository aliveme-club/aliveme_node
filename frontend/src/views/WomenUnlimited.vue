<template>
  <div class="women-unlimited-page">
    <WomenUnlimitedHeroSection />
    <WomenUnlimitedContentSection />
  </div>
</template>

<script setup>
import WomenUnlimitedHeroSection from '@/components/women-unlimited/WomenUnlimitedHeroSection.vue';
import WomenUnlimitedContentSection from '@/components/women-unlimited/WomenUnlimitedContentSection.vue';
</script>

<style scoped>
.women-unlimited-page {
  min-height: 100vh;
  /* 确保页面内容不会被fixed navbar遮挡，如果有的话 */
  /* padding-top: 60px;  假设navbar高度为60px */
}
</style> 