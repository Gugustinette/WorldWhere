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

        /*
        // Run clean logs job At 02:17 AM on Sunday (with cron schedule)
        { name: 'clean-logs', cron: '17 2 * * 0' }
        */
    ]
});

const breeRegions = new Bree({
    jobs: [
        // 'fetchRegionsData',

        // Run fetchRegionsData job every 30 seconds
        { name: 'fetchRegionsData', interval: `${TimeBetweenUpdate}s` },
    ]
});



breeCountries.start();

// breeRegions.start() offset
setTimeout(() => {
    breeRegions.start();
}, OffsetBeforeStart * 1000);
