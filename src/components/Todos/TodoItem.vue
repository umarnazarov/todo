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
        v-if="isAuthorized"
        label="Edit"
        class="p-button-warning p-button-sm"
      />

      <prime-btn
        v-if="isAuthorized"
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
// packages
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import { defineComponent, PropType } from "vue";
// stores
import { useTodosStore } from "@/store/models/model.todos";
import { useUserStore } from "@/store/models/model.user";
// types
import { ITodo } from "@/store/types/Todos/todo";

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

    const { isPendingDelete, todoID } = storeToRefs(todosStore);

    const { handleDeleteTodos } = todosStore;
    const { isAuthorized } = userStore;

    return { handleDeleteTodos, isAuthorized, isPendingDelete, todoID };
  },
  methods: {
    async handleDeleteTodo(id: string) {
      this.isLoading = true;
      this.todoID = id;
      await this.handleDeleteTodos(id);
      this.isLoading = false;
    },
    handleOpen(todo: ITodo) {
      this.$emit("openModal", todo);
    },
  },
});
</script>
<style></style>
