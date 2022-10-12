<template>
  <nav class="navbar">
    <h3>Todo Logo</h3>
    <ul class="links">
      <router-link v-if="user !== null" class="link" to="/todos"
        >Todos</router-link
      >
      <router-link class="link" to="/users" v-if="user?.role === 'admin'"
        >Users</router-link
      >
      <button class="link" @click="handleLogout" v-if="user?.name">
        Log out
      </button>
    </ul>
  </nav>
</template>
<script lang="ts">
import { useUserStore } from "@/store/models/model.user";
import { storeToRefs } from "pinia";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "app-nav",
  setup() {
    const store = useUserStore();
    const user = computed(() => store.me);
    const { logout } = store;
    return { logout, user };
  },
  methods: {
    async handleLogout() {
      await this.logout();
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

.link {
  margin-left: 15px;
  color: rgb(0, 0, 0);
  background-color: aliceblue;
  padding: 5px;
  cursor: pointer;
}
</style>
