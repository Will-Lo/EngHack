if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });
}

//width and length of the map
.map-container {
  width: 800px;
  max-width: 100%;
  height: 500px;
}

Template.body.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(43.472848, -80.540266),
        zoom: 8
      };
    }
  }
});

Template.body.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      //set the position to the list of tweets
      position: map.options.center,
      map: map.instance
    });
  });
});

/*map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 8
});*/