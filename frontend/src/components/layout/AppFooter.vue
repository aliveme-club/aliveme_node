<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>{{ $t('appfooter.contact') }}</h3>
          <p>{{ $t('appfooter.emailPrefix') }}@{{ $t('appfooter.emailSuffix') }}</p>
          <p>{{ $t('appfooter.wechat') }}</p>
          <p>{{ $t('appfooter.address') }}</p>
        </div>
        <div class="footer-section">
          <h3>{{ $t('appfooter.followUs') }}</h3>
          <div class="qrcode">
            <img src="../../assets/images/aliveme/qrcode.jpg" :alt="$t('appfooter.qrcodeAlt')" />
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>
          <a href="https://beian.miit.gov.cn/" target="_blank">
            {{ $t('appfooter.icp') }}
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
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