const urls = {
  top: 'topstories.json',
  new: 'newstories.json',
  best: 'beststories.json',
  ask: 'askstories.json',
  show: 'showstories.json',
  job: 'jobstories.json'
}

const itemList = {}

const url = 'https://hacker-news.firebaseio.com/v0/'

for (let i in urls) {
  fetch(`${url}${urls[i]}`)
    .then(toJSON)
    .then((data) => {
      itemList[i] = data.slice(0, 10)
      getItems(itemList[i])
    })
    .catch(handleErr)
}

function toJSON (data) {
  return data.json()
}

function handleErr (err) {
  console.error(err)
}

function getItems (list) {
  for (let i of list) {
    fetch(`${url}/item/${i}.json`).then((data) => { return data.json() }).then(console.log)
  }
}
