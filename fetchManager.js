const workerSegregateList = new Worker('workerSegregateList.js')

const urls = {
  tops: 'topstories.json',
  newest: 'newstories.json',
  best: 'beststories.json',
  ask: 'askstories.json',
  show: 'showstories.json',
  jobs: 'jobstories.json'
}

const url = 'https://hacker-news.firebaseio.com/v0/'

workerSegregateList.postMessage(['url', url])

workerSegregateList.onmessage = handleMessages

let fetchedItems = []
let segregatedList = {}
let items = {}

for (let story in urls) {
  segregatedList[story] = []
  items[story] = []
}

fetch(`${url}${urls['tops']}`).then(toJSON).then(segregateArray)

for (let story in urls) {
  fetch(`${url}${urls[story]}`).then(toJSON).then(data => { workerSegregateList.postMessage([story, data]) })
}

function toJSON (data) {
  return data.json()
}

function segregateArray (list) {
  fetchItem('top', 0, list.slice(0, 15))
}

function fetchItem (story, index, list) {
  for (let id of list) {
    fetch(`${url}item/${id}.json`).then(toJSON).then(data => { items[story][list.indexOf(data.id)] = data })
  }
  console.log(items)
}

function handleMessages (e) {
  if (e.data[0] === 'list') {
    segregatedList[e.data[1]][e.data[2]] = e.data[3]
  }
}

function getItems (story, index) {

}
