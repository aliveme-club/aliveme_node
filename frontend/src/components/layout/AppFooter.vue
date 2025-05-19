<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>联系我们</h3>
          <p>邮箱：sunnyz689@163.com</p>
          <p>微信：sunnyz689</p>
          <p>地址：base上海+国内旅行+线上社群活跃</p>
        </div>
        <div class="footer-section">
          <h3>关注我们</h3>
          <div class="qrcode">
            <img src="../../assets/images/aliveme/qrcode.jpg" alt="微信公众号二维码" />
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>
          <a href="https://beian.miit.gov.cn/" target="_blank">
            ICP备案/许可证号：闽ICP备2025094014号-1
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 页脚逻辑
</script>

<style scoped>
.app-footer {
  background-color: var(--background-color);
  padding: 40px 0 20px;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.footer-section {
  margin: 0 20px;
}

.footer-section h3 {
  color: var(--text-color);
  margin-bottom: 15px;
}

.footer-section p {
  color: var(--text-color-secondary);
  margin: 5px 0;
}

.qrcode img {
  width: 120px;
  height: 120px;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.footer-bottom a {
  color: var(--text-color-secondary);
  text-decoration: none;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-section {
    margin: 20px 0;
  }
}
</style> 