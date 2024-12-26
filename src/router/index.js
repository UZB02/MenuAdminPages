import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthLayout from '@/layouts/Auth/AuthLayout.vue'
import AppLayout from "../layouts/AppLayout.vue";
import axios from "axios";
axios.defaults.baseURL = "https://menu-cafe.onrender.com";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/RegisterView.vue"),
      meta: {
        layout: AuthLayout,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        layout: AuthLayout,
      },
    },
    {
      path: "/admins",
      name: "Admins",
      component: () => import("../views/AdminsView.vue"),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: "/catalogues",
      name: "Catalogues",
      component: () => import("../views/CataloguesView.vue"),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: "/menu",
      name: "Menu",
      component: () => import("../views/MenuView.vue"),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: "/menu/add_menu",
      name: "Add menu",
      component: () => import("../views/AddMenuView.vue"),
      meta: {
        layout: AppLayout,
      },
    },
    {
      path: "/menu/edit/:id",
      name: "Edit menu",
      component: () => import("../views/EditMenuView.vue"),
      meta: {
        layout: AppLayout,
      },
    },
  ],
});

export default router
