import Vue from 'vue'
import Vuex from 'vuex'
import menu from '../menu'
import config from '../config'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pageTitle: 'Home',
    menu: menu,
    user: {},
    token: null,
    message: {
      type: null,
      body: null
    },
    config: config

  },
  mutations: {

    setAuth (state, { user, token }) {
      state.user = user
      state.token = token
      global.helper.ls.set('user', user)
      global.helper.ls.set('token', token)
    },
    setMenu (state, data) {
      state.menu = data
    },
    setPageTitle (state, data) {
      state.pageTitle = data
    },
    showMessage (state, type, body) {
      state.message = { type, body }
    }
  },
  actions: {

    checkAuth ({ commit }) {
      let data = {
        user: global.helper.ls.get('user'),
        token: global.helper.ls.get('token')
      }
      commit('setAuth', data)
    },
    checkPageTitle ({commit, state}, path) {
      for (let k in state.menu) {
        if (state.menu[k].href === path) {
          commit('setPageTitle', state.menu[k].title)
          break
        }
      }
    }
  }
})

export default store
