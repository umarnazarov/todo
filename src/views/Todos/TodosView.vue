<template>
  <div class="max-w-30rem w-full m-auto py-6">
    <prime-btn
      class="w-full border-noround font-light"
      @click="handleOpenCreateModal"
      label="Create new todo"
    ></prime-btn>
    <app-form
      headerTitle="Create a new todo"
      @handleTitle="handleTitle"
      @handleDescr="handleDescr"
      :isOpen="isOpenCreate"
      :title="title"
      :description="description"
      @submit="onCreateTodo"
      @closeModal="closeModal('isOpenCreate')"
      :status="{
        isPending: isPendingUpdate,
        isRejected: isRejectedUpdate,
        error,
      }"
    ></app-form>
    <app-form
      headerTitle="Update todo"
      @handleTitle="handleTitle"
      @handleDescr="handleDescr"
      :isOpen="isOpenEdit"
      @submit="onUpdateTodo"
      :title="title"
      :description="description"
      @closeModal="closeModal('isOpenEdit')"
      :status="{
        isPending: isPendingUpdate,
        isRejected: isRejectedUpdate,
        error,
      }"
    ></app-form>
    <div class="todos_content">
      <todo-item
        @openModal="handleOpenEditModal"
        v-for="todo in storeTodos.list"
        :key="todo.id"
        :todo="todo"
      ></todo-item>
    </div>
    <p class="text-center pt-3" v-if="storeTodos.isPending">Loading...</p>
    <p class="text-center pt-3" v-if="!storeTodos.list.length && !isRejected">
      No todos yet
    </p>
    <p class="text-center text-red-400 pt-3" v-if="isRejected">
      There was a problem while getting todos...
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoItem from "@/components/Todos/TodoItem.vue";
import { useTodosStore } from "@/store/models/model.todos";
import Button from "primevue/button";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const storeTodos = useTodosStore();
    const { handleUpdateTodo } = storeTodos;
    const { isPendingUpdate, isRejectedUpdate, error, isPending, isRejected } =
      storeToRefs(storeTodos);

    return {
      storeTodos,
      handleUpdateTodo,
      isPendingUpdate,
      isRejectedUpdate,
      isPending,
      isRejected,
      error,
    };
  },
  data() {
    return {
      id: "",
      title: "",
      description: "",
      isOpenCreate: false,
      isOpenEdit: false,
    };
  },
  methods: {
    handleTitle(event) {
      this.title = event.target.value;
    },
    handleDescr(event) {
      this.description = event.target.value;
    },
    async onCreateTodo(form: any) {
      await this.handleUpdateTodo(form, "/todos", "POST");
      if (!this.isRejectedUpdate) {
        this.isOpenCreate = false;
      }
    },
    closeModal(modal) {
      this.storeTodos.clearStatus();
      this[modal] = false;
    },
    async onUpdateTodo() {
      await this.handleUpdateTodo(
        {
          title: this.title,
          description: this.description,
        },
        `/todos/${this.id}`,
        "PUT"
      );
      this.isOpenEdit = false;
    },
    handleOpenEditModal(form) {
      this.title = form.title;
      this.description = form.description;
      this.id = form.id;
      this.isOpenEdit = true;
    },
    handleOpenCreateModal() {
      this.title = "";
      this.description = "";
      this.id = "";
      this.isOpenCreate = true;
    },
  },

  components: { TodoItem, "prime-btn": Button },
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
