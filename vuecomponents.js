const storyTypeNavigation = {
  props: ['storytype'],
  template: `<li v-on:click="$emit('story', $event)">{{ storytype }}</li>`
}

Vue.component('storytypes', storyTypeNavigation)

const pageNavigation = {
  props: ['direction', 'isdisabled'],
  template: `<button v-on:click="$emit('changepage', $event)" v-bind:disabled="isdisabled">{{ direction }}</button>`
}

Vue.component('pagenav', pageNavigation)

const pageCountOptions = {
  props: ['pagenumber', 'pagelimit'],
  template: `<span><input v-bind:value="pagenumber"><span> / {{ pagelimit }}</span></span>`
}

Vue.component('pagecount', pageCountOptions)

const storiesComponentOptions = {
  props: ['story'],
  template: `<li><a v-bind:title="story.url" v-bind:href="story.url" target="_blank">{{ story.title }}</a>
                <p><span>score: {{ story.score }}</span>
                <span v-on:click="$emit('rencomment', story)">comments: {{ story.descendants ? story.descendants : 0 }}</span>
                <span>posted by: {{ story.by }}</span></p></li>`
}

Vue.component('stories', storiesComponentOptions)

const commentsComponentOptions = {
  props: ['comment'],
  template: `<li><p v-html="comment.text" class="eachcomment"></p>
                 <p class="commentaccessories"><span v-on:click="$emit('renreplies', comment)">replies: {{ comment.kids ? comment.kids.length : 0 }}
                    <span>posted by: {{ comment.by }}</span></p></li>`
}

Vue.component('comments', commentsComponentOptions)
