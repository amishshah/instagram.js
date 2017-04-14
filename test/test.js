// Import instagram.js and authentication
const Instagram = require('../');
const auth = require('./auth.json');

// Create a client and make it aware of an authorized user
const client = new Instagram.Client(auth.clientID, auth.clientSecret);
const user = client.authorizeUser(auth.token);

async function test() {
  const response = await client.listSubscriptions();
  console.log(response);
}

test();