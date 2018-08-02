const appOptions = {
  el: '#app',
  data: {
    stories: {},
    segregatedList: {},
    kidsList: {},
    comments: {},
    activeStoryType: 'top',
    activePageNumber: 1,
    activeCommentId: 0,
    activeCommentReplyId: 0,
    toBeRendered: [],
    interval: '',
    showstories: 'true',
    showcomments: 'false'
  },
  methods: {
    checkIfStoriesLoaded: checkIfStoriesLoadedFn,
    populateStories: populateStoriesFn,
    checkIfCommentsLoaded: checkIfCommentsLoadedFn,
    populateComments: populateCommentsFn
  },
  mounted: function () {
    this.interval = setInterval(this.checkIfStoriesLoaded, 1000)
  },
  watch: {
    activePageNumber: function () {
      this.showstories = true
      this.showcomments = false
      fetchItems(this.activeStoryType, this.activePageNumber - 1)
      this.interval = setInterval(this.checkIfStoriesLoaded, 1000)
    },
    activeStoryType: function () {
      this.showstories = true
      this.showcomments = false
      this.activePageNumber = 1
      fetchItems(this.activeStoryType, this.activePageNumber - 1)
      this.interval = setInterval(this.checkIfStoriesLoaded, 1000)
    },
    activeCommentId: function () {
      this.showstories = false
      this.showcomments = true
      getComments(this.activeStoryType, this.activePageNumber - 1, this.activeCommentId)
      this.interval = setInterval(this.checkIfCommentsLoaded, 1000)
    },
    activeCommentsReplyId: function () {
      this.showstories = false
      this.showcomments = true
    }
  }
}

function checkIfStoriesLoadedFn () {
  let st = this.activeStoryType
  let i = this.activePageNumber - 1
  if (this.stories[st][i] && this.segregatedList[st][i]) {
    clearInterval(this.interval)
    this.toBeRendered.length = this.segregatedList[st][i].length
    this.stories[st][i].forEach((item) => { this.populateStories(st, i, item) })
  }
}

function populateStoriesFn (st, i, item) {
  item.then(story => { this.toBeRendered.splice(this.stories[st][i].indexOf(item), 1, story) })
}

function checkIfCommentsLoadedFn () {
  let ci = this.activeCommentId
  if (this.comments[ci]) {
    clearInterval(this.interval)
    this.toBeRendered.length = this.comments[ci].length
    this.comments[ci].forEach((item) => { this.populateComments(ci, item) })
  }
}

function populateCommentsFn (ci, item) {
  item.then(comment => { this.toBeRendered.splice(this.comments[ci].indexOf(item), 1, comment) })
}

const app = new Vue(appOptions)
