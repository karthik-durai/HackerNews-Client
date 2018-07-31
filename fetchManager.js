const workerSegregateList = new Worker('workerSegregateList.js')
const workerUpdateList = new Worker('workerUpdateList.js')

const urls = {
  top: 'topstories.json',
  new: 'newstories.json',
  best: 'beststories.json',
  ask: 'askstories.json',
  show: 'showstories.json',
  jobs: 'jobstories.json'
}

const url = 'https://hacker-news.firebaseio.com/v0/'

workerUpdateList.postMessage(['url', url, urls])

workerSegregateList.onmessage = handleMessages
workerUpdateList.onmessage = handleMessages

//  let items = {}
//  let segregatedList = {}


for (let story in urls) {
  app.segregatedList[story] = []
  app.stories[story] = []
}

fetch(`${url}${urls['top']}`).then(toJSON).then(getTopFifteen).catch(console.log)

for (let storyType in urls) {
  fetch(`${url}${urls[storyType]}`).then(toJSON).then(list => { workerSegregateList.postMessage([storyType, list]) }).catch(console.log)
}

function toJSON (data) {
  return data.json()
}

function getTopFifteen (list) {
  fetchEachItem('top', 0, list.slice(0, 15))
}

function fetchEachItem (storyType, index, list) {
  app.stories[storyType][index] = []
  for (let id of list) {
    app.stories[storyType][index].push(fetch(`${url}item/${id}.json`).then(toJSON))
  }
}

function handleMessages (e) {
  if (e.data[0] === 'list') {
    app.segregatedList[e.data[1]][e.data[2]] = e.data[3]
  } else if (e.data[0] === 'updatedList') {
    console.log(e.data)
  }
}

function fetchItems (storyType, index, list = app.segregatedList) {
  workerUpdateList.postMessage(['updateList', storyType, index, list[storyType][index]])
  let stories = app.stories[storyType][index]
  if (stories) {
    return stories
  } else {
    fetchEachItem(storyType, index, list[storyType][index])
  }
}
