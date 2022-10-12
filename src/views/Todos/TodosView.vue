<template>
  <div class="todos_container">
    <app-button
      @click="handleOpenCreateModal"
      title="Create new todo"
    ></app-button>
    <app-form
      @handleTitle="handleTitle"
      @handleDescr="handleDescr"
      :isOpen="isOpenCreate"
      :title="title"
      :description="description"
      @submit="onCreateTodo"
      @closeModal="isOpenCreate = false"
    ></app-form>
    <app-form
      @handleTitle="handleTitle"
      @handleDescr="handleDescr"
      :isOpen="isOpenEdit"
      @submit="onUpdateTodo"
      :title="title"
      :description="description"
      @closeModal="isOpenEdit = false"
    ></app-form>
    <div class="todos_content">
      <todo-item
        @openModal="handleOpenEditModal"
        v-for="todo in storeTodos.list"
        :key="todo.id"
        :todo="todo"
      ></todo-item>
    </div>
    <p v-if="storeTodos.isPending">Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoItem from "@/components/Todos/TodoItem.vue";
import { useTodosStore } from "@/store/models/model.todos";

export default defineComponent({
  setup() {
    const storeTodos = useTodosStore();
    const { handleUpdateTodo } = storeTodos;

    return { storeTodos, handleUpdateTodo };
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
    onCreateTodo(form: any) {
      this.handleUpdateTodo(form, "/todos", "POST");
      this.isOpenCreate = false;
    },
    onUpdateTodo() {
      this.handleUpdateTodo(
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
      console.log(form.title);
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
