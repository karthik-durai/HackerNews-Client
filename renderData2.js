let items = {}
let segregatedList = {}
let comments = {}

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

function populateComments (storyID) {
  app.comments = []
  comments[storyID].forEach(i => i.then(data => app.comments.push(data)))
}

const appOptions = {
  el: '#app',
  data: {
    itemList: [],
    comments: [],
    stories: ['top', 'new', 'best', 'ask', 'show', 'jobs'],
    activeStory: 'top',
    pagenumber: 1,
    showStories: true
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
    },
    renderComments: function (storyID) {
      this.showStories = false
      getComments(this.activeStory, this.pagenumber - 1, storyID)
      populateComments(storyID)
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
        return false
      }
    }
  }
}

const storyNavOptions = {
  props: ['item'],
  template: `<li class="nav-items" v-on:click="$emit('setstory', $event)">{{ item }}</li>`
}

Vue.component('stories-nav', storyNavOptions)

const app = new Vue(appOptions)
