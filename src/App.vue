<template>
  <div id="app">
    <PageTemplate>
      <template slot="header">
        <Header />
      </template>
      <template slot="content">
        <router-view />
      </template>
    </PageTemplate>
    <portal-target name="root"></portal-target>
  </div>
</template>

<script>
import PageTemplate from "@/partials/PageTemplate";
import Header from "@/components/Header";
export default {
  name: "App",
  components: {
    PageTemplate,
    Header
  }
};
</script>

<style lang="scss">
@import "@/assets/stylesheets/fonts.scss";
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}
#app {
  height: 100%;
  font-family: "Avenir", sans-serif;
}
</style>
