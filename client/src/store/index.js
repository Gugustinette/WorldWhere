import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {},
  mutations: {},
  actions: {
    getDataByCountries() {
      // Return popularity data by countries
      return new Promise((resolve, reject) => {
        axios
          .get(`/country/getByCountries`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getGeoJSON() {
      // Return geoJSON data for countries
      return new Promise((resolve, reject) => {
        // Find in public folder
        axios
          .get(`/static/countries.geojson`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getDataByCities() {
      // Return popularity data by cities
      return new Promise((resolve, reject) => {
        axios
          .get(`/region/getByCities`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  modules: {},
});
