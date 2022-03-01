<template>
  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <h2>L'équipe</h2>
        <p>
          Le site a été développé par
          <a href="https://gugustinette.com">Augustin MERCIER "Gugustinette"</a
          >. Le design et les maquettes ont été réalisées par
          <a href="https://sallt.fr">Jason MOULIN</a>.
        </p>
      </div>
      <div class="footer-section">
        <h2>Les données</h2>
        <p>
          Les données utilisées sont issues de
          <a href="https://twitter.com">Twitter</a>, via l'<a
            href="https://developer.twitter.com/en"
            >API</a
          >
          mise à disposition. Le serveur récupère les données à intervalle
          régulier, et les données sont mises à jour toutes les heures sur le
          site.
          <br />
          La carte des tendances est crée à partir du pourcentage de
          "popularité" des pays ou villes dans les tweets récupérés.
        </p>
      </div>
      <div class="social-medias">
        <a href="https://github.com/gugustinette/worldwhere">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"
            />
          </svg>
        </a>
        <a href="https://twitter.com/gugustinette">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-.139 9.237c.209 4.617-3.234 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.08-4.03 3.199-4.03.943 0 1.797.398 2.395 1.037.748-.147 1.451-.42 2.086-.796-.246.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.439.656-.996 1.234-1.639 1.697z"
            />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
footer {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--primary);
  min-height: 300px;

  .footer-content {
    padding-left: var(--global-content-spacing);
    padding-right: var(--global-content-spacing);
    margin-bottom: 20px;

    .footer-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 20px;
      align-items: flex-start;

      h2 {
        color: var(--font-on-primary);
        margin-bottom: 10px;
      }

      p {
        color: var(--font-on-primary);
        text-align: left;
      }
    }

    .social-medias {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: right;
      column-gap: 8px;

      a {
        height: 35px;
        width: 35px;
        padding: 5px;
        display: grid;
        place-items: center;

        & svg {
          height: 100%;
          width: 100%;
          fill: var(--font-on-primary);
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
