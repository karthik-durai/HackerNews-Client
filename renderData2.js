let items = {}

console.log(items)
let intervalId


function checkIfPopulated () {
  if (items['top'][0]) {
    clearInterval(intervalId)
    items['top'][0].forEach(i => i.then(data => app.itemList.push(data)))
  } else {
    console.log('not loaded')
  }
}

const appOptions = {
  el: '#app',
  data: {
    itemList: []
  },
  mounted: function () {
    intervalId = setInterval(checkIfPopulated, 1000)
  }
}

const app = new Vue(appOptions)
