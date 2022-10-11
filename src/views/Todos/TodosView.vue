<template>
  <div class="todos_container">
    <app-button @click="handleOPenModal" title="Create new todo"></app-button>
    <app-form :title="title" :description="description"></app-form>
    <div class="todos_content">
      <todo-item v-for="todo in todos" :key="todo.id" :todo="todo"></todo-item>
    </div>
    <p v-if="$store.state.todos.isPending">Loading...</p>
  </div>
</template>

<script>
import { useStoreTyped } from "@/store";
import { defineComponent } from "vue";
import TodoItem from "@/components/Todos/TodoItem.vue";

export default defineComponent({
  setup() {
    const { commit, state, dispatch } = useStoreTyped();
    return { store: state, commit, dispatch };
  },
  data() {
    return {
      title: "",
      description: "",
      isOpen: "",
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos.list;
    },
  },

  methods: {
    handleOPenModal() {
      this.commit("modal/setModalBody", {
        headerTitle: "Create new todo",
        title: "",
        description: "",
        fetchMethod: "POST",
        fetchPath: "/todos",
      });
      this.commit("modal/setIsOpen", true);
    },
  },
  components: { TodoItem },
});
</script>
<style lang="css" scoped>
.todos_container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  height: 100vh;
  padding: 10rem 1rem 0 1rem;
}
.error_conteiner {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 15px;
}

.error_content {
  margin: 10px 0;
  padding: 10px;
  background-color: red;
}
.error_content__text {
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
}

.error_content__btn {
  padding: 5px;
  margin-top: 10px;
}
</style>
