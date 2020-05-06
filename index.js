const server = require('./server.js');
const colors = require('colors');
const path = require('path');

const PORT = 4503;
server.listen(PORT, () => {
  console.log(`\n* Server Running on http://localhost:${PORT} *\n`.bgGreen.black.bold);
});
