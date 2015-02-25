
$(document).ready(function() {

  //first setup sticky elements - search params and map
  stickyElement('#map-container', 73);
  stickyElement('#appliedParams', 73);
  stickyElement('#header-facets');

  //history code that follows requires native.history.js 
  var historySupported = !!(window.history && window.history.pushState);
  if (historySupported) {

    History.Adapter.bind(window, 'statechange', function() {
      var state = History.getState();
      updatePage(state.url);
    });
  }

  $('[data-map="index"]').each(function() {
    
    var data = $(this).data(),
    opts = { baseUrl: data.catalogPath },
    geoblacklight, bbox;
    
    if (typeof data.mapBbox === 'string') {
      bbox = L.bboxToBounds(data.mapBbox);
    } else {
      $('.document [data-bbox]').each(function() {
        if (typeof bbox === 'undefined') {
          bbox = L.bboxToBounds($(this).data().bbox);
        } else {
          bbox.extend(L.bboxToBounds($(this).data().bbox));
        }
      });
    }
    
    if (!historySupported) {
      $.extend(opts, {
        dynamic: false,
        searcher: function() {
          window.location.href = this.getSearchUrl();
        }
      });
    }

    // instantiate new map
    geoblacklight = new Map(this, { bbox: [[35.478565,-83.056641], [48.443778,-70.070801]] });
    // set hover listeners on map
    $('#content')
      .on('mouseenter', '#documents [data-layer-id]', function() {
        var bounds = L.bboxToBounds($(this).data('bbox'));
        geoblacklight.addBoundsOverlay(bounds);
      })
      .on('mouseleave', '#documents [data-layer-id]', function() {
        geoblacklight.removeBoundsOverlay();
      });

    // add geosearch control to map
    geoblacklight.map.addControl(L.control.geosearch(opts));

    // add context layers control to map 
    geoblacklight.map.addControl(L.control.layers(baseLayers));
    
  });

  function updatePage(url) {  
    $('#documents').fadeTo('fast',0.2);
    $.get(url).done(function(data) {

      $('#documents').fadeTo('fast',1.0);
      var resp = $.parseHTML(data);
      //vivoDataRequests.onLoad();
      $doc = $(resp);
      $('#documents').replaceWith($doc.find('#documents'));
      $('#sidebar').replaceWith($doc.find('#sidebar'));
      $('#sortAndPerPage').replaceWith($doc.find('#sortAndPerPage'));
      $('#appliedParams').replaceWith($doc.find('#appliedParams'));
      if ($('#map').next().length) {
        $('#map').next().replaceWith($doc.find('#map').next());
      } else {
        $('#map').after($doc.find('#map').next());
      }
      
    });
  }

});
