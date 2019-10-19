<template>
  <div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Results",
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
  created() {},
  watch: {},
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/colors.scss";
</style>
