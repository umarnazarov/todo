<template>
  <div class="todo_item">
    <div>
      <h4 class="todo_item__title">{{ todo.title }}</h4>
      <p class="todo_item__description">{{ todo.description }}</p>
    </div>
    <div class="todo_item__buttons">
      <button
        @click="handleOpen(todo)"
        class="todo_item__buttons--edit"
        v-if="isAuthorized(todo.createdBy!)"
      >
        Edit
      </button>
      <button
        v-if="isAuthorized(todo.createdBy!)"
        @click="handleDeleteTodo(todo.id!)"
        id="todo_item__btn"
      >
        X
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { useModalStore } from "@/store/models/model.modal";
import { useTodosStore } from "@/store/models/model.todos";
import { useUserStore } from "@/store/models/model.user";
import { ITodo } from "@/store/types/Todos/todo";
import { storeToRefs } from "pinia";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "todo-item",
  props: {
    todo: {
      type: Object as PropType<ITodo>,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  setup() {
    const store = useTodosStore();
    const userStore = useUserStore();
    const modalStore = useModalStore();

    const { handleDeleteTodos } = store;

    const { isAuthorized } = userStore;
    return { store, handleDeleteTodos, isAuthorized, modalStore };
  },
  methods: {
    async handleDeleteTodo(id: number) {
      this.isLoading = true;
      await this.handleDeleteTodos(id);
      this.isLoading = false;
    },
    handleOpen(todo) {
      this.$emit("openModal", todo);
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
