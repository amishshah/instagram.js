const Endpoints = require('./Constants').Endpoints;
const request = require('snekfetch');

class AuthorizedUser {
  constructor(token, client) {
    this.client = client;
    this.token = token;
  }

  _api(verb, endpoint, parameters = {}) {
    parameters.access_token = this.token;
    parameters = Object.entries(parameters).map(pair => `${pair[0]}=${encodeURIComponent(pair[1])}`).join('&');
    const url = `${endpoint}?${parameters}`;
    return request[verb](url).then(r => r.body);
  }

  async get(endpoint, parameters) { return this._api('get', endpoint, parameters); }
  async post(endpoint, parameters) { return this._api('post', endpoint, parameters); }
  async put(endpoint, parameters) { return this._api('put', endpoint, parameters); }
  async del(endpoint, parameters) { return this._api('del', endpoint, parameters); }

  // USERS endpoints
  async getUser(id) { return this.get(Endpoints.Users.User(id)); }
  async getMediaRecent(id, p) { return this.get(Endpoints.Users.Media.Recent(id), p); }
  async getLikedMedia(p) { return this.get(Endpoints.Users.Media.Liked('self'), p); }
  async searchUsers(p) { return this.get(Endpoints.Users.Search, p); }

  // RELATIONSHIPS endpoints
  async getFollowing(p) { return this.get(Endpoints.Users.Following, p); }
  async getFollowers(p) { return this.get(Endpoints.Users.Followers, p); }
  async getRequestedFollowers(p) { return this.get(Endpoints.Users.RequestedFollowers, p); }
  async getRelationship(id, p) { return this.get(Endpoints.Users.RelationshipWith(id), p); }
  async modifyRelationship(id, p) { return this.post(Endpoints.Users.RelationshipWith(id), p); }

  // MEDIA endpoints
  async getMedia(id, p) { return this.get(Endpoints.Media.Media(id), p); }
  async getMediaByShortcode(code, p) { return this.get(Endpoints.Media.MediaShortcode(code), p); }
  async searchMedia(p) { return this.get(Endpoints.Media.Search, p); }

  // COMMENT endpoints
  async getComments(id, p) { return this.get(Endpoints.Media.Comments(id), p); }
  async createComment(id, p) { return this.post(Endpoints.Media.Comments(id), p); }
  async deleteComment(id, p) { return this.del(Endpoints.Media.Comment(id), p); }

  // LIKES endpoints
  async getMediaLikes(id, p) { return this.get(Endpoints.Media.Likes(id), p); }
  async likeMedia(id, p) { return this.post(Endpoints.Media.Likes(id), p); }
  async unlikeMedia(id, p) { return this.del(Endpoints.Media.Likes(id), p); }

  // TAGS endpoints
  async getHashtag(name, p) { return this.get(Endpoints.Tags.Tag(name), p); }
  async getRecentMediaByHashtag(name, p) { return this.get(Endpoints.Tags.RecentMedia(name), p); }
  async searchHashtags(p) { return this.get(Endpoints.Tags.Search, p); }

  // LOCATIONS endpoints
  async getLocation(id, p) { return this.get(Endpoints.Locations.Location(id), p); }
  async getRecentMediaByLocation(id, p) { return this.get(Endpoints.Locations.RecentMedia(id), p); }
  async searchLocations(p) { return this.get(Endpoints.Locations.Search, p); }
}

module.exports = AuthorizedUser;