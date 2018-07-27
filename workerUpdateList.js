onmessage = handleMessage

let url, urls

function handleMessage (e) {
  if (e.data[0] === 'url') {
    url = e.data[1]
    urls = e.data[2]
  } else {
    let [story, index, itemList] = e.data
    fetchItems(story, index, itemList)
  }
}

function toJSON (data) {
  return data.json()
}

function fetchItems (story, index, itemList) {
  fetch(`${url}${urls[story]}`).then(toJSON).then((list) => { segregateList(story, index, itemList, list) })
}

function segregateList (story, index, oldItemList, list) {
  let newItemList = list.slice(index * 15, (index * 15) + 15)
  let difference = {}
  for (let i in newItemList) {
    if (oldItemList[i] !== newItemList[i]) {
      difference[i] = newItemList[i]
    }
  }
  if (difference) {
    postMessage(['update', story, index, difference])
  }
}
