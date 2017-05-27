<template lang="pug">
v-flex(xs12)
  v-select(v-if="field.type == 'select'", v-bind:items='field.options', v-model='model', v-bind='field')
  template(v-else-if="field.type == 'radio'")
    p {{field.label}}
    v-radio(v-for='option in field.options', :key='option.value', primary, :value='option.value', v-model='model', :label='option.label')
  template(v-else-if="['date', 'datetime', 'time'].indexOf(field.type) > -1")
    v-menu
      v-text-field(slot='activator', :label='field.label', v-model='model')
      v-date-picker(v-model='model', no-title, scrollable, actions)
  template(v-else-if="field.type == 'html'")
    p {{field.label}}
    quill-editor(v-model='model')
  //todo dropzone
  dropzone#myVueDropzone(v-else-if="['file', 'image', 'video'].indexOf(field.type) > 10", url="/")
    input(type='hidden', v-model='model')
  v-text-field(v-else, v-model='model', v-bind='field', type="text")
</template>

<script>
import Dropzone from 'vue2-dropzone'

export default {
  components: {
    Dropzone
  },
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      required: false
    }
  },
  data() {
    return {

    }
  },
  computed: {

    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onSelectFile(e){
      console.log(e);
    }
  }
}
</script>