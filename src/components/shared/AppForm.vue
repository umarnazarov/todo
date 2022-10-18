<template>
  <app-modal :isVisible="isOpen" @closeModal="isOpen = false">
    <div>
      <h3>{{ headerTitle }}</h3>
      <form @submit.prevent="handleSubmit">
        <input-text
          @input="$emit('handleTitle', $event)"
          :value="title"
          type="text"
          placeholder="Title"
          labelTitle="Tile"
          class="w-full mt-3"
          :class="{
            'p-invalid': status?.isRejected || (errorMessage && !title),
          }"
        ></input-text>
        <input-text
          class="w-full mt-3 mb-3"
          placeholder="Description"
          @input="$emit('handleDescr', $event)"
          type="text"
          :value="description"
          labelTitle="Description"
          :class="{
            'p-invalid': errorMessage && !description,
          }"
        ></input-text>
        <prime-btn
          @click="handleSubmit"
          class="w-full"
          :label="status?.isPending ? 'Loading' : 'Submit'"
        ></prime-btn>
      </form>
      <span
        class="text-sm text-red-500 block mt-3"
        v-if="errorMessage || status?.isRejected"
      >
        {{ errorMessage || status?.error }}
      </span>
    </div>
  </app-modal>
</template>

<script lang="ts">
//packages
import { defineComponent } from "vue";

//stores
import { useTodosStore } from "@/store/models/model.todos";

//components
import AppModal from "./AppModal.vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

export default defineComponent({
  name: "app-form",
  components: {
    "prime-btn": Button,
    "input-text": InputText,
    AppModal,
  },
  expose: ['handleModal'],
  props: {
    headerTitle: String,

    description: {
      type: String,
    },
    title: {
      type: String,
    },
    status: {
      type: Object,
    },
  },
  data() {
    return {
      errorMessage: "",
      isOpen: false,
    };
  },
  setup() {
    const todosStore = useTodosStore();

    const { handleUpdateTodo } = todosStore;

    return { todosStore, handleUpdateTodo };
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = "";
      if (!this.title || !this.description)
        return (this.errorMessage = "Fill out all fields");

      this.$emit("submit", {
        title: this.title,
        description: this.description,
      });
    },
    handleModal(state: boolean){
      this.isOpen = state
    }
  },
});
</script>

<style lang=""></style>
