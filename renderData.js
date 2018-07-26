const appOptions = {
  el: '#app',
  data: {
    stories: ['top', 'new', 'best', 'ask', 'show', 'jobs'],
    directions: ['prev', 'next'],
    activeStory: 'top',
    pageNumber: 1,
    prev: 'prev',
    next: 'next',
    itemList: ''
  },
  methods: {
    setstory: function (e) {
      this.activeStory = e.target.textContent.toLowerCase()
      this.pageNumber = 1
      getItems(this.activeStory, this.pageNumber - 1)
    },
    setpagenum: function (e) {
      let text = e.target.textContent
      if (text === 'prev') {
        this.pageNumber--
        getItems(this.activeStory, this.pageNumber - 1)
        console.log(this.pageNumber)
      } else if (text === 'next') {
        this.pageNumber++
        getItems(this.activeStory, this.pageNumber - 1)
        console.log(this.pageNumber)
      }
    }
  },
  computed: {
    prevdisable: function () {
      if (this.pageNumber <= 1) {
        return true
      } else {
        return false
      }
    },
    nextdisable: function () {
      if (this.pageNumber >= segregatedList[this.activeStory].length) {
        return true
      } else {
        return false
      }
    }
  }
}

const storiesNavOptions = {
  props: ['story'],
  template: `<ul><li><a href="#" v-on:click="$emit('setstory', $event)">{{ story | uppercase }}</a></li></ul>`,
  filters: {
    'uppercase': function (text) {
      return text.toUpperCase()
    }
  }
}

const pageNavOptions = {
  props: ['direction', 'isdisabled'],
  template: `<button v-on:click="$emit('setpagenum', $event)" v-bind:disabled="isdisabled">{{ direction }}</button>`
}

const itemsContainerOptions = {
  props: ['item'],
  template: `<ul><li>{{ item.title }}</li></ul>`
}

Vue.component('stories-nav', storiesNavOptions)
Vue.component('page-nav', pageNavOptions)
//  Vue.component('items-container', itemsContainerOptions)

const app = new Vue(appOptions)
