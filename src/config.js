const baseUrl = 'http://localhost:3333'
const config = {
  locale: 'en-US', //en-US, zh-CN
  url: baseUrl,
  api: `${baseUrl}/admin/api`
  // locale: 'en', //en
  // api: 'http://192.168.1.108:3333/admin/api'
}

global.config = config

export default config