import ProductDetails from "../views/ProductDetails.vue";
import ProductList from "../components/ProductList.vue";
import Cart from "../views/Cart.vue";
import { createRouter, createWebHistory } from "vue-router";
import Compare from "../views/Compare.vue";
import Wishlist from "../views/Wishlist.vue";

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
  },
  {
    path: "/compare",
    name: "Compare",
    component: Compare,
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: Wishlist,
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

export default router;
