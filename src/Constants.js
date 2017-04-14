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

module.exports = {
  Endpoints,
}