<template>
  <div class="home">
    <keep-alive>
      <h1 class="page-title">Categories</h1>
      <CardManager id="categoriesCard" :categories="categories" />
    </keep-alive>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CardManager from "@/components/home/CardManager";

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
  padding: 16px;
}
.page-title {
  color: $ink;
}
</style>
