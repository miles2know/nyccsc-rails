//= require_tree ./modules

//extend using Leaflet
var Map = L.Class.extend({
  options: {
    bbox: [[-85, -180], [85, 180]] //whole world default!
  },

  basemap: OpenStreetMap_DE,
  overlay: L.layerGroup(),
  overlayGeojson: L.geoJson(),

  initialize: function(el, options) {
    
    this.element = el;
    this.data = $(el).data();
    
    L.Util.setOptions(this, options);

    // trigger viewer load function
    this.load();
  },

  load: function() {
    this.map = L.map(this.element).fitBounds(this.options.bbox);
    this.map.addLayer(this.basemap);
    this.map.addLayer(this.overlay);
    if (this.data.map === 'index') {
      this.addBoundsOverlay(this.options.bbox);
    }
    this.addShareMyLocation();
  },

  /**
  * Add a bounding box overlay to map.
  * @param {L.LatLngBounds} bounds Leaflet LatLngBounds
  */
  addBoundsOverlay: function(bounds) {
    if (bounds instanceof L.LatLngBounds) {
      this.overlay.addLayer(L.polygon([
        bounds.getSouthWest(),
        bounds.getSouthEast(),
        bounds.getNorthEast(),
        bounds.getNorthWest()
      ]));
    }
  },

  /**
  * Remove bounding box overlay from map.
  */
  removeBoundsOverlay: function() {
    this.overlay.clearLayers();
  },

  /**
  * Add a polygon overlay to map.
  * @param {L.Geojson} 
  */
  addGeojsonOverlay: function(geojson) {
    this.overlayGeojson = L.geoJson(geojson, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
      }
    });
    this.overlayGeojson.addTo(this.map);
  },

  /**
  * Remove polygon overlay from map.
  */
  removeGeojsonOverlay: function() {
    this.map.removeLayer(this.overlayGeojson);
    //this.overlayGeojson.clearLayers();
  },

  
  //add my location control to map
  addShareMyLocation: function() {
    var locateControl = {
      position: "topleft",
      drawCircle: true,
      follow: true,
      setView: true,
      keepCurrentZoomLevel: true,
      markerStyle: {
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.8
      },
      circleStyle: {
        weight: 1,
        clickable: false
      },
      icon: "icon-direction",
      metric: false,
      strings: {
        title: "My location",
        popup: "You are within {distance} {unit} from this point",
        outsideMapBoundsMsg: "You appear to be located outside the boundaries of the map"
      },
      locateOptions: {
        maxZoom: 18,
        watch: true,
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000
      }
    };
    this.map.addControl(L.control.locate(locateControl));
  }
    
});



