onmessage = handleMessage

let segregatedList = {}

function handleMessage (e) {
  segregateArray(e.data)
}

function segregateArray (listObj) {
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
