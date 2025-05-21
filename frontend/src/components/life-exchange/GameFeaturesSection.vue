<template>
  <div class="game-features-section">
    <!-- 黄色横线和标题 -->
    <div class="title-container">
      <div class="yellow-line"></div>
      <h2 class="section-title text-3xl text-center">交换人生 - 创新社交桌游体验</h2>
    </div>

    <!-- 特色卡片 -->
    <div class="cards-container">
      <!-- 游戏特色卡片 -->
      <div class="feature-card">
        <div class="icon-container">
          <div class="green-circle-icon">
            <span class="icon-smile">😊</span>
          </div>
        </div>
        <h3 class="card-title">游戏特色</h3>
        <ul class="feature-list">
          <li>AI生成剧情卡牌</li>
          <li>结合斯坦福人生设计课程</li>
          <li>整合盖洛普优势理论</li>
          <li>数字化互动体验</li>
        </ul>
      </div>

      <!-- 游戏价值卡片 -->
      <div class="feature-card">
        <div class="icon-container">
          <div class="green-circle-icon">
            <span class="icon-exclamation">❗</span>
          </div>
        </div>
        <h3 class="card-title">游戏价值</h3>
        <ul class="feature-list">
          <li>培养同理心</li>
          <li>拓展思维边界</li>
          <li>增进人际理解</li>
          <li>探索职业发展</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// 不需要导入Element Plus图标
</script>

<style scoped>
.game-features-section {
  margin-bottom: 30px;
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
  margin: 0 auto 20px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
}

.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.feature-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.icon-container {
  margin-bottom: 20px;
}

.green-circle-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e8f5e9; /* 浅绿色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--success-color); /* 绿色 */
  font-size: 24px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.feature-list {
  list-style-type: disc;
  padding-left: 20px;
}

.feature-list li {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style> 