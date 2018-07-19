//  console.log(itemList)

const navItemOptions = {
  template: `<li v-on:click="$emit('story', $event)"><a href='#'>{{ item }}</a></li>`,
  props: ['item']
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
    disable: true
  },
  methods: {
    alterPgno: function (e) {
      if (e.target.textContent === 'Prev') {
        this.pgno--
      } else {
        this.pgno++
      }
    }
  }
}

Vue.component('nav-items', navItemOptions)
const nav = new Vue(navOptions)
const main = new Vue(mainOptions)
