/**
 * Main file
*/


// Import bree for schedule management
const Bree = require('bree');

const bree = new Bree({
    jobs: [
        // Run fetchData job every minute
        { name: 'fetchData', interval: '5s' },

        /*
        // Run clean logs job At 02:17 AM on Sunday (with cron schedule)
        { name: 'clean-logs', cron: '17 2 * * 0' }
        */
    ]
});
  
bree.start();
