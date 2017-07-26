import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import data from './data'

let mock = new MockAdapter(axios, { delayResponse: 80 })

mock.onGet('/users').reply(200, {
  data: data.users.slice(0, 10)
})

mock.onPost('/login').reply(200, {
  user: data.users[0],
  token: 'DFJ091283U09AODFUP018923U4J123J'
})

// for `index` action of resources
mock.onGet(/\/(posts|users|types|comments)$/).reply(({ params = { page: 1, perPage: 10 }, url }) => {
  let resource = url.split('/')[1]
  let offset = (params.page - 1) * params.perPage
  let models = data[resource]
  return [200, {
    currentPage: params.page,
    lastPage: Math.ceil(models.length / params.perPage),
    perPage: params.perPage,
    total: data[resource].length,
    data: models.slice(offset, offset + params.perPage)
  }]
})

mock.onGet('/types/grid').reply(200, {
  'options': {
    'sort': 'id',
    'create': false,
    'update': true,
    'delete': false
  },
  'filters': {
    'model': {
      'name': '',
      'created_at': ''
    },
    'fields': {
      'name': {
        'label': 'Name'
      },
      'created_at': {
        'label': 'Created At',
        'type': 'date'
      }
    },
    'rules': {}
  },
  'columns': [
    {
      'text': 'Id',
      'value': 'id'
    },
    {
      'text': 'Name',
      left: true,
      'value': 'name'
    }
  ]
})

mock.onGet('/settings/form').reply(({ params }) => {
  return [200, {
    'model': {
      name: 'Adminify',
      logo: 'http://placeimg.com/128/128/any',
      date: null,

      type: 1,
      status: 1,

      tags: [],
      description: 'An Awesome Site',
      intro: ''
    },
    'fields': {
      'name': {label: 'Name'},
      'logo': {label: 'Logo', type: 'image'},
      'date': {label: 'Created At', type: 'datetime'},
      'type': {label: 'Type',
        type: 'select',
        options: [
        {text: 'Blog', value: 1},
        {text: 'Company', value: 2},
        {text: 'Game', value: 3}
        ]},
      'status': {label: 'Status',
        type: 'radios',
        width: 'md3',
        options: [
        {text: 'Enabled', value: 1},
        {text: 'Disabled', value: 2}
        ]},
      'tags': {label: 'Tags',
        type: 'checkboxes',
        width: 'md3',
        options: [
        {text: 'Vue', value: 1},
        {text: 'React', value: 2},
        {text: 'Angular', value: 3}
        ]},
      'description': {label: 'Description(Textarea)', type: 'textarea'},
      'intro': {label: 'Intro', type: 'html'}
    }
  }]
})

mock.onGet('/types/form').reply(({ params }) => {
  return [200, {
    'model': data.types[params.id - 1],
    'fields': {
      'name': {
        'label': 'Name',
        'required': true
      }
    }
  }]
})

mock.onGet('/posts/form').reply(({ params }) => {
  return [200, {
    'model': params.id ? data.posts[params.id - 1] : {
      type_id: null,
      title: null,
      body: null
    },
    'fields': {
      'type_id': {
        'type': 'select',
        'label': 'Type',
        'required': true,
        'options': data.choices('types')
      },
      'title': {
        'label': 'title',
        'required': true
      },
      'body': {
        'label': 'Body',
        'type': 'html'
      }

    }
  }]
})

// for `update` action of resources
mock.onPatch(/\/\w+\/\d+$/).reply(({ params, data: body, url }) => {
  // const id = url.split('/')[2]
  return [200, body]
})
mock.onPost(/\/\w+$/).reply(({ params, data: body, url }) => {
  // const id = url.split('/')[1]
  return [200, body]
})
mock.onGet('/posts/grid').reply(200, {
  'options': {
    'sort': '-id',
    'create': true,
    'update': true,
    'delete': true
  },
  'filters': {
    'model': {
      'title': '',
      'type_id': null,
      'created_at': ''
    },
    'fields': {
      'title': {
        'label': 'Title'
      },
      'type_id': {
        'type': 'select',
        'label': '',
        'options': data.choices('types')
      },
      'created_at': {
        'label': 'Created At',
        'type': 'date'
      }
    },
    'rules': {}
  },
  'columns': [
    {
      'text': 'Id',
      'value': 'id'
    },
    {
      'text': 'Type',
      left: true,
      'value': 'type.name'
    },
    {
      'text': 'Title',
      left: true,
      'value': 'title'
    },
    {
      'text': 'Created At',
      'value': 'created_at'
    }
  ]
})
mock.onGet('/users').reply(200, data.users[0])

mock.onGet('/users/grid').reply(200, {
  'options': {
    'sort': '-id',
    'create': false,
    'update': false,
    'delete': false
  },
  'filters': {
    'model': {
      'username': '',
      'created_at': ''
    },
    'fields': {
      'username': {
        'label': 'Username'
      },
      'created_at': {
        'label': 'Created At',
        'type': 'date'
      }
    },
    'rules': {}
  },
  'columns': [
    {
      'text': 'Id',
      'value': 'id'
    },
    {
      'text': 'Username',
      left: true,
      'value': 'username'
    },
    {
      'text': 'Avatar',
      left: true,
      'value': 'avatar'
    },
    {
      'text': 'Nickname',
      left: true,
      'value': 'nickname'
    }

  ]
})

mock.onGet('/users/form').reply(({ params }) => {
  return [200, {
    'model': data.users[params.id - 1],
    'fields': {
      'username': {
        'label': 'Username',
        'required': true
      },
      'nickname': {
        'label': 'Nickname',
        'required': true
      },
      'avatar': {
        'label': 'Avatar',
        'required': false
      }

    }
  }]
})

mock.onGet(/\/\w+\/grid$/i).reply(({ params, url }) => {
  return [200, {
    'options': {
      'sort': 'id',
      'create': true,
      'update': true,
      'delete': true
    },
    'filters': {
      'model': {
        'id': '',
        'created_at': ''
      },
      'fields': {

        'created_at': {
          'label': 'Created At',
          'type': 'date'
        }
      },
      'rules': {}
    },
    'columns': [
      {
        'text': 'Id',
        'value': 'id'
      },
      {
        'text': 'Created At',
        'value': 'created_at'
      }
    ]
  }]
})

export default mock

