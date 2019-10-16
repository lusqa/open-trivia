<template>
  <div class="home">
    <h1 class="page-title">Categorias</h1>
    <div class="card-manager">
      <Card id="card" label="História" />
      <Card id="card" label="Geografia" />
      <Card id="card" label="Mitologia" />
      <Card id="card" label="Esportes" />
      <Card id="card" label="Política" />
      <Card id="card" label="Conhecimentos Gerais" />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "Home",
  components: {
    Card
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/colors.scss";

.home {
  padding: 16px;
}

.page-title {
  color: $ink;
}

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
