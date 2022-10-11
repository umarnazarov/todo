<template>
  <nav class="navbar">
    <h3>Todo Logo</h3>
    <ul class="links">
      <router-link
        v-if="$store.state.user.me.name !== ''"
        class="link"
        to="/todos"
        >Todos</router-link
      >
      <router-link class="link" to="/users" v-if="$store.state.user.isAdmin"
        >Users</router-link
      >
      <button
        class="link"
        @click="handleLogout"
        v-if="$store.state.user.me.name !== ''"
      >
        Log out
      </button>
    </ul>
  </nav>
</template>
<script>
import { useStoreTyped } from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-nav",
  setup() {
    const { dispatch, state } = useStoreTyped();
    return { dispatch, state };
  },
  methods: {
    async handleLogout() {
      await this.dispatch("user/logout");
      window.location.replace("/login");
    },
  },
});
</script>
<style lang="css">
.navbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgb(74, 74, 212);
  padding: 10px 20px;
  color: #fff;
}

.links {
}

.link {
  margin-left: 15px;
  color: rgb(0, 0, 0);
  background-color: aliceblue;
  padding: 5px;
  cursor: pointer;
}
</style>
