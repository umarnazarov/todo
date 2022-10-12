<template>
  <div class="user_container">
    <div class="user_content" v-for="user in allUsers" :key="user.name">
      <h1>{{ user.name }}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import { useUserStore } from "@/store/models/model.user";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-users",
  setup() {
    const userState = useUserStore();

    const { isAdmin, allUsers } = storeToRefs(userState);
    const { getAllUsers } = userState;

    return { isAdmin, getAllUsers, allUsers };
  },
  beforeMount() {
    console.log(this.isAdmin);
    if (this.isAdmin) {
      this.getAllUsers();
    } else {
      window.location.replace("/todos");
    }
  },
});
</script>
<style lang="css" scoped>
.user_container {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
