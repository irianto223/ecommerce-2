var app = new Vue({
  el: '#app',
  data: {
    items: [],
    cart: [],
    totalPriceCart: 0
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
    },

    showCart () {
      $('#cart-modal').modal()
    },

    addToCart (item) {
      this.cart.push(item)
      this.totalPriceCart += item.price
      console.log('added to cart');
      // if (this.cart.length != 0) {
      //   this.cart.forEach(itemCart => {
      //     if (itemCart._id == item._id) {
      //       console.log('sudah ada');
      //       itemCart.qty++
      //       return
      //     }
      //     else {
      //       console.log('belum ada');
      //       item.qty = 1
      //       this.cart.push(item)
      //       return
      //     }
      //   })
      // }
      // else {
      //   console.log('cart kosong');
      //   item.qty = 1
      //   this.cart.push(item)
      // }
    },

    removeItemCart (index, item) {
      console.log('ini method removeItemCart');
      this.cart.splice(index, 1)
      this.totalPriceCart -= item.price
    },

    clearCart () {
      console.log('ini method clearCart');
      this.cart = []
    },

    checkOut () {
      console.log('ini method checkOut');
      this.cart.forEach(itemCart => {
        // console.log(itemCart.name);
        this.items.forEach(item => {
          if (itemCart._id == item._id) {
            item.stock--

            axios({
              method: 'put',
              url: `http://localhost:3000/items/${item._id}/stock`,
              data: {
                stock: item.stock
              }
            })
            .then(response => {
              console.log(response.data.msg);
            })
            .catch(err => console.log(err))

          }
        })
      })
      this.clearCart()
      $('#cart-modal').modal('hide')
    }
  },
  created () {
    this.getAllItems()
  }
})
