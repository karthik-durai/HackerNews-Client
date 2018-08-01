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

function processUpdatedList ([_, storyType, index, oldList, toBeUpdated]) {
  let idLocation = []
  let idsFromUpdate = Object.values(toBeUpdated)
  let indexesToBeChanged = Object.keys(toBeUpdated)
  /*  for (let i in idsFromUpdate) {
    idLocation.push(locateIdLocally(idsFromUpdate[i]))
  } */
  updateMainList(storyType, index, toBeUpdated)
  //  fetchToUpdate(storyType, index, indexesToBeChanged, idLocation)
  fetchToUpdate(storyType, index, toBeUpdated)
}

function updateMainList (storyType, index, updatedList) {
  for (let i in updatedList) {
    app.segregatedList[storyType][index].splice(i, 1, updatedList[i])
  }
}

function fetchToUpdate (storyType, index, toBeUpdated) {
  for (let i in toBeUpdated) {
    app.stories[storyType][index].splice(i, 1, fetch(`${url}/item/${toBeUpdated[i]}.json`).then(toJSON))
  }
}

function getComments (storyType, index, storyId) {
  let story = getStory(storyType, index, storyId)
  story.then(fetchComments)
}

function getStory (storyType, index, storyId) {
  let story = app.segregatedList[storyType][index].indexOf(storyId)
  return app.stories[storyType][index][story]
}

function fetchComments (item) {
  app.comments[item.id] = []
  item.kids.forEach(id => {
    app.comments[item.id].push(fetch(`${url}/item/${id}.json`).then(toJSON))
  })
}

/*  function locateIdLocally (id) {
  let list = app.segregatedList
  let gotLocation = false
  for (let i in list) {
    for (let j of list[i]) {
      if (j.includes(id)) {
        gotLocation = true
        return [i, list[i].indexOf(j), j.indexOf(id), id]
      }
    }
  }
  if (!gotLocation) return ['404', id]
}

function fetchToUpdate (storyType, index, indexesToBeChanged, idLocation) {
  let tempObject = deepClone(app.stories)
  for (let i of idLocation) {
    let j = indexesToBeChanged.shift()
    if (i[0] !== '404') {
      console.log('got locally', i)
      //  app.stories[storyType][index].splice(j, 1, tempObject[i[0]][i[1]][i[2]])
      Vue.set(app.stories[storyType][index], j, tempObject[i[0]][i[1]][i[2]])
    } else {
      console.log('get from HN server', i[3])
      //  fetch(`${url}/item/${i[3]}.json`).then(toJSON).then(console.log)
      Vue.set(app.stories[storyType][index], j, fetch(`${url}/item/${i[3]}.json`).then(toJSON))
      //  Vue.set(app.stories[storyType][index], j, 'yet to be fetched')
    }
  }
}


function deepClone (theObject) {
  console.log('called')
  console.log(typeof theObject)
  if (typeof theObject !== 'object') {
    return theObject
  }
  let tempObject
  for (let key in theObject) {
    tempObject[key] = deepClone(theObject[key])
  }
  return tempObject
} */
