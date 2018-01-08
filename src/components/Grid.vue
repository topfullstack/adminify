<template>
  <div>
    <v-row >
      <v-col md4>
        <v-btn router :to="{name: 'create', params: {resource}}" primary>{{$t('Create')}}</v-btn>
      </v-col>
      <v-col md8>
        <v-form class="row jr" :inline="true" v-model="filters.model" :fields="filters.fields" 
        @submit="doSearch" submitButtonText="Search" submitButtonIcon="search"></v-form>
      </v-col>
    </v-row>
  
    <v-card >
      <v-data-table v-bind:headers="columns" v-model="data.data" hide-actions>
      <template slot="items" slot-scope="props">
        <td :class="column.left? '': 'text-xs-right'" v-for="column in columns">
          {{getColumnData(props.item, column.value)}}
        </td>
        <td v-if="actions" width="180">
          <v-btn v-if="button && button.icon" v-for="(button, key) in actions" :key="key" router floating small dark :to="{name: 'action', params: {resource, id:props.item.id, action: key}}" :primary="button.type == 'primary' || button.type == ''" :success="button.type == 'success'">
            <v-icon>{{button.icon}}</v-icon>
          </v-btn>
  
          <v-btn v-if="actions === true || actions.edit === true" router primary floating small dark :to="{name: 'edit', params: {resource,id:props.item.id}}">
            <v-icon>edit</v-icon>
          </v-btn>
  
          <v-btn v-if="actions === true || actions.delete === true" @click.native="remove(props.item)" error floating small dark>
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
      
    </v-data-table>
    <v-card-row class="jc">
        <v-pagination v-model="data.currentPage" :length="data.lastPage" circle class="ma-3"></v-pagination>
      </v-card-row>
    </v-card>
    
  </div>
</template>

<script>

export default {

  props: {
    resource: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      filters: {
        model: {},
        fields: {}
      },
      columns: [],
      actions: {},
      data: {
        currentPage: 1,
        lastPage: 1,
        data: []
      }
    }
  },
  watch: {
    'data.currentPage': 'fetchData',
    '$route': 'fetch'
  },
  methods: {
    doSearch () {
      this.$route.query.query = JSON.stringify(this.filters.model)
      // this.search = search
      this.fetchData()
    },
    filter (val, search) {
      return true
      // this.search = search
      // this.fetchData()
    },
    fetch () {
      this.fetchGrid()
      // this.fetchData()
    },
    getColumnData (row, field) {
      // process fields like `type.name`
      let [l1, l2] = field.split('.')
      if (l2) {
        return row[l1] ? row[l1][l2] : null
      } else {
        return row[l1]
      }
    },
    fetchGrid () {
      this.$http.get(`${this.resource}/grid`, { params: { page: this.data.currentPage, ...this.$route.query } }).then(({ data }) => {
        this.columns = data.columns
        this.actions = data.actions
        this.filters = data.filters
        this.fetchData()
      })
    },
    fetchData () {
      this.$http.get(`${this.resource}`, { params: { page: this.data.currentPage, ...this.$route.query } }).then(({ data }) => {
        this.data = data
      })
    },
    remove (item) {
      this.$alert('ok')
      console.log(`delete ${item.id}`)
    },
    next () {
      console.log('next')
      this.data.currentPage++
    }
  },

  created () {
    this.fetch()
  }
}
</script>
