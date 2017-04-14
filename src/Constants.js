const BaseURL = 'https://api.instagram.com/v1';
const Users = `${BaseURL}/users`;

const Endpoints = {
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
};

module.exports = {
  Endpoints,
}