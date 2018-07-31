onmessage = handleMessage

let url, urls

function handleMessage (e) {
  if (e.data[0] === 'url') {
    url = e.data[1]
    urls = e.data[2]
  } else if (e.data[0] === 'updateList') {
    let [_, storyType, index, oldList] = e.data
    fetchList(storyType, index, oldList)
  }
}

function toJSON (data) {
  return data.json()
}

function fetchList (storyType, index, oldList) {
  fetch(`${url}${urls[storyType]}`).then(toJSON).then((fetchedList) => { segregateList(storyType, index, oldList, fetchedList) }).catch(console.log)
}

function segregateList (storyType, index, oldList, fetchedList) {
  let newList = fetchedList.slice(index * 15, (index * 15) + 15)
  let difference = {}
  for (let i in newList) {
    if (oldList[i] !== newList[i]) {
      difference[i] = newList[i]
    }
  }
  if (Object.keys(difference) > 0) {
    postMessage(['updatedList', storyType, index, difference])
  } else {
    console.log('no updates')
  }
}
