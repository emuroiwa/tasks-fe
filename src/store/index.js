import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:8000/api'

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    tasks: [],
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
  },
  mutations: {
    getTasks(state, tasks) {
      state.tasks = tasks
    },
    getToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
    clearTasks(state) {
      state.tasks = []
    },
  },
  actions: {

    clearTasks(context) {
      context.commit('clearTasks')
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
          c_password: data.c_password,
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
    getToken(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('/login', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.success.token

            localStorage.setItem('access_token', token)
            context.commit('getToken', token)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })
    },
    getTasks(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/tasks')
        .then(response => {
          context.commit('getTasks', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    tick(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/tick')
        .then(response => {
        })
        .catch(error => {
          console.log(error)
        })
    },

  }
})
