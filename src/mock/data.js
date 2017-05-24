import Mock from 'mockjs'

let users = []
for (let i = 0; i < 100; i++) {
  users.push(Mock.mock({
    username: '@name',
    password: '123456',
    avatar: '@image',
    // avatar: Mock.Random.image(),
    created_at: '@datetime',
    updated_at: '@datetime',
    deleted_at: null,
  }))
}

export default {
  users
}