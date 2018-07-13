const urls = {
  top: 'topstories.json',
  new: 'newstories.json',
  best: 'beststories.json',
  ask: 'askstories.json',
  show: 'showstories.json',
  jobs: 'jobstories.json'
}

const itemList = {}
let stories = []

const url = 'https://hacker-news.firebaseio.com/v0/'

for (let i in urls) {
  itemList[i] = fetch(`${url}${urls[i]}`)
}

function toJSON (data) {
  return data.json()
}

function handleErr (err) {
  console.error(err)
}

function fetchEach (itemList) {
  stories = itemList.map((i) => {
    return fetch(`${url}item/${i}.json`)
  })
}

itemList.top.then(toJSON).then(fetchEach).catch(handleErr)
