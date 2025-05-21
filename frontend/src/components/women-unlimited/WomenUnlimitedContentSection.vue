<template>
  <section class="content-section bg-light">
    <div class="container mx-auto px-4">
      <div class="title-container">
        <div class="yellow-line"></div>
        <h2 class="section-title">无界女性百人大会</h2>
      </div>

      <div class="cards-grid">
        <div class="info-card">
          <div class="card-icon-wrapper">
            <el-icon :size="32"><Avatar /></el-icon>
          </div>
          <h3 class="card-title">活动亮点</h3>
          <ul class="info-list">
            <li>跨界对话：连接科技、心理、人文领域女性</li>
            <li>经验分享：职场发展、个人成长经验交流</li>
            <li>资源对接：搭建合作与发展的桥梁</li>
          </ul>
        </div>

        <div class="info-card">
          <div class="card-icon-wrapper">
            <el-icon :size="32"><Opportunity /></el-icon>
          </div>
          <h3 class="card-title">参与收获</h3>
          <ul class="info-list">
            <li>拓展人脉圈层</li>
            <li>获取成长机遇</li>
            <li>提升个人影响力</li>
          </ul>
        </div>
      </div>

      <div class="full-width-card">
        <h3 class="card-title">无界女性百人大会是什么？</h3>
        <p>无界女性百人大会是ALiveMe打造的标志性活动，致力于为女性创造一个开放、包容、互助的交流平台。我们邀请来自不同行业、不同领域的女性精英，分享她们的成长故事、职业经验和人生感悟，共同探讨女性在当代社会中的角色和发展。</p>
        <p>通过这个平台，我们希望能够打破行业壁垒，连接不同领域的优秀女性，促进跨界交流与合作，共同创造更多可能性。</p>
      </div>

      <div class="full-width-card">
        <h3 class="card-title">活动安排</h3>
        <p>我们将于5月24日举办产品发布会暨上海无界女性百人大会，诚邀各界女性精英参与。活动将包括主题演讲、圆桌讨论、互动工作坊等环节，为参与者提供丰富多样的交流机会。</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Avatar, Opportunity } from '@element-plus/icons-vue';

const activityHighlights = ref([
  {
    title: '活动亮点',
    description: '跨界对话：连接科技、心理、人文领域女性',
    icon: Avatar,
  },
  {
    title: '参与收获',
    description: '拓展人脉圈层',
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