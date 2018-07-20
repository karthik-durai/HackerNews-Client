const urls = {
  top: 'topstories.json',
  new: 'newstories.json',
  best: 'beststories.json',
  ask: 'askstories.json',
  show: 'showstories.json',
  jobs: 'jobstories.json'
}

const itemList = []

const url = 'https://hacker-news.firebaseio.com/v0/'

for (let i in urls) {
  itemList.push({ [i]: fetch(`${url}${urls[i]}`).then(toJSON).catch(console.error) })
}

function toJSON (data) {
  return data.json()
}

function getEach (id) {
  return fetch(`${url}item/${id}.json`).then(toJSON)
}
