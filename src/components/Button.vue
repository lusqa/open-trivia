<template>
  <div class="button__container">
    <button
      v-bind="buttonAttrs"
      v-on="$listeners"
      :id="id"
      class="button"
      :class="{ 'button--disabled': disabled }"
    >
      <span class="button__label">{{ label }}</span>
      <slot name="right-icon"></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "Button",
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    buttonAttrs() {
      return {
        ...this.$attrs,
        disabled: this.disabled
      };
    }
  }
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
    border: none;
    display: flex;
    background-color: $bg-color;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    border-radius: 8px;

    &--disabled {
      background-color: #c9cccf;
    }

    &__label {
      font-size: 16px;
      color: #ffffff;
    }
  }
}
</style>
