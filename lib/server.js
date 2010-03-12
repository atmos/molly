require.paths.unshift('lib/twitter', 'vendor', 'vendor/mu/lib', 'vendor/restler/lib')

var sys        = require('sys'),
    http       = require('http'),
    ws         = require("ws"),
    base64     = require('base64'),
    arrays     = require('arrays'),
    Mu         = require('mu'),
    tweet      = require('tweet'),
    connection = require('connection');

Mu.templateRoot = './lib/templates'

// array of websocket clients
var clients = [];

// Connection to Twitter's streaming API
var twitter = connection.establish(process.ENV['TWITTER_USER'], process.ENV['TWITTER_PASS']);

// Websocket TCP server
ws.createServer(function (websocket) {
  clients.push(websocket);

  websocket.addListener("connect", function (resource) {
    var ev = this;
    // emitted after handshake
    sys.debug("connected: " + resource);
    ev.emit('timeline')
    setInterval(function() {
      ev.emit('timeline');
    }, 35000);
  }).addListener("receive", function (payload) {
    var data = JSON.parse(payload);
    sys.debug(data);
    switch (data['type']) {
      case 'update':
        twitter.update(data['message']).addListener('complete', function(response_data) {
           sys.p(response_data);
        });
        break;
      case 'conversation':
        // handle fetching a conversation and sending it back into the dom given a data['tweet_id']
      case 'user_info':
        // handle fetching a user's info and sending it back into the dom given a data['screen_name']
      case 'recent':
        // handle fetching a user's recent tweets and sending it back into the dom given a data['screen_name']
      default:
        sys.debug("Unknown message received " + payload);
    }
  }).addListener("timeline", function () {
    twitter.home_timeline().addListener('complete', function(data) {
      if(data.error) {
        sys.puts(data.error);
      } else {
        data.reverse(function(tweet_data) {
          var msg = tweet.build(tweet_data);
          msg.render(websocket);
        });
        sys.puts("Done processing shit");
      }
    });
  }).addListener("close", function () {
    // emitted when server or client closes connection
    clients.remove(websocket);
    sys.debug("close");
  });
}).listen(8080);
