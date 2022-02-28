<template>
  <header>
    <div class="img-background"></div>
    <div class="header-content">
      <div class="header-section">
        <div class="bar"></div>
        <div class="content">
          <h2>{{ this.title }}</h2>
          <p>{{ this.content }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "Title",
    },
    content: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed ut mollitia soluta eum necessitatibus ipsam ad, provident explicabo accusamus veniam deserunt consequatur unde nam illo obcaecati, voluptatibus amet iure animi, totam commodi? Repellendus at necessitatibus esse. Sunt deleniti, debitis veniam quae quaerat est nesciunt sint provident? Doloremque ratione adipisci quisquam nostrum vel sint nemo delectus veritatis libero sed magnam asperiores natus distinctio tenetur ipsum magni molestias commodi accusantium, reiciendis aliquam excepturi praesentium expedita! Velit, dolorem porro amet fugiat tenetur blanditiis!",
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header {
  width: 100vw;
  display: flex;
  flex-direction: column;

  .img-background {
    width: 100%;
    height: 140px;
    background: var(--primary);
    background-image: url("/ww3_logo.png");
    background-size: auto 200px;
    // Offset the image on Y axis by 30px
    background-position: center -20px;
    background-repeat: no-repeat;
  }

  .header-content {
    padding-left: var(--global-content-spacing);
    padding-right: var(--global-content-spacing);
    margin-bottom: 20px;

    .header-section {
      width: 100%;
      border-radius: var(--border-radius);
      overflow: hidden;
      background: var(--white);
      box-shadow: var(--box-shadow);
      transform: translateY(-40px);

      .bar {
        width: 100%;
        height: 10px;
        background: var(--green);
      }

      .content {
        display: flex;
        flex-direction: column;
        padding: 20px;
        align-items: flex-start;

        h2 {
          margin-bottom: 10px;
        }

        p {
          text-align: left;
        }
      }
    }
  }
}
</style>
