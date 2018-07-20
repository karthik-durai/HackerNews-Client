//  console.log(itemList)

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
  main.segList[j] = []
  while (data.length > 0) {
    main.segList[j].push(data.splice(0, 15))
  }
}

const itemCompOptions = {
  template: `<li>{{ item }}</li>`,
  props: ['item']
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
    button2: 'Next',
    segList: {}
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
        return this.segList[this.story][this.pgno]
      } catch (e) {
        console.error(e)
      }
    }
  }
}
