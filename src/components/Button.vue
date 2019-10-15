<template>
  <div class="button__container">
    <button v-bind="$attrs" v-on="$listeners" :id="id" class="button">
      <span class="button__label">{{ label }}</span>
      <slot name="right-icon"></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "FeedbackDialog",
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/colors.scss";

$bg-color: #0467db;

.button__container {
  width: 147px;
  height: 44px;

  .button {
    width: 100%;
    height: 100%;
    background: $bg-color;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    border-radius: 8px;

    &__label {
      font-size: 16px;
      color: #ffffff;
    }
  }
}
</style>
