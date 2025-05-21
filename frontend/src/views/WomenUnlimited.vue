<template>
  <div class="women-unlimited-page">
    <WomenUnlimitedHeroSection />
    <WomenUnlimitedContentSection />
  </div>
</template>

<script setup>
import WomenUnlimitedHeroSection from '@/components/womenUnlimited/WomenUnlimitedHeroSection.vue';
import WomenUnlimitedContentSection from '@/components/womenUnlimited/WomenUnlimitedContentSection.vue';
</script>

<style scoped>
.women-unlimited-page {
  min-height: 100vh;
  /* 确保页面内容不会被fixed navbar遮挡，如果有的话 */
  /* padding-top: 60px;  假设navbar高度为60px */
}
</style> 