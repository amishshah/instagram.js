const Endpoints = require('./Constants').Endpoints;
const request = require('snekfetch');

class InstagramClient {
  constructor(token) {
    this.token = token;
  }

  _api(verb, endpoint, parameters = {}) {
    return new Promise((resolve, reject) => {
      parameters.access_token = this.token;
      parameters = Object.entries(parameters).map(pair => `${pair[0]}=${encodeURIComponent(pair[1])}`).join('&');
      request[verb](`${endpoint}?${parameters}`).end((e, r) => e ? reject(e) : resolve(r.body.data));
    });
  }

  // USERS endpoints
  getUser(id) {
    return this._api('get', Endpoints.Users.User(id));
  }

  getUserMediaRecent(id, parameters) {
    return this._api('get', Endpoints.Users.Media.Recent(id), parameters);
  }

  getSelfMediaLiked(parameters) {
    return this._api('get', Endpoints.Users.Media.Liked('self'), parameters);
  }

  searchUsers(parameters) {
    return this._api('get', Endpoints.Users.Search, parameters);
  }
}

module.exports = InstagramClient;