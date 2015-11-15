(function(){
Template.body.addContent((function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("map"));
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("map");
Template["map"] = new Template("Template.map", (function() {
  var view = this;
  return HTML.DIV({
    "class": "map-container"
  }, "\n    ", Blaze._TemplateWith(function() {
    return {
      name: Spacebars.call("map"),
      options: Spacebars.call(view.lookup("mapOptions"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("googleMap"));
  }), "\n  ");
}));

}).call(this);
