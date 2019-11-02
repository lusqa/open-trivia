<template>
  <div class="card-manager">
    <Card
      v-for="(category, index) in categories"
      :key="index"
      :id="removeSpaces(id + category.name)"
      :label="category.name"
      @click="onCardClick(category)"
    />
  </div>
</template>

<script>
import Card from "@/components/home/Card";
import { removeSpaces } from "@/utils/string.util";

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
  methods: {
    removeSpaces,
    onCardClick({ name }) {
      const categoryStorage = window.localStorage.getItem(name);
      categoryStorage
        ? this.$router.push({ name: "report", params: { category: name } })
        : this.$router.push({ name: "trivia", params: { category: name } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/colors.scss";

.card-manager {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-column-gap: 15px;

  @media (min-width: 375px) and (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 375px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
