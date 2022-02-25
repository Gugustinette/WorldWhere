<template>
  <div class="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
// Components
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
:root {
  --primary: #42b983;
  --secondary: #2c3e50;

  --background: #f5f5f5;
  --surface: rgb(206, 206, 206);

  --font: #333;
}

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--font);
}

a {
  color: var(--primary);
}
</style>
