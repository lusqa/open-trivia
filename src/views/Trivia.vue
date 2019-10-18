<template>
  <div class="trivia" v-if="actualQuestion">
    <div class="category__header">
      <h2 class="category__header__title">{{ category }}</h2>
      <span class="category__header__close">Fechar</span>
    </div>
    <div class="question__card">
      <div class="question__header">
        <h3>Question {{ actualIndex + 1 }}</h3>
        <span>{{ actualQuestion.difficulty }}</span>
      </div>
      <div class="question">
        <h4 class="question__text">{{ actualQuestion.question }}</h4>
        <div
          class="question__options"
          v-for="(option, index) in options"
          :key="index"
        >
          <QuestionCard
            id="aa"
            :active="questionSelected === index"
            :index="index"
            :label="option"
            @question-selected="questionSelected = arguments[0]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import QuestionCard from "@/components/QuestionCard";

export default {
  name: "Trivia",
  components: {
    QuestionCard
  },
  props: {
    category: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      actualIndex: 0,
      actualQuestion: "",
      questionSelected: -1
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

<style lang="scss" scoped>
@import "@/assets/stylesheets/colors.scss";

.trivia {
  width: 700px;

  @media screen and (max-width: 768px) {
    width: 704px;
  }

  @media screen and (max-width: 576px) {
    width: 526px;
  }

  @media screen and (max-width: 375px) {
    width: 373px;
  }
}

h2,
h3,
h4 {
  font-weight: normal;
}
.category {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__title,
    &__close {
      color: $ink;
    }
  }
}

.question {
  &__card {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 24px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__text {
    color: #1e2124;
    font-size: 16px;
    letter-spacing: 0.2px;
  }
}
</style>
