const Instagram = require('../');
const client = new Instagram.Client(require('./auth.json').token);

client.getUserMediaRecent('self')
  .then(console.log, console.log);