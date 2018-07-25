const workerSegregateList = new Worker('workerSegregateList.js')
const workerUpdateList = new Worker('workerUpdateList.js')

const urls = {
  tops: 'topstories.json',
  newest: 'newstories.json',
  best: 'beststories.json',
  ask: 'askstories.json',
  show: 'showstories.json',
  jobs: 'jobstories.json'
}

const url = 'https://hacker-news.firebaseio.com/v0/'

workerUpdateList.postMessage(['url', url, urls])

workerSegregateList.onmessage = handleMessages
workerUpdateList.onmessage = handleMessages

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
  fetchItem('tops', 0, list.slice(0, 15))
}

function fetchItem (story, index, list) {
  let tempArray = []
  for (let id of list) {
    fetch(`${url}item/${id}.json`).then(toJSON).then(data => { tempArray[list.indexOf(data.id)] = data })
  }
  items[story][index] = tempArray
  console.log(items)
}

function handleMessages (e) {
  if (e.data[0] === 'list') {
    segregatedList[e.data[1]][e.data[2]] = e.data[3]
  } else if (e.data[0] === 'update') {
    console.log(e.data[3])
    fetchUpdatedItems(e.data)
  } else if (e.data[0] === 'noChanges') {
    console.log('no changes')
  }
}

function getItems (story, index, list = segregatedList) {
  workerUpdateList.postMessage([story, index, list[story][index]])
  let stories = items[story][index]
  if (stories) {
    console.log('from memory')
    return stories
  } else {
    console.log('from network')
    fetchItem(story, index, list[story][index])
  }
}

function fetchUpdatedItems ([message, story, index, difference]) {
  if (Object.keys(difference).length > 0) {
    for (let i of Object.keys(difference)) {
       
    }
  } else {
    console.log('no updates')
  }
}
