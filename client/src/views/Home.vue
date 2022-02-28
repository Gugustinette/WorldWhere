<template>
  <div class="home">
    <Header />
    <div class="content">
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
    padding-left: 4%;
    padding-right: 4%;
  }
}
</style>
