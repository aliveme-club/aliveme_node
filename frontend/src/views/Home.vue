<template>
  <div class="home">
    <hero-section />
    <about-section />
    <team-section />
    <timeline-section />
    <features-section />
    <partners-section />
    <energy-community-section />
    <collaboration-section />
    <posters-section />
  </div>
</template>

<script setup>
import HeroSection from '@/components/home/HeroSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import TeamSection from '@/components/home/TeamSection.vue'
import TimelineSection from '@/components/home/TimelineSection.vue'
import FeaturesSection from '@/components/home/FeaturesSection.vue'
import PartnersSection from '@/components/home/PartnersSection.vue'
import EnergyCommunitySection from '@/components/home/EnergyCommunitySection.vue'
import CollaborationSection from '@/components/home/CollaborationSection.vue'
import PostersSection from '@/components/home/PostersSection.vue'
</script>

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
}
</style> 