const AuthorizedUser = require('./AuthorizedUser');
const Endpoints = require('./Constants').Endpoints;
const request = require('snekfetch');

class Client {
  constructor(id, secret) {
    this.auth = { id, secret };
    this.users = new Map();
  }

  authorizeUser(token) {
    if (this.users.has(token)) return this.users.get(token);
    const user = new AuthorizedUser(token, this);
    this.users.set(token, user);
    return user;
  }

  async createSubscription(options = {}) {
    return request
      .post(Endpoints.Subscriptions)
      .field('client_id', this.auth.id)
      .field('client_secret', this.auth.secret)
      .field('object', options.object)
      .field('aspect', options.aspect)
      .field('verify_token', options.verify_token || options.verifyToken)
      .field('callback_url', options.callback_url || options.callbackURL)
      .then(r => r.body);
  }

  async listSubscriptions() {
    return request
      .get(`${Endpoints.Subscriptions}?client_id=${this.auth.id}&client_secret=${this.auth.secret}`)
      .then(r => r.body);
  }

  async deleteSubscription(options = {}) {
    const identifier = options.id ? `id=${options.id}` : `object=${options.object}`;
    return request
      .del(`${Endpoints.Subscriptions}?client_id=${this.auth.id}&client_secret=${this.auth.secret}&${identifier}`)
      .then(r => r.body);
  }
}

module.exports = Client;
