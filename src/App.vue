<template>
  <app-nav></app-nav>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import AppNav from "@/components/Navbar/AppNavbar.vue";
import { useStoreTyped } from "./store";
import Cookies from "js-cookie";
export default defineComponent({
  components: { AppNav },
  setup() {
    const { commit, state, dispatch } = useStoreTyped();
    return { store: state, commit, dispatch };
  },
  mounted() {
    const isAuth = Boolean(Cookies.get("isAuth"));
    if (!this.store.user.me.name && isAuth) {
      this.dispatch("user/getUser", {
        method: "GET",
        path: "/me",
      });
    }
    if (!this.store.todos.length && isAuth) {
      this.dispatch("todos/getTodos", {
        path: "/todos",
        method: "GET",
      });
    }
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
</style>
