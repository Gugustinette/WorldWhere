<template>
  <div class="map-wrapper">
    <div class="loading-wrapper" v-if="this.isLoading">
      <half-circle-spinner
        :animation-duration="1000"
        :size="60"
        :color="'var(--green)'"
      />
    </div>
    <div class="map-container" v-bind:class="{ hidden: this.isLoading }">
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
      <div class="details" v-if="SHOW_Details">
        <h2>{{ this.elementDetailed?.title }}</h2>
        <p>
          {{ this.elementDetailed?.percentageOfPopularity }}% de popularité la
          dernière heure.<br />
          Voir tweets récents :
          <a
            v-bind:href="
              'https://twitter.com/search?q=' + this.elementDetailed?.title
            "
            >Twitter</a
          >
        </p>
      </div>
    </div>
    <p v-bind:class="{ hidden: this.isLoading }">
      Dernière mise à jour des données : {{ this.lastDataUpdate }}
    </p>
  </div>
</template>

<script>
// Library
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Components
import { HalfCircleSpinner } from "epic-spinners";

export default {
  name: "Map",
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      zoom: 4,
      location: [47.724544549099676, 31.442523333152366],
      MODE_Country: false,
      MODE_Region: false,
      SHOW_Details: false,
      map: null,
      countries: [],
      countriesLayer: null,
      cities: [],
      citiesLayer: null,
      elementDetailed: {},
      lastDataUpdate: "",
      lastDataUpdateCountry: "",
      lastDataUpdateRegion: "",
      isLoading: true,
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
      this.showCountries();
      this.isLoading = false;
    });
  },
  methods: {
    clickOnMap() {
      this.SHOW_Details = false;
    },
    // Convert date to be displayed
    convertDateToDisplay(date) {
      // Return date to format : "dd/mm/yyyy - hh:mm"
      // Handle time zone
      let dateTime = new Date(date);
      let hours = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let strTime = hours + ":" + minutes + " " + ampm;
      let day = dateTime.getDate();
      let month = dateTime.getMonth() + 1;
      let year = dateTime.getFullYear();
      return day + "/" + month + "/" + year + " - " + strTime;
    },
    // Show countries
    showCountries() {
      if (this.MODE_Country) return;
      this.MODE_Country = true;
      this.MODE_Region = false;
      this.SHOW_Details = false;
      // Clear map content
      this.citiesLayer?.forEach((layer) => {
        this.map.removeLayer(layer);
      });
      this.citiesLayer = null;
      // Render countries
      this.addCountriesToMap(this.countries);
      this.lastDataUpdate = this.lastDataUpdateCountry;
    },
    // Show regions
    showRegions() {
      if (this.MODE_Region) return;
      this.MODE_Country = false;
      this.MODE_Region = true;
      this.SHOW_Details = false;
      // Clear map content
      this.countriesLayer?.clearLayers();
      // Render countries
      this.addCitiesToMap(this.cities);
      this.lastDataUpdate = this.lastDataUpdateRegion;
    },
    // Load countries
    getDataByCountries() {
      return new Promise((resolve, reject) => {
        // Get daya by countries
        this.$store
          .dispatch("getDataByCountries")
          .then((countries) => {
            this.lastDataUpdateCountry = this.convertDateToDisplay(
              countries.lastDataUpdate
            );
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
                    feature.properties.ADMIN ===
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
    // Add countries to map
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
              this.zoom = 4;
              this.showElementDetails(
                e.target.feature.properties.ADMIN,
                e.target.feature.popularity,
                e.latlng
              );
            },
          });
        },
      }).addTo(this.map);
      this.lastDataUpdate = this.lastDataUpdateCountry;
    },
    // Show element details
    showElementDetails(elementName, popularity, latlng) {
      // Offset the latlng by 15 in longitude
      latlng = L.latLng(latlng.lat, latlng.lng);
      // Move map camera to the element location
      this.map.setView(latlng, this.zoom);
      this.elementDetailed = {
        title: elementName,
        percentageOfPopularity: Math.round(popularity, 2),
      };
      this.SHOW_Details = true;
    },
    // Load cities
    getDataByCities() {
      // Get daya by countries
      this.$store
        .dispatch("getDataByCities")
        .then((cities) => {
          this.lastDataUpdateRegion = this.convertDateToDisplay(
            cities.lastDataUpdate
          );
          cities = cities.data;
          this.cities = cities;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // Add cities to map
    addCitiesToMap(cities) {
      this.citiesLayer = [];
      // Render circle for each city
      cities.forEach((city) => {
        var circle = L.circle([city.city.latitude, city.city.longitude], {
          color: "#f55a42",
          fillColor: "#f55a42",
          fillOpacity: 0.3,
          radius: city.percentageOfPopularity * 1000 * 4,
        });
        this.citiesLayer.push(circle);
        circle.addEventListener("click", (e) => {
          this.zoom = 6;
          // Make the first letter of the city name uppercase
          this.showElementDetails(
            city.city.name.charAt(0).toUpperCase() + city.city.name.slice(1),
            city.percentageOfPopularity,
            e.latlng
          );
        });
        circle.addTo(this.map);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.map-wrapper {
  position: relative;
  width: 100%;
  min-height: 600px;

  .loading-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    z-index: 1;
  }

  p {
    margin-top: 2px;
    width: 100%;
    text-align: left;
    font-size: 0.8rem;
  }
}

.map-container {
  width: 100%;
  min-height: inherit;
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
    right: 30px;
    top: 30px;
    width: 250px;
    padding: 20px;
    background: var(--white-transparent);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    z-index: 1000;
  }
}
.hidden {
  visibility: hidden;
}
</style>
