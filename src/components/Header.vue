<template>
  <header class="header" :id="id">
    <span class="header__label" :id="id + 'Label'">{{ label }}</span>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
$primary: #343c58;

.header {
  display: flex;
  min-height: 56px;
  background-color: $primary;
}
.header__label {
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  padding: 16px 26px;
}
</style>
