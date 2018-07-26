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

let fetchedItems = []
let segregatedList = {}
let items = {}
let intervalId

for (let story in urls) {
  segregatedList[story] = []
  items[story] = []
}

fetch(`${url}${urls['top']}`).then(toJSON).then(segregateArray)

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
  let tempArray = []
  for (let id of list) {
    fetch(`${url}item/${id}.json`).then(toJSON).then(data => { tempArray[list.indexOf(data.id)] = data })
  }
  items[story][index] = tempArray
  console.log(items[story][index])
  return items[story][index]
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
  //  clearInterval(intervalId)
  workerUpdateList.postMessage([story, index, list[story][index]])
  let stories = items[story][index]
  if (stories) {
    console.log(stories)
    return stories
  } else {
    return fetchItem(story, index, list[story][index])
  }
}

function fetchUpdatedItems ([message, story, index, difference]) {
  let indexList = Object.keys(difference)
  let idList = Object.values(difference)
  if (indexList.length > 0) {
    for (let i in idList) {
      segregatedList[story][index][indexList[i]] = idList[i]
      fetch(`${url}/item/${idList[i]}.json`).then(toJSON).then((item) => { items[story][index][indexList[i]] = item })
    }
  } else {
    console.log('no updates')
  }
  //  clearInterval(intervalId)
  //  intervalId = setInterval(periodicCheck, 10000, story, index)
}

function periodicCheck (story, index, list = segregatedList) {
  workerUpdateList.postMessage([story, index, list[story][index]])
}
