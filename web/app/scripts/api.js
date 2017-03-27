'use strict';

var m = require('mithril');

var Api = {};

// Global API parameters

// The domain name of the API server, dynamically computed from the current app
// domain name so that the API can work locally and on production without
// modification to this source
Api.hostname = 'Api.' + window.location.hostname;
// The secret key used to authenticate a user signing in
Api.secretKey = 'j9Y6iEbYDBCZjebCGd1Q4NvZop1ugLBLf1l5xEqE';
// The access token generated by the server after the user has signed in; used
// to make subsequent requests
Api.accessToken = null;

// Return true if the user is currently signed in; otherwise, return false
Api.isAuthenticated = function () {
  return (Api.accessToken !== null);
};

// Authenticate the user via the given API token (received from the server)
Api.authenticate = function (accessToken) {
  Api.accessToken = accessToken;
};

// Make any type of HTTP request
Api.request = function (method, args) {
  m.request({
    method: method,
    url: Api.hostname + args.path,
    data: args.data,
    // Only send the Authorization header once the user has signed in (i.e. when
    // the server sends an access token to the user for their current session)
    headers: Api.isAuthenticated() ? {
      'Authorization': Api.accessToken
    } : null
  })
  .then(args.onsuccess)
  .catch(args.onerror);
};

// Send a GET request to the server (i.e. retrieve existing entries)
Api.get = function (args) {
  Api.request('GET', args);
};

// Send a POST request to the server (i.e. update existing entries)
Api.post = function (args) {
  Api.request('POST', args);
};

// Send a PUT request to the server (i.e. insert new entries)
Api.put = function (args) {
  Api.request('PUT', args);
};

// Send a DELETE request to the server (i.e. delete new entries)
Api.delete = function (args) {
  Api.request('DELETE', args);
};

module.exports = Api;
