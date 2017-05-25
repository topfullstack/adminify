<template lang="pug">
div
  v-dialog(:value='true', persistent='')
    v-card(hover='', style='background:white')
      v-card-row.deep-purple.darken-1
        v-card-title.white--text
          .text-xs-center  {{$t(&apos;Login&apos;)}}
      v-card-row
        v-card-text.pt-4
          v-form(v-model='model', action='login', :fields='fields', @success='onSuccess')
            .pb-2
              small {{$t(&apos;* Indicates required field&apos;)}}
            div(slot='buttons')
              v-btn.ma-0(type='submit', light='', success='')
                v-icon(light='', right='') send
</template>

<style>
  
</style>

<script>

export default {

  data() {
    return {
      model: {
        username: 'admin',
        password: '123456'
      },
      
      fields: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' }
      },
      show: true
    }
  },
  methods: {
    onSuccess(data) {
      this.$store.commit('setAuth', data)
      this.$router.replace('/')
    }
  },

  mounted() {
  }
}
</script>
