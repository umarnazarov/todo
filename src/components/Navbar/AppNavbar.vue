<template>
  <nav
    class="w-full flex align-items-center justify-content-between bg-blue-500 py-2 px-3"
  >
    <h3 class="text-white">Todo Logo</h3>
    <ul class="flex align-items-center">
      <router-link
        v-if="user !== null"
        class="text-white ml-3 no-underline"
        to="/todos"
        >Todos</router-link
      >
      <router-link
        class="text-white ml-3 no-underline"
        to="/users"
        v-if="user?.role === 'admin'"
        >Users</router-link
      >
      <prime-btn
        class="p-2 font-normal p-button-sm text-blue-600 ml-3 no-underline border-0 bg-w p-button-raised p-button-text bg-white"
        @click="handleLogout"
        label="Sign Out"
        v-if="user?.name"
      ></prime-btn>
    </ul>
  </nav>
</template>
<script lang="ts">
// packages
import { computed, defineComponent } from "vue";
import Button from "primevue/button";
// stores
import { useUserStore } from "@/store/models/model.user";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "app-nav",
  components: {
    "prime-btn": Button,
  },
  setup() {
    const store = useUserStore();
    const { me: user } = storeToRefs(store);
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
.link {
  margin-left: 15px;
  color: rgb(0, 0, 0);
  background-color: aliceblue;
  padding: 5px;
  cursor: pointer;
}
</style>
