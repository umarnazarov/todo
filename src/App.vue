<template>
  <app-nav></app-nav>
  <router-view />
</template>

<script lang="ts">
// packages
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import Cookies from "js-cookie";

//stores
import { useUserStore } from "./store/models/model.user";
import { useTodosStore } from "./store/models/model.todos";

// components
import AppNav from "@/components/Navbar/AppNavbar.vue";

export default defineComponent({
  components: {
    AppNav,
  },
  setup() {
    const userStore = useUserStore();
    const todosStore = useTodosStore();

    const { me } = storeToRefs(userStore);
    const { list } = storeToRefs(todosStore);

    return {
      me,
      list,
      userStore,
      todosStore,
    };
  },
  mounted() {
    const isAuth = Boolean(Cookies.get("isAuth"));
    if (!this.me?.name && isAuth) {
      this.userStore.getAllUsers();
      this.userStore.getUser({
        method: "GET",
        path: "/me",
      });
    }
    if (!this.list.length && isAuth) this.todosStore.getTodos();
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
  font-weight: 100 !important;
}
</style>
