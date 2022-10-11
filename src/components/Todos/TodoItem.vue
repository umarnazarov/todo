<template>
  <div class="todo_item">
    <div>
      <h4 class="todo_item__title">{{ todo.title }}</h4>
      <p class="todo_item__description">{{ todo.description }}</p>
    </div>
    <div class="todo_item__buttons">
      <button
        @click="$event, handleToggleTodo(todo)"
        class="todo_item__buttons--edit"
        v-if="isAuthorized(todo.createdBy)"
      >
        Edit
      </button>
      <button
        v-if="isAuthorized(todo.createdBy)"
        @click="handleDeleteTodo($event, todo.id)"
        id="todo_item__btn"
      >
        X
      </button>
    </div>
  </div>
</template>
<script>
import { defineComponent, PropType } from "vue";
import { useStoreTyped } from "@/store";

export default defineComponent({
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  setup() {
    const { commit, state, dispatch } = useStoreTyped();
    return { store: state, commit, dispatch };
  },
  methods: {
    async handleDeleteTodo(e, id) {
      this.isLoading = true;
      await new Promise((res) => {
        res(
          this.dispatch("todos/handleDeleteTodos", {
            path: `/todos/${id}`,
            method: "DELETE",
            body: { id },
          })
        );
      });
      this.isLoading = false;
    },
    isAuthorized(createdBy) {
      console.log(this.store);
      return this.store.user.isAdmin || this.store.user.me.role === createdBy;
    },
    handleToggleTodo(todo) {
      this.commit("modal/setModalBody", {
        headerTitle: "Update todo",
        title: todo.title,
        description: todo.description,
        fetchMethod: "PUT",
        fetchPath: `/todos/${todo.id}`,
      });
      this.commit("modal/setIsOpen", true);
    },
  },
});
</script>
<style lang="css">
.todo_item {
  padding: 2rem;
  border: 1px gray solid;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.todo_item__title {
  font-size: 1.1rem;
}
.todo_item__description {
  font-size: 1rem;
  line-height: 1.1;
  padding-top: 10px;
}
#todo_item__btn {
  padding: 10px 15px;
  background-color: rgb(175, 25, 25);
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
}

.todo_item__buttons--edit {
  padding: 10px 15px;
  background-color: rgb(175, 120, 25);
  color: #fff;
  cursor: pointer;
}

.todo_item__buttons {
  gap: 10px;
}
</style>
