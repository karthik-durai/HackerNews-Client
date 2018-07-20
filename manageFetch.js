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
  itemList.push({ [i]: fetch(`${url}${urls[i]}`).then(toJSON).catch(handleErr) })
}

function toJSON (data) {
  return data.json()
}

function handleErr (err) {
  console.error(err)
}

function pushEach (list) {
  // stories.items.push(list)
}
