/**
 * Main file
*/


const TimeBetweenUpdate = 30; // seconds
const OffsetBeforeStart = TimeBetweenUpdate / 2;


// Import bree for schedule management
const Bree = require('bree');

const breeCountries = new Bree({
    jobs: [
        // 'fetchCountriesData',

        // Run fetchCountriesData and fetchRegionsData job every 30 seconds
        { name: 'fetchCountriesData', interval: `${TimeBetweenUpdate}s` },

        // Run summarizeCountryData job every day at 00:00:00
        { name: 'summarizeCountryData', cron: '0 0 * * *' },
    ]
});

const breeRegions = new Bree({
    jobs: [
        // 'fetchRegionsData',

        // Run fetchRegionsData job every 30 seconds
        { name: 'fetchRegionsData', interval: `${TimeBetweenUpdate}s` },

        // Run summarizeRegionData job every day at 00:05:00
        { name: 'summarizeRegionData', cron: '0 5 * * *' },
    ]
});



breeCountries.start();

// breeRegions.start() offset
setTimeout(() => {
    breeRegions.start();
}, OffsetBeforeStart * 1000);

