<template>
  <section class="hero-section text-white">
    <div class="container mx-auto px-4 hero-content">
      <div class="hero-left fade-in">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">无界女性</h1>
        <p class="text-xl md:text-2xl mb-6">突破边界，绽放自我</p>
        <p class="text-lg mb-8">为女性创造一个开放、包容、互助的交流平台，连接各行各业的优秀女性。</p>
      </div>
      <div class="hero-right fade-in" style="animation-delay: 0.3s">
        <div class="qr-codes-container">
          <div class="qr-code-item">
            <img src="@/assets/images/events/wujie_code.png" alt="无界女性报名二维码" class="qr-code-img">
            <span class="qr-code-caption">无界女性报名二维码</span>
          </div>
          <div class="qr-code-item">
            <img src="@/assets/images/aliveme/qrcode.jpg" alt="ALiveMe公众号二维码" class="qr-code-img">
            <span class="qr-code-caption">ALiveMe公众号二维码</span>
          </div>
        </div>
        <p class="qr-codes-note">
          欢迎关注ALiveMe公众号，获取无界女性活动最新动态，或扫码报名参与"无界女性"专属活动。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero-section {
  padding: 0;
  background: linear-gradient(to right, #56C271, #4A90E2); /* 绿色到蓝色渐变 */
  height: 550px; /* Unified height */
  overflow: hidden; /* Prevent content overflow */
  display: flex;
  align-items: center;
}
.hero-content {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.hero-left {
  width: 48%; /* 调整宽度 */
  padding-right: 20px;
}
.hero-right {
  width: 48%; /* 调整宽度 */
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff; /* 确保二维码下方文字也是白色 */
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

.qr-codes-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 顶部对齐 */
  gap: 30px; /* 调整间距 */
  margin-bottom: 20px;
}
.qr-code-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.qr-code-img {
  width: 160px;
  height: 160px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 8px;
}
.qr-code-caption {
  font-size: 0.9rem;
}
.qr-codes-note {
  font-size: 1rem;
  text-align: center;
  max-width: 400px; /* 限制文字宽度 */
  line-height: 1.5;
}

@media (max-width: 768px) {
  .hero-section {
    height: auto;
    min-height: 550px;
    padding: 4rem 0;
  }
  .hero-left, .hero-right {
    width: 100%;
  }
  .hero-left {
    margin-bottom: 40px;
    text-align: center;
  }
  .hero-right {
     color: #fff; /* 小屏幕下确保二维码下方文字也是白色 */
  }
   .qr-codes-container {
    flex-direction: column; /* 小屏幕下二维码垂直排列 */
    align-items: center;
    gap: 20px;
  }
}
</style> 