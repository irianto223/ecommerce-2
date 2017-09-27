var API_HOST = 'http://35.197.153.212/'
var app = new Vue({
  el: '#app',
  data: {
    items: [],
    cart: [],
    totalPriceCart: 0,
    token: '',
    registerState: {
      name: '',
      email: '',
      username: '',
      password: ''
    },
    loginState: {
      username: '',
      password: ''
    },
    loginMsg: '',
    itemsid: []
  },
  methods: {
    getAllItems () {
      axios({
        method: 'get',
        url: `${API_HOST}/items`
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

    showLogin () {
      $('#register-modal').modal('hide')
      $('#login-modal').modal()
    },

    showRegister () {
      $('#login-modal').modal('hide')
      $('#register-modal').modal()
    },

    addToCart (item) {
      this.cart.push(item)
      this.itemsid.push(item._id)
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
      this.itemsid = []
    },

    checkOut () {
      console.log('ini method checkOut');
      if (this.token == '') {
        $('#cart-modal').modal('hide')
        this.showLogin()
      }
      else {
        console.log('checkOut else');
        let self = this
        axios({
          method: 'post',
          url: `${API_HOST}/transactions`,
          data: {
            items: self.itemsid
          },
          headers: {
            token: self.token
          }
        })
        .then(response => {
          console.log(response);
          self.updateStock()
          this.clearCart()
        })
        .catch(err => console.log(err))

        $('#cart-modal').modal('hide')
      }
    },

    updateStock () {
      console.log('ini method updateStock');
      this.cart.forEach(itemCart => {
        this.items.forEach(item => {
          if (itemCart._id == item._id) {
            console.log(item);
            item.stock--
            let self = this
            axios({
              method: 'put',
              url: `${API_HOST}/items/${item._id}/stock`,
              data: {
                stock: item.stock
              },
              headers: {
                token: this.token
              }
            })
            .then(response => {
              console.log(response.data.msg);
            })
            .catch(err => console.log(err))
          }
        })
      })
    },

    logout () {
      this.cart = []
      this.loginMsg = ''
      this.token = ''
      localStorage.removeItem('ecommercetoken')
    },

    login () {
      this.loginMsg = ''
      console.log('ini method login');
      let self = this
      axios({
        method: 'post',
        url: `${API_HOST}/signin`,
        data: {
          username: self.loginState.username,
          password: self.loginState.password
        }
      })
      .then(response => {
        console.log(response);
        self.loginState = {
          username: '',
          password: ''
        }
        self.loginMsg = response.data.msg

        if (response.data.msg == 'login success') {
          localStorage.setItem('ecommercetoken', response.data.data)
          self.token = localStorage.getItem('ecommercetoken')
          $('#login-modal').modal('hide')
          $('#login-form')[0].reset()
          if (self.cart.length != 0) {
            self.showCart()
          }
        }
      })
      .catch(err => console.log(err))
    },

    register () {
      console.log('ini method register');
      let self = this
      axios({
        method: 'post',
        url: `${API_HOST}/signup`,
        data: {
          name: self.registerState.name,
          email: self.registerState.email,
          username: self.registerState.username,
          password: self.registerState.password
        }
      })
      .then(response => {
        console.log(response);
        $('#register-modal').modal('hide')
        $('#register-form')[0].reset()

        self.registerState = {
          name: '',
          email: '',
          username: '',
          password: ''
        }
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    this.getAllItems()
  }
})
