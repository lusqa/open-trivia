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
      nextDifficulty: "medium",
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
    const { category, nextDifficulty, questions, actualIndex } = this;
    await this.getQuestions({
      category: category,
      difficulty: nextDifficulty
    });
    this.actualQuestion = questions[actualIndex];
  },
  watch: {
    correctStrick: {
      handler(newValue) {
        if (newValue >= 2) {
          if (this.actualQuestion.difficulty === "easy") {
            this.nextDifficulty = "medium";
          } else if (this.actualQuestion.difficulty === "medium") {
            this.nextDifficulty = "hard";
          }
        }
      }
    },
    incorrectStrick: {
      handler(newValue) {
        if (newValue >= 2) {
          if (this.actualQuestion.difficulty === "medium") {
            this.nextDifficulty = "easy";
          } else if (this.actualQuestion.difficulty === "hard") {
            this.nextDifficulty = "medium";
          }
        }
      }
    },
    nextDifficulty: {
      async handler(newValue) {
        if (newValue) {
          await this.getQuestions({
            category: this.category,
            difficulty: newValue
          });
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
      const { questions } = this;
      this.actualIndex++;
      if (this.actualIndex === this.questions.length) {
        await this.getQuestions({
          category: this.category,
          difficulty: this.nextDifficulty,
          amount: 1
        });
      }
      this.actualQuestion = questions[this.actualIndex];
    },
    saveCategory() {
      window.localStorage.setItem(
        this.category,
        JSON.stringify({
          correctAnswers: this.correctAnswers,
          incorrectAnswers: this.incorrectAnswers
        })
      );
      this.resetQuestions();
      this.$router.push({
        name: "report",
        params: {
          correctAnswers: this.correctAnswers,
          incorrectAnswers: this.incorrectAnswers
        }
      });
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
}

.trivia {
  width: 100%;
  padding: 16px;

  @media screen and (in-width: 992px) {
    width: 70%;
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
</style>
