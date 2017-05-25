import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Mock from 'mockjs'

import data from './data'

let mock = new MockAdapter(axios)

mock.onGet('/users').reply(200, Mock.mock({
  'data': data.users.slice(0, 10)
}));
mock.onPost('/login').reply(200, {
  user: data.users[0]
});
mock.onPost('/types').reply(200, {
  currentPage: 1,
  lastPage: 2,
  data: data.types
});
mock.onPost('/types').reply(200, {
  currentPage: 1,
  lastPage: 2,
  data: data.types
});
mock.onPost('/types/:id').reply(config =>  console.log(config));


export default {
  
}

