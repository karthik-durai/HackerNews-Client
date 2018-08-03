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
    processUpdatedList(e.data)
  }
}

function fetchItems (storyType, index, list = app.segregatedList) {
  workerUpdateList.postMessage(['updateList', storyType, index, list[storyType][index]])
  let stories = app.stories[storyType][index]
  if (!stories) {
    fetchEachItem(storyType, index, list[storyType][index])
  }
}

function processUpdatedList ([_, storyType, index, oldList, newList]) {
  updateMainList(storyType, index, newList)
  fetchToUpdate(storyType, index, newList)
}

function updateMainList (storyType, index, newList) {
  for (let i in newList) {
    app.segregatedList[storyType][index].splice(i, 1, newList[i])
  }
}

function fetchToUpdate (storyType, index, newList) {
  for (let i in newList) {
    app.stories[storyType][index].splice(i, 1, fetch(`${url}/item/${newList[i]}.json`).then(toJSON))
  }
}

function getComments (storyType, index, storyId) {
  let story = getStory(storyType, index, storyId)
  story.then(fetchComments)
}

function getStory (storyType, index, storyId) {
  let storyIndex = app.segregatedList[storyType][index].indexOf(storyId)
  return app.stories[storyType][index][storyIndex]
}

function fetchComments (item) {
  accumulateKids(item)
  app.comments[item.id] = []
  item.kids.forEach(id => {
    app.comments[item.id].push(fetch(`${url}/item/${id}.json`).then(toJSON))
  })
}

function accumulateKids (item) {
  app.kidsList[item.id] = item.kids
}

function getReplies (commentId, parentId) {
  let indexOfComment = app.kidsList[parentId].indexOf(commentId)
  app.comments[parentId][indexOfComment].then(fetchComments)
}
