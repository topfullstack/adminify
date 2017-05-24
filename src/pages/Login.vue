<template>
  <div>
    <v-dialog :value="true" persistent>
      <v-card hover>
        <v-card-row class="deep-purple darken-1">
          <v-card-title class="white--text">
            <div class="text-xs-center"> {{$t('login')}}</div>
          </v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text class="pt-4">
            <v-form v-model="model" action="login" :fields="fields" @success="onSuccess">
  
              <div class="pb-2">
                <small>{{$t('* indicates required field')}}</small>
              </div>
  
              <div slot="buttons">
  
                <v-btn type="submit" class="ma-0" light success>{{$t('login')}}
                  <v-icon light right>send</v-icon>
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {

  data() {
    return {
      model: {
        username: 'wxs77577',
        password: '123456'
      },
      fields: {
        username: { label: this.$t('username') },
        password: { label: this.$t('password'), type: 'password' }
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
