import ProductDetails from "../views/ProductDetails.vue";
import ProductList from "../components/ProductList.vue";
import Cart from "../views/Cart.vue";
import { createRouter, createWebHistory } from "vue-router";
import Compare from "../views/Compare.vue";
import Wishlist from "../views/Wishlist.vue";
import Login from "../views/Login.vue"
import { useProductStore } from "../../store/store";

const routes = [
  {
    path: "/",
    name: "ProductList",
    component: ProductList,
    
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { requiresAuth: true }
  },
  {
    path: "/compare",
    name: "Compare",
    component: Compare,
    meta: { requiresAuth: true }
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: Wishlist,
    meta: { requiresAuth: true }
  },
  {
    path: "/product/:id",
    name: "ProductDetails",
    component: ProductDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useProductStore()
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.checkAuth()) {
      // User is not authenticated, show login modal
      store.showLoginModal = true
      next(false) // Abort the navigation
    } else {
      next() // User is authenticated, proceed with navigation
    }
  } else {
    next() // No auth required, proceed with navigation
  }
})

export default router;
