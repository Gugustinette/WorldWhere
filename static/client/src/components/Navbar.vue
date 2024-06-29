<template>
  <nav>
    <div class="logo">
      <router-link to="/">
        <img src="/WorldWhere/ww3_logo_full_transparent.png" alt="Logo" />
      </router-link>
    </div>
    <div class="links">
      <router-link to="/">Accueil</router-link>
      <router-link to="/about">À propos</router-link>
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
  height: 60px;
  background: var(--primary);
  display: flex;
  flex-direction: row;
  align-items: center;

  .logo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    a {
      height: 55%;

      img {
        margin-left: 20px;
        height: 100%;
      }
    }
  }

  .links {
    height: 100%;
    display: none;
    flex-direction: row;
    margin-right: 20px;

    a {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: var(--font-on-primary);
      font-size: 1rem;
      font-weight: bold;
      padding: 0 1rem;
      transition: all 0.2s ease-in-out;
      white-space: nowrap;

      &:hover {
        color: var(--green);
      }

      &.router-link-active {
        color: var(--green);
      }
    }
  }
}
</style>
