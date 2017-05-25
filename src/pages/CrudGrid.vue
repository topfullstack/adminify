<template lang="pug">
div
  v-layout
    v-flex(md4)
      v-btn(router, :to="{name: 'create', params: {resource}}", primary, light) {{$t("Create ")}}
    v-flex(md8)
      v-form.row.jr(:inline='true', v-model='filters.model', :fields='filters.fields', @submit='doSearch', submitButtonText='Search', submitButtonIcon='search')
  v-card
    v-data-table(:headers='columns', :items='items',:total-items="pagination.totalItems", :pagination.sync="pagination", :loading="loading")
      template(slot='items', scope='props')
        td(:class="column.left? '': 'text-xs-right'", v-for='column in columns') {{getColumnData(props.item, column.value)}}
        td(v-if='actions !== false', width='180')
          template(v-for="(value, action) in actions")
            v-btn(v-if="['edit', 'delete'].indexOf(action) < 0", router,primary,floating,small,dark,:to="{name: action, params: {resource,id:props.item.id}}")
              v-icon {{action.icon ? action.icon : action}}
          v-btn(v-if="actions.edit !== false",router,primary,floating,small,:to="{name: 'edit', params: {resource,id:props.item.id}}")
            v-icon(light) edit
          v-btn(v-if="actions.delete !== false",danger,floating,small,@click="remove(item)")
            v-icon delete
    v-card-row.jc
      v-pagination.ma-3(v-model='pagination.page', :length='totalPages', circle)
</template>

<script>
export default {
  data() {
    return {
      filters: {
        model: {},
        fields: {}
      },
      loading: false,
      columns: [], //fetch grid setup params from server if `columns` is empty
      actions: {},
      pagination: {
        page: 1,
        rowsPerPage: 10,
        sortBy: 'id',
        totalItems: 0
      },
      items: [],
    }
  },
  
  watch: {
    pagination: {
      handler () {
        this.fetchData()
      },
      deep: true
    },
    '$route': 'refresh',
  },
  methods: {
    doSearch() {
      this.$route.query.query = JSON.stringify(this.filters.model)
      // this.search = search
      this.fetchData()
    },
    filter(val, search) {
      return true
      // this.search = search
      // this.fetchData()
    },
    refresh() {
      this.columns = []
      this.fetch()
    },
    fetch() {

      if (this.columns.length <= 0) {
        //fetch grid params from server: e.g. /crud/users/grid
        this.fetchGrid()
      } else {
        //or define grid params manually
        this.fetchData()
      }
    },
    getColumnData(row, field) {
      //process fields like `type.name`
      let [l1, l2] = field.split('.')
      if (l2) {
        return row[l1] ? row[l1][l2] : null
      } else {
        return row[l1]
      }

    },
    fetchGrid() {
      this.$http.get(`${this.resource}/grid`).then(({ data }) => {
        this.columns = data.columns
        this.actions = data.actions
        this.filters = data.filters
        this.fetchData()
      })
    },
    fetchData() {
      let sort = this.pagination.sortBy
      if (this.pagination.descending){
        sort = '-' + sort
      }
      this.$http.get(`${this.resource}`, {
        params: {
          sort: sort,
          perPage: this.pagination.rowsPerPage,
          page: this.pagination.page, 
          ...this.$route.query 
        } 
      }).then(({ data }) => {
        this.items = data.data
        console.log(this.items)
        this.pagination.totalItems = data.total
      })
    },
    remove(item) {
      // this.$alert('ok')
      console.log(`delete ${item.id}`)
    },
    next() {
      console.log('next')
      this.pagination.page++
    }
  },
  computed: {
    resource() {
      return this.$route.params.resource
    },
    totalPages(){
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },

  mounted() {

  },
  created() {

    this.fetch()
  }

}
</script>
