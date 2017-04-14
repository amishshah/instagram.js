const Instagram = require('../');
const client = new Instagram.Client(require('./auth.json').token);

async function test() {
  const response = await client.getMediaRecent('self');
  console.log(response);
}

test();