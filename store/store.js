import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    singleProduct: null,
    loading: true,
    error: null,
    initialSort: "default",
    categories: [],
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    sortOptions: [
      { value: "default", label: "Default" },
      { value: "low", label: "Price: Low to High" },
      { value: "high", label: "Price: High to Low" },
      { value: "a-z", label: "Name: A to Z" },
      { value: "z-a", label: "Name: Z to A" },
    ],

    username: '',
    userPassword: '',
    showLoginModal: false,
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

    login () {
      console.log('logged in')
    },

    /** This function sets all the carts in local Storage*/
    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    addToCart(product) {
      /**Pushing the Product into the cart and saving to local Storage */
      this.cart.push(product);
      this.saveCartToLocalStorage();
    },

    removeCartProduct (productId) {
      this.cart = this.cart.filter(item=> item.id !== productId)
      this.saveCartToLocalStorage()

    }, 
    clearCart() {
      this.cart = [];
      this.saveCartToLocalStorage();
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
