//  console.log(itemList)

const segList = {}

let nav
let main

function render (data) {
  Vue.component('nav-items', navCompOptions)
  Vue.component('button-nav', btnCompOptions)
  Vue.component('pgno', pgNoCompOptions)
  nav = new Vue(navOptions)
  main = new Vue(mainOptions)
}

//  Promise.race(itemList).then(render)
Promise.all(itemList).then(processList)

function processList (data) {
  for (const i in data) {
    for (const j in data[i]) {
      data[i][j].then(data => segArr(j, data))
    }
  }
}

function segArr (j, data) {
  segList[j] = []
  while (data.length > 0) {
    segList[j].push(data.splice(0, 15))
  }
}

const btnCompOptions = {
  template: `<div><button v-on:click="$emit('alter', $event)">{{ nav }}</button></div>`,
  props: ['nav']
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
    story: 'top',
    navItems: ['TOP', 'NEW', 'BEST', 'SHOW', 'ASK', 'JOBS']
  },
  methods: {
    setStory: function (e) {
      this.story = e.target.text.toLowerCase()
      main.story = this.story
    }
  }
}

const mainOptions = {
  el: '#main',
  data: {
    pgno: 1,
    story: 'top',
    button1: 'Prev',
    button2: 'Next'
  },
  methods: {
    alterPgNo: function (e) {
      if (e.target.textContent === 'Prev') {
        this.pgno--
      } else if (e.target.textContent === 'Next') {
        this.pgno++
      }
    }
  }
}
