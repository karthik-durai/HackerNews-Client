const urls = {
  top: 'topstories.json',
  new: 'newstories.json',
  best: 'beststories.json',
  ask: 'askstories.json',
  show: 'showstories.json',
  jobs: 'jobstories.json'
}

const url = 'https://hacker-news.firebaseio.com/v0/'

let fetchedItems = {}

for (let i in urls) {
  fetchedItems[i] = fetch(`${url}${urls[i]}`).then(toJSON)
}

function toJSON (data) {
  return data.json()
}

//  fetch(`${url}${urls['top']}`).then(toJSON).then(console.log)

fetchedItems['top'].then(console.log)
