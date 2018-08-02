const storiesComponentOptions = {
  props: ['story'],
  template: `<li><a href="story.url">{{ story.title }}</a>
                <span> ({{ story.url ? story.url : "no url" }})</span>
                <p><span>score: {{ story.score }}</span>
                <span>comment: {{ story.descendants }}</span>
                <span>posted by: {{ story.by }}</span></p></li>`
}

Vue.component('stories', storiesComponentOptions)

const commentsComponentOptions = {
  props: ['comment'],
  template: `<li><p>{{ comment.text }}</p>
                 <p><span>replies: {{ comment.kids.length ? comment.kids.length : 0 }}</span>
                    <span>posted by: {{ comment.by }}</span></p><li>`
}

Vue.component('comments', commentsComponentOptions)
