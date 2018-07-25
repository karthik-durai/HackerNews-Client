onmessage = (e) => {
  segregrateArray(e.data)
}

let segregratedList = {}

function segregrateArray (listObj) {
  let i = Object.keys(listObj)[0]
  let list = Object.values(listObj)[0]
  segregratedList[i] = []
  while (list.length > 0) {
    segregratedList[i].push(list.splice(0, 15))
  }
  console.log(segregratedList)
}

