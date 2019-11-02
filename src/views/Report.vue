<template>
  <div class="report__container">
    <div class="report__congratulations-section">
      <img
        src="@/assets/images/figure.svg"
        class="report__congratulations-section__img"
        id="figureImg"
      />
      <div class="report__congratulations">
        <span class="report__congratulations__title" id="congratulationsLabel">
          Congratulations!
        </span>
        <span class="report__congratulations__subtitle" id="youFinishedLabel">
          You finished the test
        </span>
      </div>
    </div>
    <div class="report__see-score-section">
      <span class="report__see-score-section__label">
        Veja seu desempenho nas questões
      </span>
    </div>
    <div class="report__score-section">
      <div class="report__score">
        <div class="report__score__item" id="totalCorrectAnswers">
          <span
            class="report__score__item__number"
            id="totalCorrectAnswersNumber"
          >
            {{ totalCorrectAnswers }}
          </span>
          <span
            class="report__score__item__label"
            id="totalCorrectAnswersLabel"
          >
            acertos
          </span>
        </div>
        <div class="report__score__item">
          <span
            class="report__score__item__number"
            id="totalIncorrectAnswersNumber"
          >
            {{ totalIncorrectAnswers }}
          </span>
          <span
            class="report__score__item__label"
            id="totalIncorrectAnswersNumber"
          >
            erros
          </span>
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
          >
            {{ difficulty }}
          </span>
          <span
            class="report__detailed__score__item__points"
            :id="`correctAnswers${difficulty}`"
          >
            Correct: {{ correctAnswers[difficulty] }}
          </span>
          <span
            class="report__detailed__score__item__points"
            :id="`incorrectAnswers${difficulty}`"
          >
            Wrong: {{ incorrectAnswers[difficulty] }}
          </span>
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
    category: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
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
  created() {
    const answers = JSON.parse(localStorage.getItem(this.category));
    this.correctAnswers = { ...answers.correctAnswers };
    this.incorrectAnswers = { ...answers.incorrectAnswers };
  },
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

$neutral: #343c58;

.page-template {
  &::v-deep .page-template__content {
    align-items: center;
  }
}

.report__container {
  width: 534px;
  height: 577px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-self: center;
}

.report {
  border-radius: 7.04px;

  &__congratulations-section {
    background-color: #438de4;
    display: flex;
    justify-content: center;
    flex: 0.4;
    border-radius: 8px 8px 0 0;

    &__img {
      padding-right: 26px;
    }
  }

  &__see-score-section {
    position: absolute;
    left: 50%;
    margin-left: -126px;
    top: 38%;
    margin-top: -17.5px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    height: 35px;
    width: 252px;
    display: flex;
    align-items: center;
    justify-content: center;

    &__label {
      font-size: 14px;
      color: $neutral;
    }
  }

  &__score-section {
    flex: 0.6;
    background-color: #fff;
    border-radius: 0 0 8px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
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
    margin-top: 50px;
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
        color: $neutral;
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
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &__item {
      display: flex;
      flex-direction: column;

      &__difficulty {
        text-transform: capitalize;
        color: $neutral;
        font-size: 18px;
        letter-spacing: 0.4px;
        line-height: 20px;
        font-weight: 550;
      }

      &__points {
        color: $neutral;
        font-size: 16px;
        letter-spacing: 0.44px;
        line-height: 19px;
      }
    }
  }

  &__go-home {
    .button__container {
      width: 170px;
    }
  }
}

@media (max-width: 414px) {
  .report__container {
    width: 100%;
    height: 100%;
    padding: 0;
  }

  .report {
    &__congratulations-section {
      border-radius: 0;

      &__img {
        padding-right: 15px;
      }
    }
    &__score-section {
      border-radius: 0;
    }
    &__score {
      margin-top: 15px;
    }

    &__detailed__score {
      flex-direction: column;
      height: 100%;
      padding: 16px;

      &__item {
        width: 100%;
        align-items: center;
      }
    }

    &__go-home {
      .button__container {
        width: 300px;
      }
    }
  }
}

@media (max-width: 320px) {
  .report {
    &__see-score-section {
      top: 32%;
    }

    &__congratulations {
      &__title {
        font-size: 22px;
      }

      &__subtitle {
        font-size: 17px;
      }
    }

    &__detailed__score {
      &__item {
        &__difficulty {
          font-size: 14px;
        }

        &__points {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
