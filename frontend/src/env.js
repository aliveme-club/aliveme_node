// 环境变量配置
export const BASE_URL = ''
export const API_URL = '/api'

// 模拟process.env对象
window.process = {
  env: {
    BASE_URL: BASE_URL,
    API_URL: API_URL,
    NODE_ENV: 'development'
  }
}

export default window.process 