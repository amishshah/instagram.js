const BaseURL = 'https://api.instagram.com/v1';
const Users = `${BaseURL}/users`;
const Media = `${BaseURL}/media`;
const Tags = `${BaseURL}/tags`;
const Locations = `${BaseURL}/locations`;
const Subscriptions = `${BaseURL}/subscriptions`;

const Endpoints = {
  Subscriptions,
  Users: {
    User: id => `${Users}/${id}`,
    Search: q => `${Users}/search`,
    Following: `${Users}/self/follows`,
    Followers: `${Users}/self/followed-by`,
    RequestedFollowers: `${Users}/self/requested-by`,
    RelationshipWith: id => `${Endpoints.Users.User(id)}/relationship`,
    Media: {
      Recent: id => `${Endpoints.Users.User(id)}/media/recent`,
      Liked: id => `${Endpoints.Users.User(id)}/media/liked`,
    }
  },
  Media: {
    Media: id => `${Media}/${id}`,
    MediaShortcode: shortcode => `${Media}/shortcode/${shortcode}`,
    Search: `${Media}/search`,
    Comments: id => `${Media}/${id}/comments`,
    Comment: id => `${Endpoints.Media.Comments}/${id}`,
    Likes: id => `${Endpoints.Media.Media(id)}/likes`
  },
  Tags: {
    Tag: name => `${Tags}/${name}`,
    RecentMedia: name => `${Tags}/${name}/media/recent`,
    Search: `${Tags}/search`,
  },
  Locations: {
    Location: id => `${Locations}/${id}`,
    RecentMedia: id => `${Locations}/${id}/media/recent`,
    Search: `${Locations}/search`,
  },
};

const afterRequest = function afterRequest(r) {
  const data = r.body;
  data.ratelimit = {
    limit: Number(r.headers['x-ratelimit-limit']),
    remaining: Number(r.headers['x-ratelimit-remaining']),
  };
  return data;
}

const defaultOptions = function defaultOptions(options = {}) {
  if (!options.cache) options.cache = 0;
  return options;
}

module.exports = {
  Endpoints,
  afterRequest,
  defaultOptions,
}