<template lang="pug">
div
  v-layout
    v-flex(md4)
      v-btn(router,floating, :to="{name: 'create', params: {resource}}", primary, light,v-if="options.create !== false")
        v-icon(light) add
    v-flex(md8)
      v-form.row.jr(:inline='true', v-model='filters.model', :fields='filters.fields', @submit='doSearch', submitButtonText='Search', submitButtonIcon='search')
  v-card
    v-data-table(:headers='columns', :items='items',:total-items="pagination.totalItems",hide-actions, :pagination.sync="pagination", :loading="loading")
      template(slot='items', scope='props')
        td(:class="column.left? '': 'text-xs-right'", v-for='column in columns') {{getColumnData(props.item, column.value)}}
        td(v-if='actions !== false', width='180')
          template(v-for="(value, action) in actions")
            v-btn(v-if="['edit', 'delete'].indexOf(action) < 0", router,primary,floating,small,dark,:to="{name: action, params: {resource,id:props.item.id}}")
              v-icon {{action.icon ? action.icon : action}}
          //- v-btn(v-if="options.edit !== false",router,floating,small,:to="{name: 'edit', params: {resource,id:props.item.id}}")
            v-icon edit
          v-btn(v-if="options.edit !== false",floating,primary,small,@click.native="showEdit(props.item)")
            v-icon(light) edit
          v-btn(v-if="options.delete !== false",danger,floating,small,@click="remove(props.item)")
            v-icon delete
    v-card-row.jc
      v-pagination.ma-3(v-model='pagination.page', :length='totalPages', circle)
  
  v-dialog(v-model="isShowEdit", persistent, width="options.inlineEditWidth")
    v-card
      v-card-row
        v-card-title {{$t('Edit')}} \#{{currentItem.id}}
      v-card-row
        v-card-text
          v-form(v-model="form.model", v-bind="form", method="patch", :action="resource+'/'+currentItem.id", @success="onSaveEdit")
      v-card-row(actions)
        v-btn(flat, primary, @click.native="isShowEdit = false") {{$t('Close')}}
</template>

<script>
import CrudForm from './CrudForm.vue'
const getDefaultData = () => {
  return {
      form: {
        model: {},
        fields: {},
        rules: {},
        messages: {},
      },
      filters: {
        model: {},
        fields: {}
      },
      loading: false,
      columns: [], //fetch grid setup params from server if `columns` is empty
      actions: {},
      options: {
        sort: 'id',
        create: false,
        update: true,
        delete: false
      },
      pagination: {
        page: 1,
        rowsPerPage: 10,
        sortBy: 'id',
        descending: true,
        totalItems: 0
      },
      isShowEdit: false,
      currentItem: false,
      items: [],
    }
}
export default {
  components: {CrudForm},
  data: getDefaultData,
  
  watch: {
    'pagination.page'(val){
      this.fetchData()
    },
    'pagination.sortBy'(val){
      this.fetchData()
    },
    'pagination.descending'(val){
      this.fetchData()
    },
    
    '$route.params': 'refresh',
    // '$route.query': 'updateRoute'
  },
  methods: {
    fetchForm(item){
      this.$http.get(`${this.resource}/form`, {
        params: {id: item.id}
      }).then(({data}) => {
        this.form = data
      })
    },
    onSaveEdit(data){
      if (data.id) {
        this.isShowEdit = false
        this.fetchData()
      }
    },
    showEdit(item){
      
      this.currentItem = item
      this.fetchForm(item)
      this.isShowEdit = true
    },
    preFetch(){
      let sort = this.pagination.sortBy
      if (this.pagination.descending){
        sort = '-' + sort
      }
      this.$route.query.query = JSON.stringify(this.filters.model)
      this.$route.query.sort = sort
      this.$route.query.perPage = this.pagination.rowsPerPage
      this.$route.query.page = this.pagination.page
    },
    updateRoute(){
      this.$route.query.keepLayout = true
      console.log('update route');
      this.$router.go({
        path: this.$route.path,
        params: this.$route.params,
        query: this.$route.query
      })
    },
    doSearch() {
      
      
      this.pagination.page = 1
      this.fetchData()
    },
    filter(val, search) {
      return true
      // this.search = search
      // this.fetchData()
    },
    refresh() {
      Object.assign(this.$data, getDefaultData())
      this.fetchGrid()
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
      
      return new Promise((resolve, reject) => {
        this.$http.get(`${this.resource}/grid`).then(({ data }) => {
          this.columns = data.columns
          this.actions = data.actions
          this.filters = data.filters
          this.options = data.options || {}
          
          if (this.options && this.options.sort) {
            let sortData = this.options.sort.split('-')
            let desc = sortData.length > 1
            let sortField = sortData.pop()
            
            if (sortField.indexOf('.') < 0) {
              sortField = sortField
            }
            this.pagination.sort = sortField
            this.pagination.descending = desc
          }
          resolve()
        })
      })
    },
    fetchData() {
      this.preFetch()
      this.$http.get(`${this.resource}`, {params: this.$route.query}).then(({ data }) => {
        this.items = data.data
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
    this.$store.commit('setPageTitle', helper.i.titleize(helper.i.pluralize(this.resource)))
    this.fetchGrid().then(() => this.fetchData())
    // this.fetch()
  }

}
</script>
