const urls = {
  top: 'topstories.json',
  new: 'newstories.json',
  best: 'beststories.json',
  ask: 'askstories.json',
  show: 'showstories.json',
  jobs: 'jobstories.json'
}

const itemList = {}

const url = 'https://hacker-news.firebaseio.com/v0/'

for (let i in urls) {
  itemList[i] = fetch(`${url}${urls[i]}`)
}

function toJSON (data) {
  return data.json()
}

function handleErr (err) {
  console.error(err)
}

function pushEach (list) {
  // stories.items.push(list)
}

function getItem (data) {
  data.map(id => fetch(`${url}item/${id}.json`).then(toJSON))
}

function splitItemArr (i, data) {
  itemList[i] = []
  while (data.length > 0) {
    itemList[i].push(data.splice(0, 20))
  }
}

for (const i in itemList) {
  itemList[i].then(toJSON).then(data => { splitItemArr(i, data) }).catch(handleErr)
}

console.log(itemList)
