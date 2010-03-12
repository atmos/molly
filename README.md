molly
=====

molly is a [websocket][websocket] based [twitter][twitter] client that runs on [node.js][nodejs].  It uses [mu][mu] for [mustache][mustache] templating.

There's no oauth support so you run a local daemon and the html files connect to it.

Running
=======

    % export TWITTER_USER=fakeatmos
    % export TWITTER_PASS=fakeatmospass
    % bin/server

Features
========
* Display your Home Timeline
* Tweet messages for you

Testing
=======

There are jspec tests but I really don't know what I'm doing.

    % bin/spec

Requires
========
* node.js 0.1.31

TODO
====

* theme it
* more robust tests
* timeline should use a since_id for fetching changes
* rewrite the timestamps on tweets with browser js for 'about 1 hour ago' style
* handle/expand conversations
* fetch user info
* fetch user recent tweets
* tweets rendered out of order on initial page load
* OAuth Authentication

[websocket]: http://dev.w3.org/html5/websockets/
[twitter]: http://twitter.com
[mu]: http://github.com/raycmorgan/Mu
[mustache]: http://defunkt.github.com/mustache/
[nodejs]: http://nodejs.org
