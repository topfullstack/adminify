<template lang="pug">
v-layout
  v-flex(xs8)
    v-form(v-model="model", v-bind="$data", :method="method", :action="action", @success="onSuccess")
      div(slot="buttons",class="my-4")
        
        v-btn(dark, class="grey",@click.native="$root.back()") 
          v-icon(dark, left) chevron_left 
          span {{$t('Back')}}
        v-btn(primary, dark, type='submit') {{$t('Submit')}}
          v-icon(right, dark) send
</template>

<script>

export default {

  data () {
    return {
      model: {},
      fields: {},
      rules: {},
      messages: {}
    }
  },
  computed: {
    method () {
      return this.isEdit ? 'patch' : 'post'
    },
    action () {
      if (this.isEdit) {
        return `${this.resource}/${this.id}`
      } else {
        return `${this.resource}`
      }
    },
    isEdit () {
      return !!this.id
    },
    resource () {
      return this.$route.params.resource
    },
    id () {
      return this.$route.params.id
    }

  },
  watch: {
    '$route': 'fetch',
    'model': 'updateFields'
  },
  methods: {
    getFieldError (fieldName) {
      for (let k in this.errors) {
        let error = this.errors[k]
        if (error.field === fieldName) {
          return error.message
        }
      }
    },
    updateFields () {

    },
    fetch () {
      this.$http.get(`${this.resource}/form`, {
        params: {id: this.id}
      }).then(({data}) => {
        this.model = data.model
        this.fields = data.fields
        this.rules = data.rules
        this.messages = data.messages
      })
    },
    onSubmit () {

    },
    onSuccess (data) {
      this.$router.push({name: 'grid', params: {resource: this.resource}})
      if (data.id) {
        // this.$router.go(-1)
      }
    }
  },
  created () {
    let pageTitle = (this.isEdit ? 'Update' : 'Create') + ' ' + global.helper.i.titleize(global.helper.i.singularize(this.resource))
    this.$store.commit('setPageTitle', pageTitle)
  },
  mounted () {
    // this.$bus.showMessage('success', 'success')
    this.fetch()
  }
}
</script>
