<template>
  <app-modal :isVisible="isOpen" @closeModal="$emit('closeModal')">
    <div>
      <h3>{{ modalStore.headerTitle }}</h3>
      <form @submit.prevent="handleSubmit">
        <app-label-input
          @input="$emit('handleTitle', $event)"
          :value="title"
          type="text"
          :idx="0"
          labelTitle="Tile"
        ></app-label-input>
        <app-label-input
          @input="$emit('handleDescr', $event)"
          type="text"
          :value="description"
          labelTitle="Description"
        ></app-label-input>
        <app-button style="margin-top: 1rem" title="Submit"></app-button>
      </form>
      <span
        v-if="errorMessage"
        style="color: red; display: inline-block; padding-top: 10px"
      >
        {{ errorMessage }}
      </span>
    </div>
  </app-modal>
</template>

<script lang="ts">
//packages
import { defineComponent } from "vue";

//stores
import { useModalStore } from "@/store/models/model.modal";
import { useTodosStore } from "@/store/models/model.todos";

//components
import AppModal from "./AppModal.vue";
import AppButton from "./AppButton.vue";

export default defineComponent({
  name: "app-form",
  props: {
    headerTitle: String,
    isOpen: {
      type: String,
    },
    description: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      errorMessage: "",
    };
  },
  setup() {
    const modalStore = useModalStore();
    const todosStore = useTodosStore();

    const { handleUpdateTodo } = todosStore;

    return { modalStore, todosStore, handleUpdateTodo };
  },
  methods: {
    async handleSubmit() {
      this.$emit("submit", {
        title: this.title,
        description: this.description,
      });

      this.modalStore.isOpen = false;
    },
  },
  components: { AppModal, AppButton },
});
</script>

<style lang=""></style>
