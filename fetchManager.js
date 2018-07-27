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
  items[story][index] = []
  for (let id of list) {
    items[story][index].push(fetch(`${url}item/${id}.json`).then(toJSON))
  }
}

function handleMessages (e) {
  if (e.data[0] === 'list') {
    segregatedList[e.data[1]][e.data[2]] = e.data[3]
  } else if (e.data[0] === 'update') {
    fetchUpdatedItems(e.data)
  }
}

function getItems (story, index, list = segregatedList) {
  workerUpdateList.postMessage([story, index, list[story][index]])
  let stories = items[story][index]
  if (stories) {
    return stories
  } else {
    fetchItem(story, index, list[story][index])
  }
}

function fetchUpdatedItems ([_, story, index, difference]) {
  let indexList = Object.keys(difference)
  let idList = Object.values(difference)
  console.log(idList)
  if (indexList.length > 0) {
    for (let i in idList) {
      items[story][index].splice(indexList[i], 1, fetch(`{url}item/${idList[i]}.json`).then(toJSON))
    }
  }
}

function getComments (story, index, storyId) {
  if (comments[storyId]) { return }
  comments[storyId] = []
  items[story][index].forEach(i => i.then(data => {
    if (storyId === data.id) {
      data.kids.forEach(i => comments[storyId].push(fetch(`${url}item/${i}.json`).then(toJSON)))
    }
  }))
}
