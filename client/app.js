var app = new Vue({
  el: '#app',
  data: {
    items: []
  },
  methods: {
    getAllItems () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/items'
      })
      .then(response => {
        console.log(response);
        this.items = response.data.data
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  created () {
    this.getAllItems()
  }
})
