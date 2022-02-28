<template>
  <div class="map-container">
    <div id="map" class="map"></div>
    <div class="switch-mode">
      <div
        class="option"
        v-bind:class="{ active: this.MODE_Country }"
        @click="showCountries"
      >
        Pays
      </div>
      <div
        class="option"
        v-bind:class="{ active: this.MODE_Region }"
        @click="showRegions"
      >
        Régions
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "Map",
  data() {
    return {
      zoom: 2,
      location: [51.505, -0.09],
      MODE_Country: true,
      MODE_Region: false,
      map: null,
    };
  },
  mounted() {
    // Leaflet setup
    this.map = L.map("map").setView(this.location);
    this.map.setZoom(this.zoom);

    // Base tiles
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 20,
        subdomains: "abcd",
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(this.map);

    this.getDataByCountries();
  },
  methods: {
    showCountries() {
      this.MODE_Country = true;
      this.MODE_Region = false;
    },
    showRegions() {
      this.MODE_Country = false;
      this.MODE_Region = true;
    },
    getDataByCountries() {
      // Get daya by countries
      this.$store
        .dispatch("getDataByCountries")
        .then((countries) => {
          countries = countries.data;
          console.log(countries);
          // Get public GeoJSON data
          this.$store.dispatch("getGeoJSON").then((geoJSON) => {
            // Remove unecessary data
            var CountriesGeoJSON = {
              type: "FeatureCollection",
              features: [],
            };

            countries.forEach((country) => {
              var countryGeoJSON = geoJSON.features.find(
                (feature) =>
                  feature.properties.ADMIN.toLowerCase() ===
                  country.country.name
              );
              if (countryGeoJSON) {
                countryGeoJSON.popularity = country.percentageOfPopularity;
                CountriesGeoJSON.features.push(countryGeoJSON);
              }
            });

            this.addCountriesToMap(CountriesGeoJSON);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addCountriesToMap(CountriesGeoJSON) {
      // Add countries to map
      L.geoJSON(CountriesGeoJSON, {
        style: (feature) => {
          return {
            color: "#fff",
            weight: 1,
            fillColor: "#f55a42",
            fillOpacity: feature.popularity / 100 || 0,
          };
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            /*
            mouseover: (e) => {
              e.target.setStyle({
                fillOpacity: 0.8,
              });
            },
            mouseout: (e) => {
              e.target.setStyle({
                fillOpacity: 0.5,
              });
            },
            */
            click: (e) => {
              this.showCountryDetails(e.target.feature);
            },
          });
        },
      }).addTo(this.map);
    },
    showCountryDetails(country) {
      console.log(country);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.map-container {
  width: 100%;
  min-height: 600px;
  position: relative;

  .map {
    width: 100%;
    min-height: 600px;
  }

  .switch-mode {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    flex-direction: row;
    z-index: 1000;
    background: var(--white);
    border-radius: 30px;
    padding: 6px 10px;
    column-gap: 15px;

    .option {
      height: 20px;
      display: grid;
      place-content: center;
      border: solid 2px var(--primary);
      border-radius: 20px;
      padding-left: 10px;
      padding-right: 10px;
      font-weight: 500;
      cursor: pointer;

      &.active {
        background: var(--green);
        border-color: var(--green);
        color: var(--font-on-primary);
      }
    }
  }
}
</style>
