const appOptions = {
  el: '#app',
  data: {
    stories: ['top', 'new', 'best', 'ask', 'show', 'jobs']
  },
  filters: {
    'uppercase': function (text) {
      return text.toUpperCase()
    }
  }
}

const navBarOptions = {
  props: ['story'],
  template: `<ul><li>{{ story | uppercase }}</li></ul>`
}

Vue.component('nav-bar', navBarOptions)

const app = new Vue(appOptions)
