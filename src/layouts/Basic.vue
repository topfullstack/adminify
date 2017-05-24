<template>
  <v-app>
    <main>
      <v-content >
        <transition mode="out-in">
          <router-view></router-view>
        </transition>
      </v-content>
    </main>
  </v-app>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  methods: {

  },
  created(){

  }
}
</script>


