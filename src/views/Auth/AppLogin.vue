<template>
  <div class="login_container">
    <div class="login_content">
      <h3 class="login_content__title">Login</h3>
      <form @submit="handleSubmit" class="login_content__form">
        <app-label-input
          v-for="(input, idx) in inputs"
          v-bind:key="input.label"
          :idx="idx"
          :inputType="input.type"
          :labelTitle="input.label"
          :required="input.required"
          :value="input.value"
          @input="hadnleInputChange($event, idx)"
        ></app-label-input>
      </form>
      <app-button
        @click="handleSubmit"
        style="margin-top: 0.8rem"
        title="Login"
      ></app-button>
      <p v-if="inputs.length !== 0 || $store.state.user.error">
        <span style="color: red; display: inline-block; padding-top: 10px">
          {{ error || $store.state.user.error }}
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { useStoreTyped } from "@/store";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
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
          type: "text",
          value: "",
        },
      ],
      error: "",
    };
  },
  setup() {
    const { commit, state, dispatch } = useStoreTyped();
    const router = useRouter();
    return { store: state, commit, dispatch, router };
  },
  methods: {
    async handleSubmit() {
      const login = this.inputs[0].value;
      const password = this.inputs[1].value;
      this.error = "";
      if (!login) {
        this.error = "Username cannot be empty";
        return;
      }
      if (!password) {
        this.error = "Password cannot be empty";
        return;
      }

      const form = { login, password };
      await new Promise((res) => {
        res(
          this.dispatch("user/getUser", {
            body: form,
            method: "POST",
            path: "/login",
          })
        );
      });
      !this.store.user.isRejected && window.location.replace("/todos");
    },
    hadnleInputChange(e: any, idx: number) {
      this.inputs[idx].value = e.target.value;
    },
  },
});
</script>

<style lang="css" scoped>
.login_container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eef2f7;
}

.login_content {
  width: 100%;
  max-width: 350px;
  padding: 3rem;
  background-color: #fff;
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
}

.login_content__title {
  font-size: 1.4rem;
  font-weight: 100;
  padding-bottom: 2rem;
  text-align: center;
}

.login_content__form {
  display: flex;
  flex-direction: column;
}
</style>
