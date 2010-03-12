sys = require('sys');
Mu  = require('mu');

exports.build = function(tweet_data) {
  return new Tweet(tweet_data);
}

function Tweet(tweet_json) {
  this.json = tweet_json
}

Tweet.prototype.render = function(websocket) {
  Mu.render('tweet.html', this.ctx(), {}, function (err, output) {
    var buffer = '';
    if (err) { throw err; }

    output.addListener('data', function (c) { buffer += c; })
          .addListener('end',  function ()  { websocket.write(buffer); });
  });
}

Tweet.prototype.clean = function(tweet) {
  return this.hash(this.at(this.link(tweet)));
}

Tweet.prototype.link = function(t) {
  return t.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_:~%&\?\/.=]+[^:\.,\)\s*$]/ig, function(m) {
    return '<a href="' + m + '" target="_new">' + ((m.length > 120) ? m.substr(0, 120) + '...' : m) + '</a>';
  });
}

Tweet.prototype.at = function(t) {
  return t.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15})/g, function(m, m1, m2) {
    return m1 + '@<a href="http://twitter.com/' + m2 + '" target="_new">' + m2 + '</a>';
  });
}

Tweet.prototype.hash = function(t) {
  return t.replace(/(^|[^\w'"]+)\#([a-zA-Z0-9_]+)/g, function(m, m1, m2) {
    return m1 + '#<a href="http://search.twitter.com/search?q=%23' + m2 + '" target="_new">' + m2 + '</a>';
  });
}

Tweet.prototype.from_retweet = function(tweet_context) {
  return {
    text:         this.clean(tweet_context.text),
    tweet_id:     tweet_context.id,
    screen_name:  tweet_context.retweeted_status.user.screen_name,
    full_name:    tweet_context.retweeted_status.user.name,
    avatar_url:   tweet_context.retweeted_status.user.profile_image_url,
    client_name:  tweet_context.retweeted_status.source,
    created_at:   tweet_context.created_at,
    retweeted:    true,
    retweeted_by: tweet_context.user.screen_name
  }
}

Tweet.prototype.from_tweet = function(tweet_context) {
  return {
    text:         this.clean(tweet_context.text),
    tweet_id:     tweet_context.id,
    screen_name:  tweet_context.user.screen_name,
    full_name:    tweet_context.user.name,
    avatar_url:   tweet_context.user.profile_image_url,
    client_name:  tweet_context.source,
    created_at:   tweet_context.created_at,
    retweeted:    false
  }
}

Tweet.prototype.ctx = function() {
  if(this.json['retweeted_status'] !== undefined) {
    return this.from_retweet(this.json);
  } else {
    return this.from_tweet(this.json);
  }
}
