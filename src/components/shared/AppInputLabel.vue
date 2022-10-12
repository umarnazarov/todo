<template>
  <input
    class="form__input"
    v-focus="idx === 0"
    :type="inputType"
    :id="inputType"
    :isError="isError"
    :required="required"
    :placeholder="labelTitle"
  />
</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "app-label-input",
  props: {
    labelTitle: {
      type: String,
      required: true,
    },
    inputType: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
    },
    idx: {
      type: Number,
    },
    placeholder: {
      type: String,
    },
    isError: {
      type: String,
    }
  },

});
</script>
<style lang="css">
.form__label {
  font-size: 1rem;
  padding: 0.6rem 0;
  display: block;
}

.form__input {
  width: 100%;
  padding: 0.33rem;
  font-size: 15.5px;
  margin-top: 20px;
}
</style>
