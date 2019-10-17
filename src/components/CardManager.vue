<template>
  <div class="card-manager">
    <Card
      v-for="(category, index) in categories"
      :key="index"
      :id="id + category.name"
      :label="category.name"
      @click="onCardClick(category)"
    />
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "CardManager",
  components: {
    Card
  },
  props: {
    id: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  mounted() {
    console.log({ id: this.id, categories: this.categories });
  },
  computed: {},
  methods: {
    onCardClick(category) {
      this.$router.push({
        name: "trivia",
        params: { category: category.name }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/colors.scss";

.card-manager {
  .card {
    @media screen and (max-width: 992px) {
      width: 210px;
    }

    @media screen and (max-width: 768px) {
      width: 158px;
    }

    @media screen and (max-width: 576px) {
      width: 165px;
    }

    @media screen and (max-width: 375px) {
      width: 163px;
    }
  }
}
</style>
