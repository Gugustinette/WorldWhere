import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {},
  mutations: {},
  actions: {
    getDataByCountries() {
      // Return popularity data by countries
      return new Promise((resolve) => {
        const response = [
          {
            country:{
              name: "Ukraine",
            },
            percentageOfPopularity: 58,
          },
          {
            country:{
              name: "Russia",
            },
            percentageOfPopularity: 31,
          },
          {
            country:{
              name: "France",
            },
            percentageOfPopularity: 8,
          },
          {
            country:{
              name: "Romania",
            },
            percentageOfPopularity: 1,
          },
          {
            country:{
              name: "Poland",
            },
            percentageOfPopularity: 2,
          },
        ];
        resolve({
          data: response,
          lastDataUpdate: new Date(),
        });
      });
    },
    getCountryData(context, countryId) {
      // If id is 621e0a8122cc6647bdd1e6a1, then return data for Ukraine
      // Else if id is 621e0a8122cc6647bdd1e69f, then return data for Russia
      if (countryId === "621e0a8122cc6647bdd1e6a1") {
        return new Promise((resolve) => {
          const response = [
            {
              country: {
                name: "Ukraine",
              },
              percentageOfPopularity: 40,
              count: 20,
              date: new Date() - 3600000 * 6,
            },
            {
              country: {
                name: "Ukraine",
              },
              percentageOfPopularity: 43,
              count: 35,
              date: new Date() - 3600000 * 5,
            },
            {
              country: {
                name: "Ukraine",
              },
              percentageOfPopularity: 38,
              count: 10,
              date: new Date() - 3600000 * 4,
            },
            {
              country: {
                name: "Ukraine",
              },
              percentageOfPopularity: 45,
              count: 50,
              date: new Date() - 3600000 * 3,
            },
            {
              country: {
                name: "Ukraine",
              },
              percentageOfPopularity: 60,
              count: 89,
              date: new Date() - 3600000 * 2,
            },
            {
              country: {
                name: "Ukraine",
              },
              percentageOfPopularity: 54,
              count: 97,
              date: new Date() - 3600000 * 1,
            },
            {
              country: {
                name: "Ukraine",
              },
              percentageOfPopularity: 55,
              count: 24,
              date: new Date() - 3600000,
            },
          ];
          resolve(
           {
            data: response,
           },
          );
        });
      }
      if (countryId === "621e0a8122cc6647bdd1e69f") {
        return new Promise((resolve) => {
          // Every hour data
          const response = [
            {
              country: {
                name: "Russia",
              },
              percentageOfPopularity: 45,
              count: 36,
              date: new Date() - 3600000 * 6,
            },
            {
              country: {
                name: "Russia",
              },
              percentageOfPopularity: 42,
              count: 24,
              date: new Date() - 3600000 * 5,
            },
            {
              country: {
                name: "Russia",
              },
              percentageOfPopularity: 53,
              count: 56,
              date: new Date() - 3600000 * 4,
            },
            {
              country: {
                name: "Russia",
              },
              percentageOfPopularity: 35,
             count: 29,
              date: new Date() - 3600000 * 3,
            },
            {
              country: {
                name: "Russia",
              },
              percentageOfPopularity: 19,
              count: 22,
              date: new Date() - 3600000 * 2,
            },
            {
              country: {
                name: "Russia",
              },
              percentageOfPopularity: 12,
              count: 18,
              date: new Date() - 3600000 * 1,
            },
            {
              country: {
                name: "Russia",
              },
              percentageOfPopularity: 25,
              count: 29,
              date: new Date() - 3600000,
            },
          ];
          resolve({
            data: response,
          });
        });
      }
    },
    getGeoJSON() {
      // Return geoJSON data for countries
      return new Promise((resolve, reject) => {
        // Find in public folder
        axios
          .get(`/data/countries.geojson`)
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
      return new Promise((resolve) => {
        const response = [
          {
            city: {
              name: "Kiev",
              latitude: 50.45,
              longitude: 30.73,
            },
            percentageOfPopularity: 35,
            count: 90,
          },
          {
            city: {
              name: "Mykolayiv",
              latitude: 46.96591,
              longitude: 31.9974,
            },
            percentageOfPopularity: 2,
            count: 4,
          },
          {
            city: {
              name: "Kharkiv",
              latitude: 49.9933,
              longitude: 36.230383,
            },
            percentageOfPopularity: 15,
            count: 40,
          },
          {
            city: {
              name: "Mykolayiv",
              latitude: 46.96591,
              longitude: 31.9974,
            },
            percentageOfPopularity: 2,
            count: 4,
          },
          {
            city: {
              name: "Lviv",
              latitude: 49.59,
              longitude: 24.03,
            },
            percentageOfPopularity: 8,
            count: 26,
          },
          {
            city: {
              name: "Moscow",
              latitude: 55.75,
              longitude: 37.57,
            },
            percentageOfPopularity: 18,
            count: 88,
          }
        ];
        resolve({
          data: response,
          lastDataUpdate: new Date(),
        });
      });
    },
  },
  modules: {},
});
