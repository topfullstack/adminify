<template>
  <div class="text-center">
    
    <div class="">
      <v-alert success :value="true">Hope you will love me!</v-alert>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      background: ''
    }
  },
  methods: {
    changeBackground (val) {
      document.body.style.background = val
    }
  },
  mounted () {
    this.changeBackground('darkgreen')
  }
}
</script>
