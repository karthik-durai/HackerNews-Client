//  console.log(itemList)

const navItemOptions = {
  template: `<li v-on:click="$emit('disp', $event)"><a href='#'>{{ item }}</a></li>`,
  props: ['item']
}

const navOptions = {
  el: '#nav',
  data: {
    story: '',
    navItems: ['TOP', 'NEW', 'BEST', 'SHOW', 'ASK', 'JOBS']
  },
  methods: {
    display: function (e) {
      console.log(e.target.text)
    }
  }
}

const mainOptions = {
  el: '#main',
  data: {
    count: 1,
    story: 'top'
  },
}

Vue.component('nav-items', navItemOptions)
const nav = new Vue(navOptions)
