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
  --primary: #2f3542;
  --white: #ffffff;

  --green: #2ed573;
  --red: #e74c3c;
  --violet: #7b61ff;

  --font-on-primary: #ffffff;
  --font-on-background: #2f3542;

  --border-radius: 6px;
  --box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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
