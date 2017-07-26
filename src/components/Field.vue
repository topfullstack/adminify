<template lang="pug">
v-flex(xs12)
  v-select(v-if="['select', 'select2'].includes(field.type)", :items='field.choices', v-model='model', v-bind='field')
  template(v-else-if="['radios', 'checkboxes'].indexOf(field.type) > -1")
    p {{$t(field.label)}}
    v-layout(row, wrap)
      v-flex(v-bind="{[field.width]: true}",xs12, v-for='option in field.choices',:key="field.value")
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
      v-text-field(slot='activator', v-model='model', :label="$t(field.label)")
      v-date-picker(v-model='model', no-title, scrollable, actions)
  div(:class="inputGroupClass",v-else-if="field.type == 'html'")
    label {{$t(field.label)}}
    div.pt-2
      quill-editor(v-model='model')
  //todo dropzone
  div(:class="inputGroupClass",v-else-if="['file', 'image', 'video'].includes(field.type)")
    label {{$t(field.label)}}
    div.pt-2
      dropzone(:id="'dropzone_' + name", :url="$store.state.config.ajaxUploadUrl")
        input(type='hidden', v-model='model')
  v-text-field(v-else, v-model='model', v-bind='field', :label="$t(field.label)" :placeholder="$t(field.placeholder)" type="text",:multiLine="field.type == 'textarea'")
</template>

<script>

export default {

  props: {
    field: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    value: {
      required: false
    }
  },
  data () {
    return {
      inputGroupClass: 'input-group input-group--dirty input-group--text-field'
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
