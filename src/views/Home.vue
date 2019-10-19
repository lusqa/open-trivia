<template>
  <div class="home">
    <h1 class="page-title">Categorias</h1>
    <CardManager id="cardManager" :categories="categories" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CardManager from "@/components/CardManager";

export default {
  name: "Home",
  components: {
    CardManager
  },
  async created() {
    await this.getCategories();
  },
  computed: {
    ...mapState("trivia", ["categories"])
  },
  methods: {
    ...mapActions("trivia", ["getCategories"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/colors.scss";

.home {
  width: 100%;
}
.page-title {
  color: $ink;
}
</style>
