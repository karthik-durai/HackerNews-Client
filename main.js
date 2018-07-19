console.log(itemList)

itemList['top'].then(render)

function render (data) {
  Vue.component('nav-items', navItemOptions)
  Vue.component('button-nav', buttonNavOptions)
  Vue.component('pgno', pgNoOptions)
  const nav = new Vue(navOptions)
  const main = new Vue(mainOptions)
}

const buttonNavOptions = {
  template: `<div><button v-on:click="$emit('alter', $event)">{{ nav }}</button></div>`,
  props: ['nav']
}

const navItemOptions = {
  template: `<li v-on:click="$emit('story', $event)"><a href='#'>{{ item }}</a></li>`,
  props: ['item']
}

const pgNoOptions = {
  template: `<span>{{ pgno }}</span>`,
  props: ['pgno']
}

const navOptions = {
  el: '#nav',
  data: {
    story: 'top',
    navItems: ['TOP', 'NEW', 'BEST', 'SHOW', 'ASK', 'JOBS']
  }
}

const mainOptions = {
  el: '#main',
  data: {
    pgno: 1,
    story: 'top',
    button1: 'Prev',
    button2: 'Next'
  }
}

