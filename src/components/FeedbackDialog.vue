<template>
  <div class="feedback-dialog__container">
    <div class="overlay" @touchmove="$event.preventDefault()" />
    <div class="feedback-dialog" :class="[border]">
      <img class="feedback-dialog__image" :id="id + 'Image'" :src="image" />
      <span class="feedback-dialog__label" :id="id + 'Label'">{{ label }}</span>
      <Button
        :id="id + 'AdvanceButton'"
        label="Avançar"
        @click="$emit('advance-click')"
      >
        <template slot="right-icon">
          <img src="../assets/images/arrow_right.svg" />
        </template>
      </Button>
    </div>
  </div>
</template>

<script>
import feedbackCorrectImage from "@/assets/images/feedback_correct.svg";
import feedbackWrongImage from "@/assets/images/feedback_wrong.svg";
import Button from "@/components/Button";

export default {
  name: "FeedbackDialog",
  components: {
    Button
  },
  props: {
    id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      validator(value) {
        return ["correct", "wrong"].includes(value);
      }
    }
  },
  computed: {
    image() {
      const source = {
        wrong: feedbackWrongImage,
        correct: feedbackCorrectImage
      };
      return source[this.status];
    },
    border() {
      const color = {
        wrong: "border--wrong",
        correct: "border--correct"
      };
      return color[this.status];
    },
    label() {
      const label = {
        wrong: "Você errou!",
        correct: "Você acertou!"
      };
      return label[this.status];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/colors.scss";

$correct: #32cb82;
$wrong: #ff4f4f;

.feedback-dialog__container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 228px;
  width: 328px;
  border-radius: 8px;
  z-index: 102;
  background-color: $white;

  &__label {
    font-size: 24px;
    color: $ink;
    text-align: center;
  }
}

.border {
  &--wrong {
    border: 3px solid $wrong;
  }

  &--correct {
    border: 3px solid $correct;
  }
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: auto;
  touch-action: none;
  z-index: 101;
  background-color: #1e2124;
  opacity: 0.5;
}
</style>
