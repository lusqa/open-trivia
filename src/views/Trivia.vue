<template>
  <div class="trivia">
    <h2 class="page-title">{{}}</h2>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "FeedbackDialog",
  props: {
    id: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      validator(value) {
        return [
          "History",
          "Mythology",
          "Geography",
          "Sports",
          "Politics",
          "General Knowledge"
        ].includes(value);
      }
    }
  },
  data() {
    return {
      question: undefined
    };
  },
  async created() {
    await this.getQuestions("History");
    console.log({ questions: this.questions });
  },
  computed: {
    ...mapState("trivia", ["questions"])
  },
  methods: {
    ...mapActions("trivia", ["getQuestions"])
  }
};
</script>

<style lang="scss" scoped></style>
