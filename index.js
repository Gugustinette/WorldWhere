/**
 * Main file
*/


// Import bree for schedule management
const Bree = require('bree');

const bree = new Bree({
    jobs: [
        // 'fetchCountriesData',
        // 'fetchRegionsData',

        // Run fetchCountriesData and fetchRegionsData job every minute
        { name: 'fetchCountriesData', interval: '30s' },
        { name: 'fetchRegionsData', interval: '30s' },

        /*
        // Run clean logs job At 02:17 AM on Sunday (with cron schedule)
        { name: 'clean-logs', cron: '17 2 * * 0' }
        */
    ]
});

bree.start();
