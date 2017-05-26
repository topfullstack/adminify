<template lang="pug">
div
  form(:action='action', @submit.prevent='onSubmit')
    v-layout(justify-end, v-bind="{[inline? 'row': 'column']: true}")
      v-flex(v-for='(field, name) in fields', :key='name', :xs12="12")
        v-select(v-if="field.type == 'select'", v-bind:items='field.options', v-model='model[name]', v-bind='field')
        template(v-else-if="field.type == 'radio'")
          p {{field.label}}
          v-radio(v-for='option in field.options', :key='option.value', primary, :value='option.value', v-model='model[name]', :label='option.label')
        template(v-else-if="field.type == 'date'")
          v-menu
            v-text-field(slot='activator', :label='field.label', v-model='model[name]')
            v-date-picker(v-model='model[name]', no-title, scrollable, actions)
        template(v-else-if="field.type == 'html'")
          p {{field.label}}
          quill-editor(v-model='model[name]')
        v-text-field(v-else, v-model='model[name]', v-bind='field')
      v-alert.py-2(error, v-model='hasError')
        div(v-for='error in errors')  {{error.message}}
      slot
      v-flex.pt-4.actions(xs12)
        slot(name='buttons')
          v-btn.ma-0(primary, light, type='submit') {{submitButtonText}}
            v-icon(right, light) {{submitButtonIcon}}
</template>

<script>
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import validator from 'indicative'

Vue.use(VueQuillEditor)

export default {
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    action: {
      required: false,
      type: String,
      default: null
    },
    submitButtonText: {
      required: false,
      type: String,
      default: 'Submit'
    },
    submitButtonIcon: {
      required: false,
      type: String,
      default: 'send'
    },
    method: {
      required: false,
      type: String,
      default: 'post'
    },
    value: {
      required: false,
      type: Object,
      default: () => { }
    },
    fields: {
      required: true,
      type: Object
    },

    rules: {
      required: false,
      type: Object,
      default: () => { }
    },
    messages: {
      required: false,
      type: Object,
      default: () => { }
    },

  },
  data() {
    return {
      model: this.value,
      hasError: false,
      errors: [],
      message: ''
    }
  },

  computed: {
    autoSubmit() {
      return !!this.action
    }
  },
  watch: {
    'value'(val) {
      this.model = val
    },
    '$route': 'fetch',
    'model': 'updateFields'
  },
  methods: {
    onSelected(value, name) {
      // console.log(arguments)
      console.log(value.id, name)
      // this.model[name] = value ? value.id : null
    },
    getFieldError(fieldName) {
      for (let k in this.errors) {
        let error = this.errors[k]
        if (error.field == fieldName) {
          return error.message
        }
      }
    },
    updateFields() {

    },
    fetch() {
      if (!this.autoSubmit) {
        return false
      }
      this.$http.get(`${this.resource}/form`, {
        params: { id: this.id },
        ...this.$route.query
      }).then(({ data }) => {
        this.model = data.model
        this.fields = data.fields
        this.rules = data.rules
        this.messages = data.messages
      })
    },
    onSubmit() {

      validator.validate(this.model, this.rules, this.messages).then(() => {

        this.$emit("input", this.model)
        if (!this.autoSubmit) {
          this.$emit('submit')
          return false
        }

        this.$http[this.method](this.action, this.model).then(({ data }) => {
          this.$emit("success", data)
          this.hasError = false

        }).catch(({ response }) => {
          let { status, data } = response
          this.hasError = true
          if (data.message) {
            this.errors = [data]
          }
          switch (status) {
            case 422:

              this.errors = data
              break;
            default:

          }
          this.$emit('error', status, data)
        })
      }).catch((errors) => {
        console.info(errors)
        this.hasError = true
        this.errors = errors
        this.$emit('error', errors)
        // this.$bus.showMessage('error', 'error')
      })

    }
  },
  mounted() {
    // this.$bus.showMessage('success', 'success')
    // this.fetch()
  },
  created() {
    validator.extend('unique', function (data, field, message, args, get) {
      return new Promise(function (resolve, reject) {
        const fieldValue = get(data, field)
        return resolve('Unsupported in client.')
      })
    }, this.$t('Field should be unique.'))
  }
}
</script>
