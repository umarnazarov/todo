<template>
  <button class="btn">{{ title }}</button>
</template>
<script>
export default {
  name: "app-button",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="css">
.btn {
  background-color: rgb(74, 74, 212);
  color: #fff;
  padding: 0.5rem;
  font-size: 17px;
  outline: none;
  border: 0;
  cursor: pointer;
  width: 100%;
}
</style>
