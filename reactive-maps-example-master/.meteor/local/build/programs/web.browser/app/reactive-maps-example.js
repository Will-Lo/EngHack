(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// reactive-maps-example.js                                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Markers = new Mongo.Collection('markers');                             // 1
                                                                       //
if (Meteor.isClient) {                                                 // 3
  Template.map.onCreated(function () {                                 // 4
    GoogleMaps.ready('map', function (map) {                           // 5
      google.maps.event.addListener(map.instance, 'click', function (event) {
        Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      });                                                              //
                                                                       //
      var markers = {};                                                // 10
                                                                       //
      Markers.find().observe({                                         // 12
        added: function (document) {                                   // 13
          var marker = new google.maps.Marker({                        // 14
            draggable: true,                                           // 15
            animation: google.maps.Animation.DROP,                     // 16
            position: new google.maps.LatLng(document.lat, document.lng),
            map: map.instance,                                         // 18
            id: document._id                                           // 19
          });                                                          //
                                                                       //
          google.maps.event.addListener(marker, 'dragend', function (event) {
            Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() } });
          });                                                          //
                                                                       //
          markers[document._id] = marker;                              // 26
        },                                                             //
        changed: function (newDocument, oldDocument) {                 // 28
          markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
        },                                                             //
        removed: function (oldDocument) {                              // 31
          markers[oldDocument._id].setMap(null);                       // 32
          google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
          delete markers[oldDocument._id];                             // 34
        }                                                              //
      });                                                              //
    });                                                                //
  });                                                                  //
                                                                       //
  Meteor.startup(function () {                                         // 40
    GoogleMaps.load();                                                 // 41
  });                                                                  //
                                                                       //
  Template.map.helpers({                                               // 44
    mapOptions: function () {                                          // 45
      if (GoogleMaps.loaded()) {                                       // 46
        return {                                                       // 47
          center: new google.maps.LatLng(-37.8136, 144.9631),          // 48
          zoom: 8                                                      // 49
        };                                                             //
      }                                                                //
    }                                                                  //
  });                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
