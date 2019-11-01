<template>
  <div class="report__container">
    <div class="report__blue">
      <img
        src="@/assets/images/figure.svg"
        class="report__blue__img"
        id="figureImg"
      />
      <div class="report__congratulations">
        <span class="report__congratulations__title" id="congratulationsLabel"
          >Congratulations!</span
        >
        <span class="report__congratulations__subtitle" id="youFinishedLabel"
          >You finished the test</span
        >
      </div>
    </div>
    <div class="report__white">
      <div class="report__score">
        <div class="report__score__item" id="totalCorrectAnswers">
          <span
            class="report__score__item__number"
            id="totalCorrectAnswersNumber"
            >{{ totalCorrectAnswers }}</span
          >
          <span class="report__score__item__label" id="totalCorrectAnswersLabel"
            >acertos</span
          >
        </div>
        <div class="report__score__item">
          <span
            class="report__score__item__number"
            id="totalIncorrectAnswersNumber"
            >{{ totalIncorrectAnswers }}</span
          >
          <span
            class="report__score__item__label"
            id="totalIncorrectAnswersNumber"
            >erros</span
          >
        </div>
      </div>
      <div class="report__detailed__score">
        <div
          class="report__detailed__score__item"
          v-for="(difficulty, index) in ['easy', 'medium', 'hard']"
          :key="index"
        >
          <span
            class="report__detailed__score__item__difficulty"
            :id="`${difficulty}Label`"
            >{{ difficulty }}</span
          >
          <span
            class="report__detailed__score__item__points"
            :id="`correctAnswers${difficulty}`"
            >Correct: {{ correctAnswers[difficulty] }}</span
          >
          <span
            class="report__detailed__score__item__points"
            :id="`incorrectAnswers${difficulty}`"
            >Wrong: {{ incorrectAnswers[difficulty] }}</span
          >
        </div>
      </div>
      <div class="report__go-home">
        <Button
          id="goBackHomeButton"
          label="Go back to home"
          @click="$router.push('/')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";

export default {
  name: "Results",
  components: {
    Button
  },
  props: {
    correctAnswers: {
      type: Object,
      default: () => ({})
    },
    incorrectAnswers: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    totalCorrectAnswers() {
      return (
        this.correctAnswers.easy +
        this.correctAnswers.medium +
        this.correctAnswers.hard
      );
    },
    totalIncorrectAnswers() {
      return (
        this.incorrectAnswers.easy +
        this.incorrectAnswers.medium +
        this.incorrectAnswers.hard
      );
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/colors.scss";

.page-template {
  &::v-deep .page-template__content {
    align-items: center;
  }
}

.report__container {
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (in-width: 992px) {
    width: 75%;
  }
}

.report {
  border-radius: 7.04px;

  &__blue {
    background-color: #438de4;
    display: flex;
    justify-content: center;
    flex: 0.4;
    border-radius: 8px 8px 0 0;

    &__img {
      padding-right: 26px;
    }
  }

  &__white {
    flex: 0.6;
    background-color: #fff;
    border-radius: 0 0 8px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px 0;
    align-items: center;
  }

  &__congratulations {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__title {
      font-size: 36px;
      color: $white;
    }

    &__subtitle {
      font-size: 18px;
      color: $white;
    }
  }

  &__score {
    background-color: rgba(52, 60, 88, 0.08);
    color: #fff;
    width: 200px;
    height: 55px;
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;

      &__number,
      &__label {
        color: #343c58;
      }

      &__number {
        font-size: 26px;
      }

      &__label {
        font-size: 18px;
      }
    }
  }

  &__detailed__score {
    display: flex;

    &__item {
      display: flex;
      flex-direction: column;
      padding: 0 50px;

      &__difficulty {
        text-transform: capitalize;
        color: #343c58;
        font-size: 18px;
        letter-spacing: 0.4px;
        line-height: 20px;
        font-weight: 550;
      }

      &__points {
        color: #343c58;
        font-size: 16px;
        letter-spacing: 0.44px;
        line-height: 19px;
      }
    }
  }
}
</style>
