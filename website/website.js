
Markers = new Mongo.Collection('markers');

if (Meteor.isClient) {
  Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {

      var latLng = {lat: 43.472848, lng: -80.540266};

      var places = ['Paris','NYC','Waterloo'];
        var geocoder = new google.maps.Geocoder();
        var name = []; 
            
          for(var i=0; i<places.length; i++){
            var address = places[i];
            name.push(places[i]);

            //alert(places[i]);
            alert(name[i]);
            (function(i) {
              geocoder.geocode({'address': address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                  //  resultsMap.setCenter(results[0].geometry.location);
                  var myLatLng = results[0].geometry.location;
                  var marker = new google.maps.Marker({
                    map: map.instance,
                    position: results[0].geometry.location,
                    title: name[i]
                  });
                  markers.push(marker);
                }
                else {
                alert('Geocode was not successful for the following reason: ' + status);
                }
             })
            })(i);
          }
      google.maps.event.addListener(map.instance, 'click', function(event) {
        //Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      });

      var markers = {};

      Markers.find().observe({
        added: function (document) {
          var marker = new google.maps.Marker({
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(document.lat, document.lng),
            map: map.instance,
            id: document._id
          });

          google.maps.event.addListener(marker, 'dragend', function(event) {
            Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
          });

          markers[document._id] = marker;
        },
        changed: function (newDocument, oldDocument) {
          markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
        },
        removed: function (oldDocument) {
          markers[oldDocument._id].setMap(null);
          google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
          delete markers[oldDocument._id];
        }
      });
    });
  });

  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.map.helpers({
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(43.472848, -80.540266),
          zoom: 8
        };
      }
    }
  });
}
