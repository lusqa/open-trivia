<template>
  <div class="feedback-dialog" :class="[border]">
    <img class="feedback-dialog__image" :id="id + 'Image'" :src="image" />
    <span class="feedback-dialog__label" :id="id + 'Label'">{{ label }}</span>
    <Button :id="id + 'AdvanceButton'" label="Avançar" @click="advance">
      <template slot="right-icon">
        <img src="../assets/images/arrow_right.svg" />
      </template>
    </Button>
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
  methods: {
    advance() {
      console.log("aaaa");
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

.feedback-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 228px;
  width: 328px;
  border-radius: 8px;

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
</style>
