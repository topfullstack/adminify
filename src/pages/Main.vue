<template>
  <v-app top-navbar :left-fixed-sidebar="sidebar">
    
    <main>
      <v-sidebar fixed class="white--text" v-model="sidebar" >
        <div class="px-3 text-xs-center">
          <h3 class="white--text mt-3">Adminify</h3>
          <p>An admin dashboard based on Vuetify</p>
          
        </div>
        <v-divider light></v-divider>
        <v-list dense>
          <template v-for="item in menu">
            <v-list-group v-if="item.items" v-bind:group="item.group">
              <v-list-tile :href="item.href"  slot="item">
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-item v-for="subItem in item.items" :key="subItem.href">
                <v-list-tile :href="subItem.href" v-bind:router="!subItem.target" ripple v-bind:disabled="subItem.disabled" v-bind:target="subItem.target">
                  <v-list-tile-action v-if="subItem.icon">
                    <v-icon class="success--text">{{ subItem.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                  </v-list-tile-content>
  
                </v-list-tile>
              </v-list-item>
            </v-list-group>
  
            <v-subheader v-else-if="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" light></v-divider>
            <v-list-item v-else>
              <v-list-tile :href="item.href" router ripple v-bind:disabled="item.disabled">
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action v-if="item.subAction">
                  <v-icon class="success--text">{{ item.subAction }}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-item>
          </template>
        </v-list>
        <div class="grey darken-4 pa-2 fixed-bottom">
          <div class="px-2">© 2017 Adonis-China.org</div>
        </div>
      </v-sidebar>

      <v-content >
        
        <v-container fluid class="pa-4">
          <v-alert v-bind="message" v-model="message.body" dismissible>{{message.body}}</v-alert>
          <h4 >
            <v-btn floating small primary @click.native="sidebar = !sidebar" > <v-icon >menu</v-icon></v-btn>
            {{pageTitle}}
          </h4>
          <div class="py-2">
            <transition mode="out-in">
            <router-view></router-view>
          </transition>
          </div>
        </v-container>
  
      </v-content>
    </main>
    
  </v-app>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex'


// import menu from 'src/menu.js' //use local menu

export default {
  data() {
    return {
      sidebar: false
    }
  },
  computed: {
    ...mapState(['message', 'menu', 'pageTitle'])
  },
  methods: {
    openSidebar() {
      this.sidebar = !this.sidebar;
    },
    
    fetchMenu() {
      //fetch menu from server
      // this.$http.get('menu').then(({data}) => this.$store.commit('setMenu', data))
    }
  },
  
  created(){
    this.fetchMenu()
  }
}
</script>


