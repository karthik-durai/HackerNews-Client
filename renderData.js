const appOptions = {
  el: '#app',
  //  mounted: () => { this.storyList = items['tops'][0] },
  data: {
    stories: ['top', 'new', 'best', 'ask', 'show', 'jobs'],
    directions: ['prev', 'next'],
    activeStory: 'top',
    pageNumber: 1
  },
  methods: {
    setstory: function (e) {
      this.activeStory = e.target.textContent.toLowerCase()
      getItems(this.activeStory, 0)
    },
    setpagenum: function (e) {
      let text = e.target.textContent
      if (text === 'prev') {
        this.pageNumber--
        console.log(this.pageNumber)
      } else if (text === 'next') {
        this.pageNumber++
        console.log(this.pageNumber)
      }
    }
  }
}

const storiesNavOptions = {
  props: ['story'],
  template: `<ul><li><a href="#" v-on:click="$emit('setstory', $event)">{{ story | uppercase }}</a></li></ul>`,
  filters: {
    'uppercase': function (text) {
      return text.toUpperCase()
    }
  }
}

const pageNavOptions = {
  props: ['direction'],
  template: `<button v-on:click="$emit('setpagenum', $event)">{{ direction }}</button>`
}

const itemsContainerOptions = {
  props: ['item'],
  template: `<ul><li>{{ item.title }}</li></ul>`
}

Vue.component('stories-nav', storiesNavOptions)
Vue.component('page-nav', pageNavOptions)
//  Vue.component('items-container', itemsContainerOptions)

const app = new Vue(appOptions)
