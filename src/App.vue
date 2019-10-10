<template>
  <div id="app">
    <Header label="Teste Dev Frontend" />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style lang="scss"></style>
