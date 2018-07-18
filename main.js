console.log(itemList)

const navOptions = {
  el: '#nav',
  data: {
    story: ''
  },
  methods: {
    setStory: function (e) {
      this.story = e.target.text
    }
  }
}

const mainOptions = {
  el: '#main',
  data: {
    count: 1
  },
  methods: {
    incCount: function () {
      this.count++
    },
    decCount: function () {
      this.count--
    },
    getItems: function () {
      //  return itemList[type][count]
      console.log('hello')
    }
  }
}

const nav = new Vue(navOptions)
const main = new Vue(mainOptions)
