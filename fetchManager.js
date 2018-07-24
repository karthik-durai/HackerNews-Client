const urls = {
  top: 'topstories.json',
  new: 'newstories.json',
  best: 'beststories.json',
  ask: 'askstories.json',
  show: 'showstories.json',
  jobs: 'jobstories.json'
}

const url = 'https://hacker-news.firebaseio.com/v0/'

let listObj = {}

for (let i in urls) {
  //  fetch(`${url}${urls[i]}`).then(toJSON).then(console.log)
  listObj[i] = fetch(`${url}${urls[i]}`).then(toJSON)
}

function toJSON (data) {
  return data.json()
}

//  fetch(`${url}${urls['top']}`).then(toJSON).then(console.log)

listObj['top'].then(console.log)
