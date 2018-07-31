onmessage = handleMessage

let segregatedList = {}

function handleMessage (e) {
  segregateArray(e.data)
}

function segregateArray (listObj) {
  let storyType = listObj[0]
  let list = listObj[1]
  segregatedList[storyType] = []
  let index = 0
  while (list.length > 0) {
    segregatedList[storyType].push(list.splice(0, 15))
    postMessage(['list', storyType, index, segregatedList[storyType][index]])
    index++
  }
}
