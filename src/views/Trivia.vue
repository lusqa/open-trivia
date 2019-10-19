<template>
  <div class="trivia__container">
    <div class="trivia" v-if="actualQuestion">
      <div class="category__header">
        <h2 class="category__header__title">{{ category }}</h2>
        <div
          class="category__header__close"
          id="closeButton"
          @click="$router.go(-1)"
        >
          <img
            src="../assets/images/close_icon.svg"
            alt=""
            id="closeButtonImg"
          />
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
          <div class="card__footer">
            <Button
              id="answerButton"
              label="Responder"
              :disabled="questionSelected === -1"
              @click="onAnswerClick"
            />
          </div>
        </div>
      </div>
    </div>
    <portal to="root" v-if="isDialogVisible">
      <FeedbackDialog
        id="aaaa"
        :status="isCorrectAnswer"
        @advance-click="onAdvanceClick"
      />
    </portal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import QuestionCard from "@/components/QuestionCard";
import FeedbackDialog from "@/components/FeedbackDialog";
import Button from "@/components/Button";

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
      questionSelected: -1,
      isDialogVisible: false
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
    },
    isCorrectAnswer() {
      if (
        this.options[this.questionSelected] ===
        this.actualQuestion.correct_answer
      ) {
        return "correct";
      } else {
        return "wrong";
      }
    }
  },
  methods: {
    ...mapActions("trivia", ["getQuestions"]),
    onAnswerClick() {
      this.isDialogVisible = true;
      console.log({ answer: this.options[this.questionSelected] });
    },
    onAdvanceClick() {
      this.isDialogVisible = false;
      console.log({ answer: this.options[this.questionSelected] });
    }
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
    width: 373px;
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
