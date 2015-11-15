//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Template = Package.templating.Template;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var _ = Package.underscore._;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var GoogleMaps;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages/dburles_google-maps/packages/dburles_google-maps.js                                       //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
(function () {                                                                                        // 1
                                                                                                      // 2
/////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                             //     // 4
// packages/dburles:google-maps/template.google-maps.js                                        //     // 5
//                                                                                             //     // 6
/////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                               //     // 8
                                                                                               // 1   // 9
Template.__checkName("googleMap");                                                             // 2   // 10
Template["googleMap"] = new Template("Template.googleMap", (function() {                       // 3   // 11
  var view = this;                                                                             // 4   // 12
  return HTML.Raw('<div class="map-canvas" style="width: 100%; height: 100%"></div>');         // 5   // 13
}));                                                                                           // 6   // 14
                                                                                               // 7   // 15
/////////////////////////////////////////////////////////////////////////////////////////////////     // 16
                                                                                                      // 17
}).call(this);                                                                                        // 18
                                                                                                      // 19
                                                                                                      // 20
                                                                                                      // 21
                                                                                                      // 22
                                                                                                      // 23
                                                                                                      // 24
(function () {                                                                                        // 25
                                                                                                      // 26
/////////////////////////////////////////////////////////////////////////////////////////////////     // 27
//                                                                                             //     // 28
// packages/dburles:google-maps/google-maps.js                                                 //     // 29
//                                                                                             //     // 30
/////////////////////////////////////////////////////////////////////////////////////////////////     // 31
                                                                                               //     // 32
var supportedTypes = ['Map', 'StreetViewPanorama'];                                            // 1   // 33
                                                                                               // 2   // 34
GoogleMaps = {                                                                                 // 3   // 35
  load: _.once(function(options) {                                                             // 4   // 36
    options = _.extend({ v: '3.exp' }, options);                                               // 5   // 37
    var params = _.map(options, function(value, key) { return key + '=' + value; }).join('&'); // 6   // 38
    var script = document.createElement('script');                                             // 7   // 39
    script.type = 'text/javascript';                                                           // 8   // 40
    script.src = 'https://maps.googleapis.com/maps/api/js?' + params +                         // 9   // 41
      '&callback=GoogleMaps.initialize';                                                       // 10  // 42
                                                                                               // 11  // 43
    document.body.appendChild(script);                                                         // 12  // 44
  }),                                                                                          // 13  // 45
  utilityLibraries: [],                                                                        // 14  // 46
  loadUtilityLibrary: function(path) {                                                         // 15  // 47
    this.utilityLibraries.push(path);                                                          // 16  // 48
  },                                                                                           // 17  // 49
  _loaded: new ReactiveVar(false),                                                             // 18  // 50
  loaded: function() {                                                                         // 19  // 51
    return this._loaded.get();                                                                 // 20  // 52
  },                                                                                           // 21  // 53
  maps: {},                                                                                    // 22  // 54
  _callbacks: {},                                                                              // 23  // 55
  initialize: function() {                                                                     // 24  // 56
    this._loaded.set(true);                                                                    // 25  // 57
    _.each(this.utilityLibraries, function(path) {                                             // 26  // 58
      var script = document.createElement('script');                                           // 27  // 59
      script.type = 'text/javascript';                                                         // 28  // 60
      script.src = path;                                                                       // 29  // 61
                                                                                               // 30  // 62
      document.body.appendChild(script);                                                       // 31  // 63
    });                                                                                        // 32  // 64
  },                                                                                           // 33  // 65
  _ready: function(name, map) {                                                                // 34  // 66
    _.each(this._callbacks[name], function(cb) {                                               // 35  // 67
      if (_.isFunction(cb))                                                                    // 36  // 68
        cb(map);                                                                               // 37  // 69
    });                                                                                        // 38  // 70
  },                                                                                           // 39  // 71
  ready: function(name, cb) {                                                                  // 40  // 72
    if (! this._callbacks[name])                                                               // 41  // 73
      this._callbacks[name] = [];                                                              // 42  // 74
    // make sure we run the callback only once                                                 // 43  // 75
    // as the tilesloaded event will also run after initial load                               // 44  // 76
    this._callbacks[name].push(_.once(cb));                                                    // 45  // 77
  },                                                                                           // 46  // 78
  // options: function(options) {                                                              // 47  // 79
  //   var self = this;                                                                        // 48  // 80
  //   return function() {                                                                     // 49  // 81
  //     if (self.loaded())                                                                    // 50  // 82
  //       return options();                                                                   // 51  // 83
  //   };                                                                                      // 52  // 84
  // },                                                                                        // 53  // 85
  get: function(name) {                                                                        // 54  // 86
    return this.maps[name];                                                                    // 55  // 87
  },                                                                                           // 56  // 88
  _create: function(name, options) {                                                           // 57  // 89
    var self = this;                                                                           // 58  // 90
    self.maps[name] = {                                                                        // 59  // 91
      instance: options.instance,                                                              // 60  // 92
      options: options.options                                                                 // 61  // 93
    };                                                                                         // 62  // 94
                                                                                               // 63  // 95
    if (options.type === 'StreetViewPanorama') {                                               // 64  // 96
      options.instance.setVisible(true);                                                       // 65  // 97
      self._ready(name, self.maps[name]);                                                      // 66  // 98
    } else {                                                                                   // 67  // 99
      google.maps.event.addListener(options.instance, 'tilesloaded', function() {              // 68  // 100
        self._ready(name, self.maps[name]);                                                    // 69  // 101
      });                                                                                      // 70  // 102
    }                                                                                          // 71  // 103
  },                                                                                           // 72  // 104
  create: function(options) {                                                                  // 73  // 105
    // default to Map                                                                          // 74  // 106
    var type = options.type ? options.type : 'Map';                                            // 75  // 107
    if (! _.include(supportedTypes, type))                                                     // 76  // 108
      throw new Meteor.Error("GoogleMaps - Invalid type argument: " + type);                   // 77  // 109
                                                                                               // 78  // 110
    this._create(options.name, {                                                               // 79  // 111
      type: type,                                                                              // 80  // 112
      instance: new google.maps[type](options.element, options.options),                       // 81  // 113
      options: options.options                                                                 // 82  // 114
    });                                                                                        // 83  // 115
  }                                                                                            // 84  // 116
};                                                                                             // 85  // 117
                                                                                               // 86  // 118
Template.googleMap.onRendered(function() {                                                     // 87  // 119
  var self = this;                                                                             // 88  // 120
  self.autorun(function(c) {                                                                   // 89  // 121
    // if the api has loaded                                                                   // 90  // 122
    if (GoogleMaps.loaded()) {                                                                 // 91  // 123
      var data = Template.currentData();                                                       // 92  // 124
                                                                                               // 93  // 125
      if (! data.options)                                                                      // 94  // 126
        return;                                                                                // 95  // 127
      if (! data.name)                                                                         // 96  // 128
        throw new Meteor.Error("GoogleMaps - Missing argument: name");                         // 97  // 129
                                                                                               // 98  // 130
      self._name = data.name;                                                                  // 99  // 131
                                                                                               // 100
      var canvas = self.$('.map-canvas').get(0);                                               // 101
                                                                                               // 102
      GoogleMaps.create({                                                                      // 103
        name: data.name,                                                                       // 104
        type: data.type,                                                                       // 105
        element: canvas,                                                                       // 106
        options: data.options                                                                  // 107
      });                                                                                      // 108
                                                                                               // 109
      c.stop();                                                                                // 110
    }                                                                                          // 111
  });                                                                                          // 112
});                                                                                            // 113
                                                                                               // 114
Template.googleMap.onDestroyed(function() {                                                    // 115
  google.maps.event.clearInstanceListeners(GoogleMaps.maps[this._name].instance);              // 116
  delete GoogleMaps.maps[this._name];                                                          // 117
});                                                                                            // 118
                                                                                               // 119
/////////////////////////////////////////////////////////////////////////////////////////////////     // 152
                                                                                                      // 153
}).call(this);                                                                                        // 154
                                                                                                      // 155
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['dburles:google-maps'] = {
  GoogleMaps: GoogleMaps
};

})();
