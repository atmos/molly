describe 'Twitter'
  describe 'nfi'
    it 'supports matchers i can comprehend'
      var response = 'shit';

      response.should_eql('shit');
    end

    it 'supports matchers i can comprehend'
      var tweet = require('tweet');
      var ctx = {
        user:  {
          text:        'lolololo',
          tweet_id:    138972830,
          screen_name: 'atmos',
          full_name:   'Corey Donohoe',
          avatar_url:  'http://a1.twimg.com/profile_images/614260860/rsz_corey_donohoe.jpg_normal.jpeg',
          client_name: 'Gangster Vision',
          created_at:  'Wed Mar 10 21:13:42 +0000 2010',
          retweeted:    false,
          retweeted_by: 'corey'
        }
      }

      sys.p(ctx);

      var message = tweet.build(ctx)
      sys.p(message);
      var html    = message.render(process.stdio)
      html.should_eql('shit');
    end
  end
end

