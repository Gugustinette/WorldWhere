<template>
  <div class="home">
    <Header
      title="Statistiques et visualisation des données"
      content="WorldWhere est un outil open source permettant la visualisation des données en lien avec le conflit actuel entre l'Ukraine et la Russie. Les données utilisées proviennent de Twitter, pour plus d'informations vous pouvez suivre <a href='https://twitter.com/gugustinette'>@gugustinette</a> sur Twitter."
    />
    <div class="content">
      <h2>Carte des tendances</h2>
      <Map />
      <h2>Graphiques (dernières 24 heures)</h2>
      <div class="graphs">
        <div class="graph">
          <h3>Popularité Ukraine</h3>
          <CountryDataGraph countryId="621e0a8122cc6647bdd1e6a1" />
        </div>
        <div class="graph">
          <h3>Popularité Russie</h3>
          <CountryDataGraph countryId="621e0a8122cc6647bdd1e69f" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Map from "@/components/map/Map";
import CountryDataGraph from "@/components/graph/CountryDataGraph";

export default {
  name: "Home",
  components: {
    Map,
    Header,
    Footer,
    CountryDataGraph,
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
      margin-top: 40px;
      text-align: left;
      margin-bottom: 10px;
    }

    .graphs {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;

      .graph {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
      }
    }
  }
}

// Screen larger than 1000px
@media (min-width: 1000px) {
  .home {
    .content {
      .graphs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
      }
    }
  }
}
</style>
