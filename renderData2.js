let items = {}
let segregatedList = {}

console.log(items)
let intervalId


function checkIfPopulated () {
  if (items[app.activeStory][app.pagenumber - 1] && segregatedList[app.activeStory].length > 0) {
    clearInterval(intervalId)
    items['top'][0].forEach(i => i.then(data => app.itemList.push(data)))
  } else {
    console.log('not loaded')
  }
}

function populateItemList () {
  app.itemList = []
  items[app.activeStory][app.pagenumber - 1].forEach(i => i.then(data => app.itemList.push(data)))
}

const appOptions = {
  el: '#app',
  data: {
    itemList: [],
    stories: ['top', 'new', 'best', 'ask', 'show', 'jobs'],
    activeStory: 'top',
    pagenumber: 1
  },
  mounted: function () {
    intervalId = setInterval(checkIfPopulated, 1000)
  },
  methods: {
    setstory: function (e) {
      this.activeStory = e.target.textContent.toLowerCase()
      this.pagenumber = 1
      getItems(this.activeStory, 0)
      populateItemList()
    },
    setpagenum: function (e) {
      let direction = e.target.textContent
      if (direction === 'prev') {
        this.pagenumber--
        getItems(this.activeStory, this.pagenumber - 1)
        populateItemList()
      } else if (direction === 'next') {
        this.pagenumber++
        getItems(this.activeStory, this.pagenumber - 1)
        populateItemList()
      }
    }
  },
  computed: {
    prevdisable: function () {
      if (this.pagenumber <= 1) {
        return true
      } else {
        return false
      }
    },
    nextdisable: function () {
      try {
        if (this.pagenumber >= segregatedList[this.activeStory].length) {
          return true
        } else {
          return false
        }
      } catch (e) {
        console.log(e)
        return false
      }
    }
  }
}

const storyNavOptions = {
  props: ['item'],
  template: `<ul><li v-on:click="$emit('setstory', $event)">{{ item }}</li></ul>`
}

Vue.component('stories-nav', storyNavOptions)

const app = new Vue(appOptions)
