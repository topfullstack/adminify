<template lang="pug">
v-app
  v-navigation-drawer(light,v-model='drawer',:mini-variant.sync="mini", persistent,enable-resize-watcher)
    .pa-3.text-xs-center(v-show="!mini")
      div.display-2.py-4 Adminify
      p {{$t('An admin dashboard based on Vuetify')}}
    .pa-3.text-xs-center(v-show="mini")
      .display-2 A
    v-divider
    v-list(dense)
      template(v-for='item in menu')
        v-list-group(v-if='item.items', v-bind:group='item.group')
          v-list-tile(:href='item.href', slot='item', :title="item.title")
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title {{ $t(item.title) }}
            v-list-tile-action
              v-icon keyboard_arrow_down
          v-list-item(v-for='subItem in item.items', :key='subItem.href')
            v-list-tile(:href='subItem.href', v-bind:router='!subItem.target', ripple, v-bind:disabled='subItem.disabled', v-bind:target='subItem.target')
              v-list-tile-action(v-if='subItem.icon')
                v-icon.success--text {{ subItem.icon }}
              v-list-tile-content
                v-list-tile-title {{ $t(subItem.title) }}
        v-subheader(v-else-if='item.header', :title="item.title") {{ item.header }}
        v-divider(v-else-if='item.divider')
        v-list-item(v-else)
          v-list-tile(:href='item.href', router, ripple, v-bind:disabled='item.disabled', :title="item.title")
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title {{ $t(item.title) }}
            v-list-tile-action(v-if='item.subAction')
              v-icon.success--text {{ item.subAction }}
    
    .fixed-bottom(v-show="!mini")
      v-divider
      .px-3.py-2 
        a(href="https://github.com/wxs77577/adminify", target="_blank") Github 
        
  v-toolbar.darken-1(fixed,light,:class="theme") 
    v-toolbar-side-icon(light, @click.native.stop='drawer = !drawer')
    v-toolbar-title {{$t(pageTitle)}}
    v-menu(offset-y)
      v-btn(icon, light, slot="activator")
        v-icon format_paint
      v-list
        v-list-item(v-for="n in ['blue', 'green', 'purple', 'red']")
          v-list-tile(:class="n",@mouseover.native="theme = n")
    v-menu(offset-y)
      v-btn(icon, light, slot="activator")
        v-icon language
      v-list
        v-list-item(v-for="lang in ['zh-CN', 'en-US']")
          v-list-tile(@mouseover.native="changeLocale(lang)")
            v-list-tile-title {{lang}}
  main
    v-container.pa-4(fluid)
        v-alert(v-bind='message', v-model='message.body', dismissible) {{message.body}}
        .py-2
          v-slide-y-transition(mode='out-in')
            router-view
</template>

<script>

import { mapState } from 'vuex'

// import menu from 'src/menu.js' //use local menu

export default {
  data () {
    return {
      theme: 'primary',
      mini: false,
      drawer: true
    }
  },
  computed: {
    ...mapState(['message', 'menu', 'pageTitle'])
  },
  methods: {
    changeLocale (to) {
      global.helper.ls.set('locale', to)
      this.$i18n.locale = to
    },
    fetchMenu () {
      // fetch menu from server
      // this.$http.get('menu').then(({data}) => this.$store.commit('setMenu', data))
    }
  },

  created () {
    this.fetchMenu()
  }
}
</script>

