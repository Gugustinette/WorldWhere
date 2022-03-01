<template>
  <div class="map-container">
    <div id="map" class="map" @click="clickOnMap"></div>
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
    <div class="details" v-if="SHOW_CountryDetails">
      <h2>{{ this.countryDetailed?.title }}</h2>
      <p>{{ this.countryDetailed?.percentageOfPopularity }}%</p>
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
      zoom: 4,
      location: [47.724544549099676, 31.442523333152366],
      MODE_Country: false,
      MODE_Region: false,
      SHOW_CountryDetails: false,
      map: null,
      countries: [],
      countriesLayer: null,
      cities: [],
      citiesLayer: null,
      countryDetailed: {},
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

    this.getDataByCities();
    this.getDataByCountries().then(() => {
      this.showCountries(this.countries);
    });
  },
  methods: {
    clickOnMap() {
      this.SHOW_CountryDetails = false;
    },
    showCountries() {
      if (this.MODE_Country) return;
      this.MODE_Country = true;
      this.MODE_Region = false;
      this.SHOW_CountryDetails = false;
      // Clear map content
      this.citiesLayer?.forEach((layer) => {
        this.map.removeLayer(layer);
      });
      this.citiesLayer = null;
      // Render countries
      this.addCountriesToMap(this.countries);
    },
    showRegions() {
      if (this.MODE_Region) return;
      this.MODE_Country = false;
      this.MODE_Region = true;
      this.SHOW_CountryDetails = false;
      // Clear map content
      this.countriesLayer?.clearLayers();
      // Render countries
      this.addCitiesToMap(this.cities);
    },
    getDataByCountries() {
      return new Promise((resolve, reject) => {
        // Get daya by countries
        this.$store
          .dispatch("getDataByCountries")
          .then((countries) => {
            countries = countries.data;
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

              this.countries = CountriesGeoJSON;
              resolve();
            });
          })
          .catch((error) => {
            console.log(error);
            reject();
          });
      });
    },
    addCountriesToMap(CountriesGeoJSON) {
      // Add countries to map
      this.countriesLayer = L.geoJSON(CountriesGeoJSON, {
        style: (feature) => {
          return {
            color: "#f5f5f5",
            weight: 1,
            fillColor: "#f55a42",
            fillOpacity: feature.popularity / 100 || 0,
          };
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: (e) => {
              e.target.setStyle({
                // Increase size by 10%
                weight: 2,
              });
            },
            mouseout: (e) => {
              e.target.setStyle({
                weight: 1,
              });
            },
            click: (e) => {
              // Gives country lat lng
              this.showCountryDetails(e.target.feature, e.latlng);
            },
          });
        },
      }).addTo(this.map);
    },
    showCountryDetails(country, latlng) {
      // Offset the latlng by 15 in longitude
      latlng = L.latLng(latlng.lat, latlng.lng + 15);
      // Move map camera to country
      this.map.setView(latlng, this.zoom);
      this.countryDetailed = {
        title: country.properties.ADMIN,
        percentageOfPopularity: Math.round(country.popularity, 2),
      };
      this.SHOW_CountryDetails = true;
    },
    getDataByCities() {
      // Get daya by countries
      this.$store
        .dispatch("getDataByCities")
        .then((cities) => {
          cities = cities.data;
          this.cities = cities;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addCitiesToMap(cities) {
      this.citiesLayer = [];
      // Render circle for each city
      cities.forEach((city) => {
        var circle = L.circle([city.city.latitude, city.city.longitude], {
          color: "#f55a42",
          fillColor: "#f55a42",
          fillOpacity: 0.3,
          radius: city.percentageOfPopularity * 1000,
        });
        this.citiesLayer.push(circle);
        circle.addTo(this.map);
      });
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

  .details {
    position: absolute;
    right: 10px;
    top: 10px;
    bottom: 10px;
    width: 300px;
    background: var(--white-transparent);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    z-index: 1000;
  }
}
</style>
