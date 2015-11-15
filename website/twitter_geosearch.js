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
    var cities=[];
    var tweets=[];

    //takes tweets from the twitter api and adds relevant information to lists
    T.get('search/tweets', { q: 'This tweet does not test broken code', count: 100}, function(err, data, response) {
        for (var i in data.statuses){
            if (data.statuses[i].place != null){
                cities.push(data.statuses[i].place.full_name);
                tweets.push(data.statuses[i].id);
                console.log(data.statuses[i].place.full_name);
            };
    }
})
  });
}

