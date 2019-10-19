<template functional>
  <div class="page-template">
    <div class="page-template__header">
      <slot name="header" />
    </div>

    <div class="page-template__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  functional: true
};
</script>

<style lang="scss">
.page-template {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__header {
    flex: 56px 0;
  }

  &__content {
    display: flex;
    justify-content: center;
    flex: 1;
    background: #e5e5e5;
  }
}
</style>
