<template>
  <div class="trivia__container">
    <div class="trivia" v-if="actualQuestion">
      <div class="category__header">
        <h2 class="category__header__title" id="categoryName">
          {{ category }}
        </h2>
        <div
          class="category__header__close"
          id="closeButton"
          @click="$router.go(-1)"
        >
          <img src="@/assets/images/close_icon.svg" alt id="closeButtonImg" />
          <span id="closeButtonText">Close</span>
        </div>
      </div>
      <div class="card">
        <div class="card__header">
          <h3 id="questionNumber">Question {{ actualIndex + 1 }}</h3>
          <span id="questionDifficulty">{{ actualQuestion.difficulty }}</span>
        </div>
        <div class="question">
          <h4 class="question__text" v-html="actualQuestion.question" />
          <div class="question__content">
            <div class="question__options">
              <QuestionCard
                v-for="(option, index) in options"
                :key="index"
                :id="'questionOption' + index"
                :active="optionSelected === index"
                :index="index"
                :label="option"
                @question-selected="optionSelected = arguments[0]"
              />
            </div>
            <div class="card__footer">
              <Button
                id="answerButton"
                label="Answer"
                :disabled="optionSelected === -1"
                @click="onAnswerClick"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <portal to="root" v-if="isDialogVisible">
      <FeedbackDialog
        id="feedbackDialog"
        :is-correct="isCorrectAnswer"
        @next-click="onNextClick"
      />
    </portal>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import QuestionCard from "@/components/trivia/QuestionCard";
import FeedbackDialog from "@/components/trivia/FeedbackDialog";
import Button from "@/components/Button";

import { shuffle } from "@/utils/array.util";

export default {
  name: "Trivia",
  components: {
    QuestionCard,
    Button,
    FeedbackDialog
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
      optionSelected: -1,
      isDialogVisible: false,
      difficulty: "medium",
      correctStrick: 0,
      incorrectStrick: 0,
      correctAnswers: {
        easy: 0,
        medium: 0,
        hard: 0
      },
      incorrectAnswers: {
        easy: 0,
        medium: 0,
        hard: 0
      }
    };
  },
  async created() {
    const { category, difficulty } = this;
    await this.getQuestions(category);
    this.actualQuestion = this.questions[difficulty].pop();
  },
  watch: {
    correctStrick: {
      handler(newValue) {
        if (newValue >= 2) {
          if (this.difficulty === "easy") {
            this.difficulty = "medium";
          } else if (this.difficulty === "medium") {
            this.difficulty = "hard";
          }
        }
      }
    },
    incorrectStrick: {
      handler(newValue) {
        if (newValue >= 2) {
          if (this.difficulty === "medium") {
            this.difficulty = "easy";
          } else if (this.difficulty === "hard") {
            this.difficulty = "medium";
          }
        }
      }
    },
    actualIndex: {
      async handler(newValue) {
        if (newValue === 10) {
          this.saveCategory();
        }
      }
    }
  },
  computed: {
    ...mapState("trivia", ["questions"]),
    options() {
      return shuffle([
        ...this.actualQuestion.incorrect_answers,
        this.actualQuestion.correct_answer
      ]);
    },
    isCorrectAnswer() {
      const { options, optionSelected, actualQuestion } = this;
      return options[optionSelected] === actualQuestion.correct_answer;
    }
  },
  methods: {
    ...mapMutations("trivia", ["resetQuestions"]),
    ...mapActions("trivia", ["getQuestions"]),
    onAnswerClick() {
      const { difficulty } = this.actualQuestion;
      this.isDialogVisible = true;
      if (this.isCorrectAnswer) {
        this.correctAnswers[difficulty]++;
        this.correctStrick++;
        this.incorrectStrick = 0;
      } else {
        this.incorrectAnswers[difficulty]++;
        this.incorrectStrick++;
        this.correctStrick = 0;
      }
    },
    onNextClick() {
      this.isDialogVisible = false;
      this.optionSelected = -1;
      this.nextQuestion();
    },
    async nextQuestion() {
      const { questions, difficulty } = this;
      this.actualIndex++;
      this.actualQuestion = questions[difficulty].pop();
    },
    saveCategory() {
      localStorage.setItem(
        this.category,
        JSON.stringify({
          correctAnswers: this.correctAnswers,
          incorrectAnswers: this.incorrectAnswers
        })
      );
      this.resetQuestions();
      this.$router.push({ name: "report" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/colors.scss";

.trivia__container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 700px;
}

.trivia {
  width: 100%;
  height: 100%;
  padding: 16px;
}

h2,
h3,
h4 {
  font-weight: normal;
  font-size: 19px;
  @media (min-width: 992px) {
    font-size: 1.5em;
  }
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

    &__close {
      display: flex;
      align-items: center;

      #closeButtonText {
        padding-left: 10px;
      }
    }
  }
}

.card {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 8px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    #questionDifficulty {
      text-transform: capitalize;
    }
  }

  &__text {
    color: #1e2124;
    font-size: 16px;
    letter-spacing: 0.2px;
  }

  &__footer {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 414px) {
  .trivia {
    padding: 0;

    .category {
      &__header {
        padding: 0 14px;
      }
    }

    .card {
      height: calc(100% - 55px);
      padding: 0 24px;

      .question {
        height: 100%;
        display: flex;
        flex-direction: column;

        &__text {
          margin: 0;
        }

        &__content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          margin-bottom: 30px;
        }
      }

      &__footer {
        .button__container {
          width: 300px;
        }
      }
    }
  }
}
</style>
