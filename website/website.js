Markers = new Mongo.Collection('markers');

if (Meteor.isClient) {
  Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {

      var latLng = {lat: 43.472848, lng: -80.540266};
      
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latLng.lat, latLng.lng),
        map: map.instance,
        id: document._id,
        title: 'it works'
      });

       // Markers.insert({ lat: 43.472848, lng: -80.540266 });
        //Markers.update(marker.id, { set: { lat: 43.472848, lng: -80.540266 } });
        var places = ['Paris','Waterloo,ON', 'NYC, NY'];
        var geocoder = new google.maps.Geocoder();
          for(var i=0; i<places.length; i++){
            var address = places[i];
            //alert(places[i]);
            geocoder.geocode({'address': address}, function(results, status) {
              if (status === google.maps.GeocoderStatus.OK) {
              //  resultsMap.setCenter(results[0].geometry.location);
              console.log("it works");
                var marker = new google.maps.Marker({
                position: new google.maps.LatLng(latLng.lat, latLng.lng),
                map: resultsMap,
                id: document._id,
                title: 'it works'
              });
                var marker = new google.maps.Marker({
                    map: map.instance,
                    position: results[0].geometry.location,
                    title: address
                  });
                marker.push(marker);
              }
              else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
           });
         }
      /*var places = ['Paris, France','Waterloo,ON', 'NYC, NY'];
       var geocoder = new google.maps.Geocoder();
          for(var i=0; i<places.length; i++){
            var address = places[i];
            geocoder.geocode({'address': address}, function(results, status) {
              if (status === google.maps.GeocoderStatus.OK) {
              //  resultsMap.setCenter(results[0].geometry.location);
              console.log("it works");
                var marker = new google.maps.Marker({
                position: new google.maps.LatLng(latLng.lat, latLng.lng),
                map: map.instance,
                id: document._id,
                title: 'it works'
              });
                var marker = new google.maps.Marker({
                    map: map.instance,
                    position: results[0].geometry.location,
                    title: address
                  });
                //marker.push(marker);
              }
              else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
          }*/
        //setMapOnAll(map.instance);
          

        /*//STARTS HEREEEEEEEEEEEEEEEEEEEEE
        var places = ['Paris', 'Waterloo, ON', 'NYC, NY'];
        for(var i=0; i<places.length; i++){
          
          //var address = document.getElementById('address').value;
          var address=[]; 
          address.push(places[i]);
          geocoder.geocode({'address': address[i]}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              //resultsMap.setCenter(results[0].geometry.location);
              var marker = [];
              var new_marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                title: address[i]
              });
              marker.push(new_marker);
            }
            else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });            
        }*/
        //ENDS HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE

/*
      var geocoder = new google.maps.Geocoder();

      document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map.instance);
      });        
      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              title: address
            });
          }
          else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
*/
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
            Markers.update(marker.id, { set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
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
    var places = ["Paris,France","Waterloo,ON", 'NYC, NY'];
      console.log(places[0]);
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
