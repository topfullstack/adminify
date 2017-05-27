<template lang="pug">
v-layout
  v-flex(xs6)
    v-form(v-model="model", v-bind="$data", method="patch", action="settings", @success="onSuccess")
      div(slot="buttons",class="my-4")
        v-btn(light, class="grey",@click.native="$root.back()") 
          v-icon(light, left) chevron_left 
          span Back
        v-btn(primary, light, type='submit') Submit
          v-icon(right, light) send
</template>

<script>

export default {

  data() {
    return {
      model: {},
      fields: {},
      rules: {},
      messages: {},
    }
  },
  computed: {
    
    isEdit(){
      return !!this.id
    },
    
    
  },
  watch: {
    '$route': 'fetch',
    'model': 'updateFields'
  },
  methods: {
    getFieldError(fieldName){
      for (let k in this.errors) {
        let error = this.errors[k]
        if (error.field == fieldName) {
          return error.message
        }
      }
    },
    updateFields(){

    },
    fetch(){
      this.$http.get(`settings/form`, {
        params: {id: this.id}
      }).then(({data}) => {
        this.model = data.model
        this.fields = data.fields
        this.rules = data.rules
        this.messages = data.messages
      })
    },
    onSubmit(){
      
    },
    onSuccess(data){
      
    }
  },
  created() {

  }, 
  mounted() {
    this.fetch()
  }
}
</script>
