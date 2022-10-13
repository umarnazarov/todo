<template>
  <div
    class="border-300 border-1 my-3 w-full flex justify-content-between py-6 px-3"
  >
    <div>
      <h4 class="font-normal text-base">{{ todo.title }}</h4>
      <p class="text-sm pt-3">{{ todo.description }}</p>
    </div>
    <div class="todo_item__buttons">
      <prime-btn
        @click="handleOpen(todo)"
        v-if="isAuthorized(todo.createdBy!)"
        label="Edit"
        class="p-button-warning p-button-sm"
      />

      <prime-btn
        v-if="isAuthorized(todo.createdBy!)"
        @click="handleDeleteTodo(todo.id!)"
        :icon="
          isPendingDelete && todoID === todo.id
            ? 'pi pi-spin pi-spinner'
            : 'pi pi-times'
        "
        class="p-button-rounded p-button-danger p-button-text ml-3"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { useTodosStore } from "@/store/models/model.todos";
import { useUserStore } from "@/store/models/model.user";
import { ITodo } from "@/store/types/Todos/todo";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "todo-item",
  components: {
    "prime-btn": Button,
  },
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
    const todosStore = useTodosStore();
    const userStore = useUserStore();

    const { handleDeleteTodos } = todosStore;
    const { isPendingDelete, todoID } = storeToRefs(todosStore);
    const { isAuthorized } = userStore;
    return { handleDeleteTodos, isAuthorized, isPendingDelete, todoID };
  },
  methods: {
    async handleDeleteTodo(id) {
      this.isLoading = true;
      this.todoID = id;
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
