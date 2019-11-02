<template>
  <div class="card" @click="$emit('click')" :id="id">
    <span class="card__label" :id="id + 'Label'">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: "Card",
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

.card {
  display: flex;
  height: 104px;
  background-color: $white;
  border-radius: 8px;
  border: 1px solid #e4e4e6;
  align-items: flex-end;
  margin: 16px 0;

  &__label {
    font-size: 18px;
    color: $ink;
    padding: 16px;
  }
}
</style>
