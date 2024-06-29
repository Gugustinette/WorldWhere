<template>
  <div class="about">
    <Header
      title="À Propos"
      content="WorldWhere est un outil open source permettant la visualisation des données en lien avec le conflit actuel entre l'Ukraine et la Russie. Les données utilisées proviennent de Twitter, pour plus d'informations vous pouvez suivre <a href='https://twitter.com/gugustinette'>@gugustinette</a> sur Twitter."
    />
  </div>
</template>

<script>
// Components
import Header from "@/components/Header";

export default {
  name: "Home",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
