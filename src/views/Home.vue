<template>
  <div class="home" v-if="categories">
    <h1 class="page-title">Categories</h1>
    <CardManager id="categoriesCard" :categories="categories" />
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
    if (!this.categories.length) {
      await this.getCategories();
    }
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
