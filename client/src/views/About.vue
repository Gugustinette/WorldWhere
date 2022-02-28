<template>
  <div class="about">
    <Header title="À Propos" />
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
