const itemsUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json'
const getStory = 'https://hacker-news.firebaseio.com/v0/item/'

const body = document.body

fetch(itemsUrl).then((data) => { return data.json() }).then(getItem)

function getItem (data) {
  for (let i = 0; i <= 10; i++) {
    fetch(`${getStory}${data[i]}.json`).then(data => { return data.json() }).then(obj => console.log(obj))
  }
}
