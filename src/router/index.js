import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/HomePage.vue";
import Todo from "../pages/todos/_id.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/todos/:id",
    name: "Todo",
    component: Todo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
