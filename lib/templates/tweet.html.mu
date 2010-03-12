<div class='tweet' style='display:none'>
  <div class='grid_1'>
    <div class='thumb'>
      <a href='http://twitter.com/{{screen_name}}' target='_new'>
        <img alt='{{full_name}}' class='photo' height='48' src='{{avatar_url}}' width='48' />
      </a>
      <a class='fullname' href='http://twitter.com/{{screen_name}}' target='_new'>
        <h3>{{full_name}}</h3>
      </a>
    </div>
  </div>

  <div>
    <div class='tweet_text'>
      <p>{{{text}}}</p>
    </div>
    <div class='tweet_meta'>
      {{#retweeted}}
        <span>
          <a class="retweet" href='http://www.twitter.com/{{retweeted_by}}' target='_blank'>RT by {{retweeted_by}}</a>
        </span>
      {{/retweeted}}
      <span class="timestamp" data="{timestamp:'{{created_at}}'}">
        <a href='http://www.twitter.com/{{screen_name}}/status/{{tweet_id}}' target='_blank'>at {{created_at}}</a>
      </span>
      <span>via {{{client_name}}}</span>
    </div>
  </div>
</div>
