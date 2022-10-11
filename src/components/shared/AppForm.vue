<template>
  <app-modal v-model:isVisible="$store.state.modal.isOpen">
    <div>
      <h3>{{ $store.state.modal.headerTitle }}</h3>
      <form @submit.prevent="handleSubmit">
        <app-label-input
          @input="$store.commit('modal/updateTitle', $event)"
          :value="$store.state.modal.title"
          type="text"
          :idx="0"
          labelTitle="Tile"
        ></app-label-input>
        <app-label-input
          @input="$store.commit('modal/updateDescription', $event)"
          :value="$store.state.modal.description"
          type="text"
          labelTitle="Description"
        ></app-label-input>
        <app-button
          @click="handleSubmit"
          style="margin-top: 1rem"
          :title="btnText"
        ></app-button>
      </form>
      <span
        :v-focus="error.status"
        v-if="error"
        style="color: red; display: inline-block; padding-top: 10px"
      >
        {{ error.message }}
      </span>
    </div>
  </app-modal>
</template>

<script>
import { defineComponent } from "vue";
import AppModal from "./AppModal.vue";
import AppButton from "./AppButton.vue";
import { useStoreTyped } from "@/store";
export default defineComponent({
  name: "app-form",
  props: {
    headerTitle: String,
  },
  data() {
    return {
      error: {
        status: false,
        message: "",
      },
    };
  },
  setup() {
    const { commit, state, dispatch } = useStoreTyped();
    return { store: state, commit, dispatch };
  },
  methods: {
    async handleSubmit() {
      const modal = this.store.modal;
      if (!modal.title) {
        this.error = {
          status: true,
          message: "Title cannot be empty",
        };
        return;
      }
      this.error = {};
      this.dispatch("todos/handleUpdateTodo", {
        body: {
          title: modal.title,
          description: modal.description,
        },
        method: modal.fetchMethod,
        path: modal.fetchPath,
      });
      this.commit("modal/setIsOpen", false);
    },
  },
  computed: {
    btnText() {
      return this.store.todos.isPending ? "Adding new todo..." : "Create";
    },
  },
  components: { AppModal, AppButton },
});
</script>

<style lang=""></style>
