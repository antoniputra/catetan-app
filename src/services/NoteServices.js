import Vue from 'vue'

var config = require('../../config')

const API_URL = process.env.NODE_ENV === 'production'
  ? 'http://jsonplaceholder.typicode.com/'
  : 'http://localhost:' + config.dev.port + '/api/'

const store = {}

export default store

store.noteData = {
  newNote: {
    id: '',
    title: '',
    body: ''
  },
  mode: ''
}
store.getAll = function () {
  return Vue.http.get(API_URL + 'posts', {
    _limit: 5,
  })
},

store.create = function (note) {
  return Vue.http.post(API_URL + 'posts', note)
},

store.update = function (note) {
  return Vue.http.put(API_URL + 'posts' + '/' + note.id, note)
},

store.delete = function (noteId) {
  return Vue.http.delete(API_URL + 'posts/' + noteId)
},

store._clearForm = function (context) {
  var self = context || store.noteData

  self.newNote.id = ''
  self.newNote.title = ''
  self.newNote.body = ''
  self.mode = ''
}
