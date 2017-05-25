import Vue from 'vue'
import axios from 'axios'
import config from './config'

//enable mock
// import './mock'


var http = axios.create({
  baseURL: config.api,
  timeout: 1000,
  headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
});

Vue.prototype.$http = http