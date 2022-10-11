<template>
  <div class="user_container">
    <div
      class="user_content"
      v-for="user in $store.state.user.allUsers"
      :key="user.name"
    >
      <h1>{{ user.name }}</h1>
    </div>
  </div>
</template>
<script>
import { useStoreTyped } from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-users",
  setup() {
    const { state, dispatch } = useStoreTyped();
    return { store: state, dispatch };
  },
  mounted() {
    console.log(this.store.user.isAdmin);
    if (this.store.user.isAdmin) {
      this.dispatch("user/getAllUsers");
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
