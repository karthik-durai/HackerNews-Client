const appOptions = {
  el: '#app',
  data: {
    stories: ['top', 'new', 'best', 'ask', 'show', 'jobs']
  }
}

const navBarOptions = {
  props: ['story'],
  template: `<ul><li>{{ story | uppercase }}</li></ul>`,
  filters: {
    'uppercase': function (text) {
      return text.toUpperCase()
    }
  }
}

Vue.component('nav-bar', navBarOptions)

const app = new Vue(appOptions)
