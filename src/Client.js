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
      request[verb](`${endpoint}?${parameters}`).end((e, r) => e ? reject(e) : resolve(r.body));
    });
  }

  get(endpoint, parameters) { return this._api('get', endpoint, parameters); }
  post(endpoint, parameters) { return this._api('post', endpoint, parameters); }
  put(endpoint, parameters) { return this._api('put', endpoint, parameters); }
  del(endpoint, parameters) { return this._api('del', endpoint, parameters); }

  // USERS endpoints
  getUser(id) {
    return this.get(Endpoints.Users.User(id));
  }

  getUserMediaRecent(id, parameters) {
    return this.get(Endpoints.Users.Media.Recent(id), parameters);
  }

  getSelfMediaLiked(parameters) {
    return this.get(Endpoints.Users.Media.Liked('self'), parameters);
  }

  searchUsers(parameters) {
    return this.get(Endpoints.Users.Search, parameters);
  }
}

module.exports = InstagramClient;