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
      const url = `${endpoint}?${parameters}`;
      console.log(url);
      request[verb](url).end((e, r) => e ? reject(e) : resolve(r.body));
    });
  }

  get(endpoint, parameters) { return this._api('get', endpoint, parameters); }
  post(endpoint, parameters) { return this._api('post', endpoint, parameters); }
  put(endpoint, parameters) { return this._api('put', endpoint, parameters); }
  del(endpoint, parameters) { return this._api('del', endpoint, parameters); }

  // USERS endpoints
  getUser(id) { return this.get(Endpoints.Users.User(id)); }
  getUserMediaRecent(id, p) { return this.get(Endpoints.Users.Media.Recent(id), p); }
  getLikedMedia(p) { return this.get(Endpoints.Users.Media.Liked('self'), p); }
  searchUsers(p) { return this.get(Endpoints.Users.Search, p); }

  // RELATIONSHIPS endpoints
  getFollowing(p) { return this.get(Endpoints.Users.Following, p); }
  getFollowers(p) { return this.get(Endpoints.Users.Followers, p); }
  getRequestedFollowers(p) { return this.get(Endpoints.Users.RequestedFollowers, p); }
  getRelationship(id, p) { return this.get(Endpoints.Users.RelationshipWith(id), p); }
  modifyRelationship(id, p) { return this.post(Endpoints.Users.RelationshipWith(id), p); }
}

module.exports = InstagramClient;