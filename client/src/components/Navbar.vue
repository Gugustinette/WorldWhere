<template>
  <nav>
    <div class="logo">
      <router-link to="/">
        <img src="https://via.placeholder.com/40" alt="Logo" />
      </router-link>
    </div>
    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
nav {
  width: 100%;
  height: 40px;
  background: var(--surface);
  display: flex;
  flex-direction: row;

  .logo {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .links {
    height: 100%;
    display: flex;
    flex-direction: row;

    a {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: var(--font);
      font-size: 1.2rem;
      font-weight: bold;
      padding: 0 1rem;
      transition: all 0.2s ease-in-out;

      &:hover {
        background: var(--primary);
        color: var(--background);
      }

      &.router-link-active {
        background: var(--primary);
        color: var(--background);
      }
    }
  }
}
</style>
