<template>
  <div class="home">
    <Header />
    <div class="content">
      <h2>Carte des tendances</h2>
      <Map />
    </div>
  </div>
</template>

<script>
// Components
import Header from "@/components/Header";
import Map from "@/components/map/Map";

export default {
  name: "Home",
  components: {
    Map,
    Header,
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100%;

  .content {
    padding-left: var(--global-content-spacing);
    padding-right: var(--global-content-spacing);
    margin-bottom: 100px;

    h2 {
      text-align: left;
      margin-bottom: 10px;
    }
  }
}
</style>
