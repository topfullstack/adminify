<template>
  <div>
    <v-form v-model="model" v-bind="$data" :method="method" :action="action" @success="onSuccess"></v-form>
  </div>
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
    method(){
      return this.isEdit ? 'patch' : 'post'
    },
    action(){
      if (this.isEdit) {
        return `${this.resource}/${this.id}`
      } else {
        return `${this.resource}`
      }
    },
    isEdit(){
      return !!this.id
    },
    resource(){
      return this.$route.params.resource
    },
    id(){
      return this.$route.params.id
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
      this.$http.get(`${this.resource}/form`, {
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
      if (data.id) {
        this.$router.go(-1)
      }
    }
  },
  mounted() {
    // this.$bus.showMessage('success', 'success')
    this.fetch()
  }
}
</script>
