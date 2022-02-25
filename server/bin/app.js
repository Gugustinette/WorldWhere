/**
 * app.js
 * Run the server
*/

// App Dependencies
const server = require('../server');

/**
 * Get port from environment
 */
const port = process.env.PORT || '3000';

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log(`API running on localhost:${port}`));
