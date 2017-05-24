<template>
  <div class="text-center">
    
    <div class="">
      <v-alert success :value="true" @click.native="$showModal('ok', 'text')">Hope you will love me!</v-alert>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  mounted() {
  }
}
</script>
