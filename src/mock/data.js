import Mock from 'mockjs'

let data = {
  users: [],
  types: [],
  posts: [],

}
for (let i = 1; i <= 100; i++) {
  data.users.push(Mock.mock({
    username: '@name',
    password: '123456',
    avatar: '@image',
    // avatar: Mock.Random.image(),
    created_at: '@datetime',
    updated_at: '@datetime',
    deleted_at: null,
  }))
}
data.users[0].username = 'admin' //default user

for (let i = 1; i <= 20; i++) {
  data.types.push(Mock.mock({
    id: i + 1,
    name: '@words',
    created_at: '@datetime',
    updated_at: '@datetime',
    deleted_at: null,
  }))
}

export default data