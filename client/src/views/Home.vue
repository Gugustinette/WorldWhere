<template>
  <div class="home">
    <Header
      title="Statistiques et visualisation des données"
      content="WorldWhere est un outil open source permettant la visualisation des données en lien avec le conflit actuel entre l'Ukraine et la Russie. Les données utilisées proviennent de Twitter, pour plus d'informations vous pouvez suivre <a href='https://twitter.com/gugustinette'>@gugustinette</a> sur Twitter."
    />
    <div class="content">
      <h2>Carte des tendances</h2>
      <Map />
    </div>
    <Footer />
  </div>
</template>

<script>
// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Map from "@/components/map/Map";

export default {
  name: "Home",
  components: {
    Map,
    Header,
    Footer,
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
