<template>
  <div>
    <v-grid :resource="resource" :showCreateButton="true"></v-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: null,
      columns: [],
      data: {
        currentPage: 1,
        lastPage: 1,
        data: []
      }
    }
  },
  watch: {

  },
  methods: {

  },
  computed: {
    resource(){
      return this.$route.params.resource
    }
  },

  mounted() {
    
  }
}
</script>
