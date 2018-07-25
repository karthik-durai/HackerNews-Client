onmessage = handleMessage

let url
let segregatedList = {}

function handleMessage (e) {
  if (e.data[0] === 'url') {
    url = e.data[1]
  } else {
    segregateArray(e.data)
  }
}

function segregateArray (listObj) {
  let tmpArr
  let story = listObj[0]
  let list = listObj[1]
  segregatedList[story] = []
  let index = 0
  while (list.length > 0) {
    segregatedList[story].push(list.splice(0, 15))
    postMessage(['list', story, index, segregatedList[story][index]])
    index++
  }
}
