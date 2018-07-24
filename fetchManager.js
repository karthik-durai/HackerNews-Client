const workerSegList = new SharedWorker('workerSegregateList.js')

const urls = {
  top: 'topstories.json',
  new: 'newstories.json',
  best: 'beststories.json',
  ask: 'askstories.json',
  show: 'showstories.json',
  jobs: 'jobstories.json'
}

const url = 'https://hacker-news.firebaseio.com/v0/'

let fetchedItems = []
let segregatedList = []
let items = []

for (let i in urls) {
  //  fetchedItems.push({[i]: fetch(`${url}${urls[i]}`).then(toJSON)})
  fetch(`${url}${urls[i]}`).then(toJSON).then(data => { workerSegList.port.postMessage([i, data]) })
}

//  Promise.all(fetchedItems).then(sendToWorker)
//  Promise.all(fetchedItems).then(data => console.log(data[0]['top']))

//  fetchedItems['top'].then(segregrateArray)

function toJSON (data) {
  return data.json()
}

function segregrateArray (list) {
  segregatedList = list.slice(0, 15)
  fetchItem(segregatedList)
}

function sendToWorker (itemList) {
  /*  for (let i of itemList) { 
  } */
  workerSegList.port.postMessage(itemList)
}

function fetchItem (list) {
  for (let i of list) {
    console.log(i)
    //  items.push(fetch(`${url}item/${i}.json`).then(toJSON))
    fetch(`${url}item/${i}.json`).then(toJSON).then(data => { items[list.indexOf(data.id)] = data })
  }
  console.log(items)
}
