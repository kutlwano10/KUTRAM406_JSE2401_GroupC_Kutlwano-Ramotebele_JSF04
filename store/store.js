import { defineStore } from "pinia";


export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    singleProduct: null,
    loading: true,
    isDark: false,
    error: null,
    initialSort: "default",
    categories: [],
    cart: JSON.parse(localStorage.getItem('AuthUser'))? JSON.parse(localStorage.getItem('AuthUser')).cart : [],
    wishlist: JSON.parse(localStorage.getItem('AuthUser'))? JSON.parse(localStorage.getItem('AuthUser')).wishlist : [],
    compare: JSON.parse(localStorage.getItem('AuthUser'))? JSON.parse(localStorage.getItem('AuthUser')).compare : [],


    sortOptions: [
      { value: "default", label: "Default" },
      { value: "low", label: "Price: Low to High" },
      { value: "high", label: "Price: High to Low" },
      { value: "a-z", label: "Name: A to Z" },
      { value: "z-a", label: "Name: Z to A" },
    ],

    username: '',
    password: '',
    showLoginModal: false,
    isLoggedin: false,
    user:null,
    token:null,
  }),

  getters: {
    sortedProducts: (state) => {
      if (state.initialSort === "default") return state.products;

      return [...state.products].sort((a, b) => {
        switch (state.initialSort) {
          case "low":
            return a.price - b.price;
          case "high":
            return b.price - a.price;
          case "a-z":
            return a.title.localeCompare(b.title);
          case "z-a":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    },
    filteredProducts: (state) => {
      return (categoryId) => {
        if (!categoryId) return state.sortedProducts;
        return state.sortedProducts.filter(
          (product) => product.category === categoryId
        );
      };
    },
  },

  actions: {

    // CHANGING THE THEME
    toggleTheme () {

      this.isDark = !this.isDark
      localStorage.setItem('theme', this.isDark ? 'darkmode' : 'lightmode')

    },
    

    async login (username, password) {
      
      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'content-Type': 'application/json'
          },
          body: JSON.stringify({username, password})
        })
        console.log(response)
        console.log(username,password)
        if(!response.ok) {
          throw new Error ("Login Failed")
        }
        const data = await response.json()

        this.token = data.token
        console.log(this.token)
        this.isLoggedin = true
        this.user = {username}
        this.saveAuthToLocalStorage()
        // localStorage.setItem('user', JSON.stringify(this.user))
        // localStorage.setItem('token', this.token)
        
        return true
        
      } catch (error) {
        console.error('Login Error:', error)
        return false
        
      }
    },

    /**
     * Function that makes sure the user stay logged in when you refresh the page
     */

    initializeAuth() {
      /**The user info that is stored on LocalStorage as an Object */
      const storedAuthUser = JSON.parse(localStorage.getItem('AuthUser'))

      if (storedAuthUser &&storedAuthUser.token) {
        this.user = storedAuthUser.user
        this.token = storedAuthUser.token
        this.isLoggedin = true
      }

    },

    logout() {
      this.isLoggedin = false
      this.user = null
      this.token = null
 
      let authuser = JSON.parse(localStorage.getItem('AuthUser'));

      authuser.token = false;
      localStorage.setItem('AuthUser',JSON.stringify(authuser));
      
    },

    checkAuth() {
      return this.isLoggedin && this.token !== null

    },



    /** This function sets all the carts in local Storage*/
    saveAuthToLocalStorage() {
      localStorage.setItem('AuthUser', JSON.stringify({user: this.user, token: this.token, cart: this.cart, wishlist: this.wishlist ,compare: this.compare}))
    },

    addToCompare(product) {
      
      this.compare.push(product);
      console.log('addtwl')
      this.saveAuthToLocalStorage();
    },

    removeCompareProduct (productId) {
      console.log('compare removed')
      this.compare = this.comapre.filter(item=> item.id !== productId)
      this.saveAuthToLocalStorage()

    },

    addToWishlist(product) {
      /**Pushing the Product into the wishlist and saving to local Storage */
      this.wishlist.push(product);
      console.log('addtwl')
      this.saveAuthToLocalStorage();
    },
    /**Removes The Product from Wishlist and saves the update to localStorage */
    removeWishlistProduct (productId) {
      console.log('Wishlist removed')
      this.wishlist = this.wishlist.filter(item=> item.id !== productId)
      this.saveAuthToLocalStorage()

    },

    addToCart(product) {
      /**Pushing the Product into the cart and saving to local Storage */
      this.cart.push(product);
      // localStorage.setItem('AuthUser',JSON.stringify(this.cart));
      this.saveAuthToLocalStorage();
    },

    removeCartProduct (productId) {
      this.cart = this.cart.filter(item=> item.id !== productId)
      this.saveAuthToLocalStorage()

    }, 
    clearCart() {
      this.cart = [];
      this.saveAuthToLocalStorage()
      
    },

    setSort(sortValue) {
      this.initialSort = sortValue;
    },

    async fetchCategories() {
      this.loading = true;
      this.error = null;

      try {
        const res = await fetch(`https://fakestoreapi.com/products/categories`);
        if (!res.ok) {
          throw new Error(
            "Data fetching failed, please check your network connection"
          );
        }
        const data = await res.json();
        this.categories = data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchSingleProduct(id) {
      this.loading = true;
      this.error = null;

      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          throw new Error(
            "Data fetching failed, please check your network connection"
          );
        }
        const data = await res.json();
        this.singleProduct = data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchProducts() {
      this.loading = true;
      this.error = null;

      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error(
            "Data fetching failed, please check your network connection"
          );
        }
        const data = await res.json();
        this.products = data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
