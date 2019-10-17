<template>
  <div class="trivia" v-if="actualQuestion">
    <h2 class="page-title">{{ category }}</h2>
    <div>
      <div>
        <h3>Questão {{ actualIndex + 1 }}</h3>
        <span>{{ actualQuestion.difficulty }}</span>
      </div>
      <div class="question">
        <h4 class="question__text">{{ actualQuestion.question }}</h4>
        <div
          class="question__options"
          v-for="(option, index) in options"
          :key="index"
        >
          <span>{{ option }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Trivia",
  props: {
    category: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      actualIndex: 0,
      actualQuestion: ""
    };
  },
  async created() {
    await this.getQuestions({ category: this.category, difficulty: "medium" });
    [this.actualQuestion] = this.questions["1"];
  },
  computed: {
    ...mapState("trivia", ["questions"]),
    options() {
      return [
        ...this.actualQuestion.incorrect_answers,
        this.actualQuestion.correct_answer
      ];
    }
  },
  methods: {
    ...mapActions("trivia", ["getQuestions"])
  }
};
</script>

<style lang="scss" scoped></style>
