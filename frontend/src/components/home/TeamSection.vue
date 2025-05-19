<template>
  <section id="team" class="section team-section-updated">
    <div class="container mx-auto px-4">
      <h2 class="section-title text-3xl text-center mb-16">主理人</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Sunny -->
        <div class="team-card fade-in">
          <div class="decorative-bg decorative-circle"></div>
          <div class="team-header">
            <div class="flex justify-between items-center">
              <h3 class="text-2xl font-bold">Sunny林琅</h3>
              <span class="role-badge">创始人 & CEO</span>
            </div>
          </div>
          <div class="team-content">
            <div class="profile-img-container">
              <img :src="sunnyImgUrl" alt="Sunny林琅" class="profile-img">
            </div>
            <div class="team-bio">
              <p>AI心理社区ALiveMe创始人，周周黑客松上海主理人，hedy.org开源编程中国区主理人（华东师大与电子科大等合作项目）。</p>
              <p>以"人即媒介"理念链接跨领域社群，打造去中心化AI社交名片网，赋能【心理人文类】主理人。</p>
            </div>
          </div>
        </div>

        <!-- Wind -->
        <div class="team-card fade-in" style="animation-delay: 0.2s">
          <div class="decorative-bg decorative-dots"></div>
          <div class="team-header">
            <div class="flex justify-between items-center">
              <h3 class="text-2xl font-bold">Wind</h3>
              <span class="role-badge">技术负责人</span>
            </div>
          </div>
          <div class="team-content">
            <div class="profile-img-container">
              <img :src="windImgUrl" alt="Wind" class="profile-img">
            </div>
            <div class="team-bio">
              <p>负责ALiveMe技术架构与开发。金融从业AI agent搭建负责人，2023百度游戏大模王第一名。</p>
              <p>18年老游戏玩家，2年AI新玩家，朝着游戏化人生的道路探索。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import sunnyImgUrl from '@/assets/images/team/sunny_personal_photo3.jpg';
import windImgUrl from '@/assets/images/team/wind.jpg';
// No script needed for this static component based on main.html
</script>

<style scoped>
/* Styles adapted from main.html and new additions for Vue component */
.team-section-updated {
  padding: 80px 0;
  background-color: #fff; /* section bg-light in main.html is often white or very light gray */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem; /* px-4 */
}

.section-title {
  color: var(--text-primary, #333);
  /* text-3xl text-center mb-16 */
  font-size: 1.875rem; /* 30px */
  line-height: 2.25rem; /* 36px */
  text-align: center;
  margin-bottom: 4rem; /* 64px */
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) { /* md:grid-cols-2 */
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.gap-8 {
  gap: 2rem; /* 32px */
}

.team-card {
  background-color: #f9fafb; /* A light gray, similar to card backgrounds */
  border-radius: 0.75rem; /* rounded-lg */
  padding: 1.5rem; /* p-6 */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-lg */
  position: relative;
  overflow: hidden; /* To contain decorative elements if they overflow */
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

.decorative-bg {
  position: absolute;
  opacity: 0.1;
  pointer-events: none;
}

.decorative-circle {
  width: 200px;
  height: 200px;
  background-color: var(--primary-color, #4F46E5);
  border-radius: 50%;
  top: -50px;
  left: -50px;
}

.decorative-dots {
  /* Simple dot pattern example, main.html doesn't specify exact style */
  width: 100px;
  height: 100px;
  background-image: radial-gradient(var(--accent-color, #F59E0B) 2px, transparent 2px);
  background-size: 10px 10px;
  top: 20px;
  right: 20px;
}

.team-header {
  margin-bottom: 1rem; /* mb-4 */
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.text-2xl {
  font-size: 1.5rem; /* 24px */
  line-height: 2rem; /* 32px */
}

.font-bold {
  font-weight: 700;
}

.role-badge {
  background-color: var(--primary-color, #4F46E5);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px; /* rounded-full */
  font-size: 0.75rem; /* text-xs or sm */
}

.team-content {
  display: flex;
  flex-direction: column;
}

@media (min-width: 640px) { /* sm screen or general layout */
  .team-content {
    /* In main.html, it's more complex with nested divs.
       Simplifying for Vue, or assuming img and bio are stacked or side-by-side based on context.
       main.html has them effectively side-by-side within the .team-content > .profile-img-container and .team-content > .team-bio
       Let's replicate that basic structure if possible, or make it responsive.
    */
  }
}

.profile-img-container {
  margin-bottom: 1rem; /* Space between image and bio if stacked */
  text-align: center; /* Center image if stacked */
}

.profile-img {
  width: 150px; /* Adjust as needed */
  height: 150px;
  border-radius: 50%; /* rounded-full */
  object-fit: cover;
  margin: 0 auto 1rem auto; /* Center image and add bottom margin */
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.team-bio p {
  font-size: 0.875rem; /* text-sm or base */
  line-height: 1.6;
  color: var(--text-secondary, #555);
  margin-bottom: 0.75rem;
}

.team-bio p:last-child {
  margin-bottom: 0;
}

/* Responsive adjustments for team cards */
@media (min-width: 768px) { /* md */
  .md\:grid-cols-2 {
     grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style> 