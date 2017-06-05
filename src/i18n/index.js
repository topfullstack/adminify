import Vue from 'vue'
import config from '@/config'
import VueI18n from 'vue-i18n'

const locales = ['zh-CN', 'en-US']

Vue.use(VueI18n)

let messages = {}
locales.forEach(v => {
  messages[v] = require(`./${v}/index`).default
})
const i18n = new VueI18n({
  locale: config.locale,
  messages
})

export default i18n
