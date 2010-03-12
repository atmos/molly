describe 'Mu'
  describe 'render'
    it 'should add several products'
      var sys      = require('sys'),
          mu       = require('mu');
      var response = 'shit';

      ctx = {
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

      mu.templateRoot = '../templates';

      //sys.p(ctx);
      //sys.p(mu);

      var result = mu.compile('tweet.html', ctx, {}, function (err, output) {
        sys.puts('zomg');
        if (err) { throw err; }
        var buffer = 'lars';

        output.addListener('data', function (c) { buffer += c; })
              .addListener('end',  function ( ) { sys.puts(buffer); });

      });
    end
  end
end
