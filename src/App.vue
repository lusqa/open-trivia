<template>
  <div id="app">
    <Header id="header" label="Teste Dev Frontend" />
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

<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}
#app {
  font-family: "Avenir", sans-serif;
}
</style>
