<template>
  <div
    class="h-screen justify-content-center flex align-items-center surface-200"
  >
    <div class="max-w-22rem w-full bg-white p-4">
      <h3 class="py-3 font-normal text-center text-xl">Login</h3>
      <form @submit="handleSubmit" class="login_content__form">
        <span
          v-for="(input, idx) in inputs"
          :key="input.label"
          class="p-float-label mt-4"
        >
          <input-text
            :class="{
              'p-invalid': (!input.value && errorMessage.status) || error,
            }"
            class="w-full border-noround"
            v-bind:key="input.label"
            :idx="idx"
            :inputType="input.type"
            :labelTitle="input.label"
            :required="input.required"
            v-model="input.value"
          />
          <label for="username">{{ input.label }}</label>
        </span>
      </form>
      <prime-btn
        @click="handleSubmit"
        class="my-3 w-full border-noround relative justify-content-center"
        label="submit"
      >
        <span class="" v-if="isPending"
          ><progress-spenner
            class="w-1rem h-1rem"
            strokeWidth="2"
            stroke="white"
        /></span>
        <span class="text-center w-full" v-else>Submit</span>
      </prime-btn>
      <p v-if="inputs.length !== 0 || error || errorMessage.status">
        <span class="text-red-500 pt-3">
          {{ error || errorMessage.message }}
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
//packages
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
// components
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
// stores
import { useTodosStore } from "@/store/models/model.todos";
import { useUserStore } from "@/store/models/model.user";

type IError = {
  status: boolean;
  message: string;
};

export default defineComponent({
  components: {
    "prime-btn": Button,
    "input-text": InputText,
    "progress-spenner": ProgressSpinner,
  },
  name: "app-login",
  data() {
    return {
      inputs: [
        {
          label: "Username",
          required: true,
          type: "text",
          value: "",
        },
        {
          label: "Password",
          required: true,
          type: "password",
          value: "",
        },
      ],
      errorMessage: {
        status: false,
        message: "",
      } as IError,
    };
  },
  setup() {
    // router
    const router = useRouter();
    const userStore = useUserStore();
    // stores
    const todosStore = useTodosStore();

    const { isRejected, error, isPending } = storeToRefs(userStore);
    const { list } = storeToRefs(todosStore);

    const { getUser } = userStore;

    return { router, list, isRejected, getUser, error, isPending };
  },
  methods: {
    async handleSubmit() {
      const login = this.inputs[0].value;
      const password = this.inputs[1].value;

      this.errorMessage.message = "";
      this.errorMessage.status = false;
      
      // validation of inputs
      if (!login || !password) this.errorMessage.status = true;

      if (!login && !password)
        return (this.errorMessage.message = "Fields cannot be empty");

      if (!login)
        return (this.errorMessage.message = "Username cannot be empty");
      if (!password)
        return (this.errorMessage.message = "Password cannot be empty");

      const form = { login, password };
      await this.getUser({ body: form, method: "POST", path: "/login" });
      !this.isRejected && window.location.replace("/todos");
    },
  },
});
</script>

<style lang="css">
@keyframes p-progress-spinner-color {
  100%,
  0% {
    stroke: #fff;
  }
  40% {
    stroke: #fff;
  }
  66% {
    stroke: #fff;
  }
  80%,
  90% {
    stroke: #fff;
  }
}
</style>
