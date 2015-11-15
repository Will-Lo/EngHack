if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    var Twit = Meteor.npmRequire('twit');

    var T = new Twit({
        consumer_key:         'u6yehRPQ8WxjYIEjqPh6HEddS', // API key
        consumer_secret:      'VMZWApE5QeOAOteBTZ0M52To0QE7i7gfVpsSV6uvNMtdbrie5b', // API secret
        access_token:         '3253778391-C6P03h6RtSquYS0VhJUniUb4DjWcMy4ChlBkFol', 
        access_token_secret:  'JHtruRrwmTpENizhRfEyC8TkV9RiODwLBDMl8hSJfGztn'

    });
    T.get('search/tweets', { q: 'banana since:2011-11-11', count: 10 }, function(err, data, response) {
  console.log(data)
})
    //  search twitter for all tweets containing the word 'banana'
    //  since Nov. 11, 2011

  });
}

