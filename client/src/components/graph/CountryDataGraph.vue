<template>
  <div class="graph-wrapper">
    <half-circle-spinner
      :animation-duration="1000"
      :size="60"
      :color="'var(--green)'"
      v-if="this.isLoading"
    />
    <div class="graph" v-bind:class="{ isVisible: !this.isLoading }">
      <canvas ref="graph"></canvas>
    </div>
  </div>
</template>

<script>
// Library
import Chart from "chart.js";

// Components
import { HalfCircleSpinner } from "epic-spinners";

export default {
  name: "CountryDataGraph",
  components: {
    HalfCircleSpinner,
  },
  props: {
    countryId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.$store
      .dispatch("getCountryData", this.countryId)
      .then((countryDataList) => {
        countryDataList = countryDataList.data;

        // Initialize the dataset
        this.datasets.push({
          label: "Pourcentage de popularité",
          data: countryDataList.map(
            (countryData) => countryData.percentageOfPopularity
          ),
          backgroundColor: "rgba(54,73,93,.5)",
          borderColor: "#36495d",
          borderWidth: 3,
        });
        this.labels = countryDataList.map((countryData) => {
          // Display hours and minutes
          var date = new Date(countryData.date);
          return (
            date.getHours() +
            ":" +
            (date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes())
          );
        });

        // Create the chart
        const planetChartData = {
          type: "line",
          data: {
            labels: this.labels,
            datasets: this.datasets,
          },
          options: this.options,
        };
        const ctx = this.$refs.graph;
        this.isLoading = false;
        this.chart = new Chart(ctx, planetChartData);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  data() {
    return {
      labels: [],
      datasets: [],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        lineTension: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 25,
              },
            },
          ],
        },
      },
      chart: null,
      isLoading: true,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.graph-wrapper {
  width: 100%;
  height: 400px;
  display: grid;
  place-items: center;

  .graph {
    width: 90%;
    height: 90%;
  }
}
.isVisible {
  display: unset;
}
</style>
