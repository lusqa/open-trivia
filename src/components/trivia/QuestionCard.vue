<template>
  <div
    :id="id"
    class="question-card"
    :class="{ 'question-card--active': active }"
    @click="onQuestionClick"
  >
    <span class="question-card__label" v-html="label" :id="id + 'Label'" />
  </div>
</template>

<script>
export default {
  name: "QuestionCard",
  props: {
    id: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    onQuestionClick() {
      this.$emit("question-selected", this.index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/colors.scss";

.question-card {
  display: flex;
  background-color: $white;
  align-items: flex-end;
  margin: 16px 0;

  border: 1px solid #c9cccf;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(52, 60, 88, 0.4);
  border-radius: 8px;

  &--active {
    border: 3px solid #0467db;
  }

  &__label {
    font-size: 18px;
    color: $ink;
    padding: 16px;
  }
}
</style>
