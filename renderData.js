const appOptions = {
  el: '#app',
  data: {
    stories: ['top', 'new', 'best', 'ask', 'show', 'jobs'],
    activeStory: 'top'
  },
  methods: {
    setstory: function (e) {
      this.activeStory = e.target.textContent
    }
  }
}

const navBarOptions = {
  props: ['story'],
  template: `<ul><li><a href="#" v-on:click="$emit('setstory', $event)">{{ story | uppercase }}</a></li></ul>`,
  filters: {
    'uppercase': function (text) {
      return text.toUpperCase()
    }
  }
}

Vue.component('nav-bar', navBarOptions)
//  Vue.component('items-container', itemsContainerOptions)

const app = new Vue(appOptions)
