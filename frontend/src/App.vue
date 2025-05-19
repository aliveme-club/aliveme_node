<script setup>
import { ElConfigProvider } from 'element-plus'
import MainLayout from './components/layout/MainLayout.vue'
</script>

<template>
  <el-config-provider>
    <main-layout />
  </el-config-provider>
</template>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
