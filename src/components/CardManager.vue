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
  computed: {},
  mounted() {
    console.log({ id: this.id, categories: this.categories });
  },
  methods: {
    onCardClick(category) {
      const categoryStorage = window.localStorage.getItem(category.name);
      console.log({ categoryStorage });
      if (categoryStorage) {
        this.$router.push({
          name: "report",
          params: {
            correctAnswers: JSON.parse(categoryStorage).correctAnswers,
            incorrectAnswers: JSON.parse(categoryStorage).incorrectAnswers
          }
        });
      } else {
        this.$router.push({
          name: "trivia",
          params: { category: category.name }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/colors.scss";

.card-manager {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 5px;

  @media (min-width: 375px) and (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 375px) {
    grid-template-columns: repeat(2, 1fr);
  }

  .card {
    @media (max-width: 992px) {
      width: 210px;
    }

    @media (max-width: 768px) {
      width: 158px;
    }

    @media (max-width: 576px) {
      width: 165px;
    }

    @media (max-width: 375px) {
      width: 163px;
    }
  }
}
</style>
