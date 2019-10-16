<template>
  <div class="card">
    <span class="card__label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: "FeedbackDialog",
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

.card {
  display: flex;
  width: 239px;
  height: 104px;
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
