import Mock from 'mockjs'

let data = {
  users: [],
  types: [],
  posts: [],
  comments: []
}
for (let i = 1; i <= 30; i++) {
  data.users.push(Mock.mock({
    id: i,
    username: '@first',
    password: '123456',
    avatar: '@image',
    nickname: '@name',
    // avatar: Mock.Random.image(),
    created_at: '@datetime',
    updated_at: '@datetime',
    deleted_at: null
  }))
}

data.users[0].username = 'admin' // default user

for (let i = 1; i <= 6; i++) {
  data.types.push(Mock.mock({
    id: i,
    name: '@first',
    created_at: '@datetime',
    updated_at: '@datetime',
    deleted_at: null
  }))
}

for (let i = 1; i <= 33; i++) {
  data.posts.push(Mock.mock({
    id: i,
    title: '@title',
    'type_id|1-28': 1,
    'type|1': data.types,
    'user_id|1-10': 1,
    'user|1': data.users,
    created_at: '@datetime',
    updated_at: '@datetime',
    deleted_at: null
  }))
}

for (let i = 1; i <= 20; i++) {
  data.comments.push(Mock.mock({
    id: i,
    body: '@sentence',
    'post_id|1-28': 1,
    'post|1': data.posts,
    'user_id|1-10': 1,
    'user|1': data.users,
    created_at: '@datetime',
    updated_at: '@datetime',
    deleted_at: null
  }))
}

data.choices = resource => {
  let ret = []
  let models = data[resource]
  for (let k in models) {
    ret.push({ text: models[k].name, value: models[k].id })
  }
  return ret
}

export default data
