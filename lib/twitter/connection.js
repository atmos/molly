rest = require('restler');

Twitter = rest.service(function(u, p) {
  this.defaults.username = u;
  this.defaults.password = p;
}, {
  baseURL: 'http://api.twitter.com'
}, {
  home_timeline: function() {
    return this.get('/1/statuses/home_timeline.json', { data: { } });
  },
  update: function(message) {
    return this.post('/statuses/update.json', { data: { status: message } });
  },
});

exports.establish = function(user, pass) {
  return new Twitter(user, pass);
}
