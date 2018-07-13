let options = {
  el: '#stories',
  data: {
    items: [],
    align: 'center',
    add: true,
    fieldStyle: {
      backgroundColor: '#375e97',
      marginRight: '2px',
      color: '#ffbb00',
      padding: '5px'
    },
    itemStyle: {
      width: '600px',
      margin: '0 auto',
      borderBottom: '1px solid black',
      padding: '5px'
    },
    linkStyle: {
      textDecoration: 'none',
      backgroundColor: '#ffbb00',
      color: '#375e97'
    }
  }
}

const stories = new Vue(options)
