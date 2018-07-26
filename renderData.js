const appOptions = {
  el: '#app',
  data: {
    stories: ['top', 'new', 'best', 'ask', 'show', 'jobs'],
    directions: ['prev', 'next'],
    activeStory: 'top',
    pageNumber: 1,
    prev: 'prev',
    next: 'next',
    intervalID: 0,
    itemList: []
  },
  methods: {
    setstory: function (e) {
      this.activeStory = e.target.textContent.toLowerCase()
      this.pageNumber = 1
      this.itemList = getItems(this.activeStory, this.pageNumber - 1)
      console.log(this.itemList)
    },
    setpagenum: function (e) {
      let text = e.target.textContent
      if (text === 'prev') {
        this.pageNumber--
        this.itemList = getItems(this.activeStory, this.pageNumber - 1)
        //  console.log(this.pageNumber)
        console.log(this.itemList)
      } else if (text === 'next') {
        this.pageNumber++
        this.itemList = getItems(this.activeStory, this.pageNumber - 1)
        //  console.log(this.pageNumber)
        console.log(this.itemList)
      }
    },
    checkIfPopulated: function () {
      if (checkIfFetched() === 'not loaded') {
        console.log('not loaded')
      } else {
        this.itemList = getItems('top', 0)
        clearInterval(this.intervalID)
        console.log(this.itemList)
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
  },
  mounted: function () {
    if (checkIfFetched() === 'not loaded') {
      this.intervalID = setInterval(this.checkIfPopulated, 1000)
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
  template: `<ul><li>{{ item }}</li></ul>`
}

Vue.component('stories-nav', storiesNavOptions)
Vue.component('page-nav', pageNavOptions)
Vue.component('items-container', itemsContainerOptions)

const app = new Vue(appOptions)
