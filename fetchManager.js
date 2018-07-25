const workerSegList = new Worker('workerSegregateList.js')

const urls = {
  tops: 'topstories.json',
  newest: 'newstories.json',
  best: 'beststories.json',
  ask: 'askstories.json',
  show: 'showstories.json',
  jobs: 'jobstories.json'
}

const url = 'https://hacker-news.firebaseio.com/v0/'

let fetchedItems = []
let segregatedList = []
let items = []

fetch(`${url}${urls['tops']}`).then(toJSON).then(segregrateArray)

for (let i in urls) {
  fetch(`${url}${urls[i]}`).then(toJSON).then(data => { workerSegList.postMessage({[i]: data}) })
}

function toJSON (data) {
  return data.json()
}

function segregrateArray (list) {
  segregatedList = list.slice(0, 15)
  fetchItem(segregatedList)
}

function fetchItem (list) {
  for (let i of list) {
    fetch(`${url}item/${i}.json`).then(toJSON).then(data => { items[list.indexOf(data.id)] = data })
  }
  console.log(items)
}
