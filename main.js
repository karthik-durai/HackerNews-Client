//  console.log(itemList)

const segList = {}
const items = []

let nav
let main

function render (data) {
  Vue.component('item-li', itemCompOptions)
  Vue.component('nav-items', navCompOptions)
  Vue.component('button-nav', btnCompOptions)
  Vue.component('pgno', pgNoCompOptions)
  nav = new Vue(navOptions)
  main = new Vue(mainOptions)
}

Promise.all(itemList).then(processList).catch(console.error)

function processList (data) {
  for (const i in data) {
    for (const j in data[i]) {
      data[i][j].then(data => segArr(j, data)).catch(console.error)
    }
  }
  render()
}

function segArr (j, data) {
  segList[j] = []
  segList[j].push('')
  while (data.length > 0) {
    segList[j].push(data.splice(0, 15))
  }
}

const itemCompOptions = {
  template: `<li><a v-bind:href="item.url"><p>{{ item.title }}</p></a></li>`,
  props: ['item']
}

const btnCompOptions = {
  template: `<div><button v-on:click="$emit('alter', $event)" v-bind:disabled="isdisabled">{{ nav }}</button></div>`,
  props: ['nav', 'isdisabled']
}

const navCompOptions = {
  template: `<li v-on:click="$emit('story', $event)"><a href='#'>{{ item }}</a></li>`,
  props: ['item']
}

const pgNoCompOptions = {
  template: `<span>{{ pgno }}</span>`,
  props: ['pgno']
}

const navOptions = {
  el: '#nav',
  data: {
    story: 'TOP',
    navItems: ['TOP', 'NEW', 'BEST', 'SHOW', 'ASK', 'JOBS']
  },
  methods: {
    setStory: function (e) {
      this.story = e.target.text.toLowerCase()
      main.story = this.story
    }
  },
  watch: {
    story: function () {
      console.log('story changed')
      items.length = 0
      for (const i of main.list) {
        getEach(i).then(item => {
          items.push(item)
        })
      }
    }
  }
}

const mainOptions = {
  el: '#main',
  data: {
    pgno: 1,
    story: 'TOP',
    button1: 'Prev',
    button2: 'Next',
    renderItems: items,
  },
  methods: {
    alterPgNo: function (e) {
      if (e.target.textContent === 'Prev') {
        this.pgno--
      } else if (e.target.textContent === 'Next') {
        this.pgno++
      }
    }
  },
  computed: {
    list: function () {
      try {
        return segList[this.story][this.pgno]
      } catch (e) {
        console.error(e)
      }
    },
    prevDis: function () {
      if (this.pgno <= 1) {
        return true
      } else {
        return false
      }
    },
    nextDis: function () {
      if (this.pgno >= this.renderItems.length) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    pgno: function () {
      console.log('pgno changed')
      items.length = 0
      for (const i of this.list) {
        getEach(i).then(item => {
          items.push(item)
        })
      }
    }
  }
}
