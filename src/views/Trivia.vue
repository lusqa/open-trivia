<template>
  <div class="trivia">
    <h2 class="page-title">{{ category }}</h2>
    <div></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Trivia",
  props: {
    category: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      actualQuestion: undefined
    };
  },
  async created() {
    await this.getQuestions(this.category);
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
