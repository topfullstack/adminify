<template lang="pug">
v-flex(xs12)
  v-select(v-if="field.type == 'select'", v-bind:items='field.options', v-model='model', v-bind='field')
  template(v-else-if="['radios', 'checkboxes'].indexOf(field.type) > -1")
    p {{field.label}}
    v-layout(row, wrap)
      v-flex(v-bind="{[field.width]: true}",xs12, v-for='option in field.options',:key="field.value")
        component(
          v-model='model', 
          hide-details,
          :is="field.type == 'radios' ? 'v-radio' : 'v-checkbox'", 
          :key='option.value',
          :value='option.value', 
          :label='option.text',
        )
  template(v-else-if="['date', 'datetime', 'time'].indexOf(field.type) > -1")
    v-menu
      v-text-field(slot='activator', :label='field.label', v-model='model')
      v-date-picker(v-model='model', no-title, scrollable, actions)
  div(v-else-if="field.type == 'html'")
    label {{field.label}}
    .pt-2
      quill-editor(v-model='model')
  //todo dropzone
  dropzone#myVueDropzone(v-else-if="['file', 'image', 'video'].indexOf(field.type) > 10", url="/")
    input(type='hidden', v-model='model')
  v-text-field(v-else, v-model='model', v-bind='field', type="text",:multiLine="field.type == 'textarea'")
</template>

<script>

export default {

  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      required: false
    }
  },
  data () {
    return {

    }
  },
  computed: {

    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onSelectFile (e) {
      console.log(e)
    }
  }
}
</script>
