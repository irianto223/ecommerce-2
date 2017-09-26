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
    loginMsg: ''
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
      if (this.token == '') {
        $('#cart-modal').modal('hide')
        this.showLogin()
      }
      else {
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

    logout () {
      this.cart = []
      this.token = ''
      localStorage.removeItem('ecommercetoken')
    },

    login () {
      this.loginMsg = ''
      console.log('ini method login');
      let self = this
      axios({
        method: 'post',
        url: 'http://localhost:3000/signin',
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
        url: 'http://localhost:3000/signup',
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
