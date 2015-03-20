#for mapping features
Rails.application.config.assets.precompile += %w( map/mapDataOverlays.js )
Rails.application.config.assets.precompile += %w( map/mapAddLayer.js )
Rails.application.config.assets.precompile += %w( map/mapResults.js )
Rails.application.config.assets.precompile += %w( map/mapSearchAlt.js )
Rails.application.config.assets.precompile += %w( map/mapUberApp.js )
Rails.application.config.assets.precompile += %w( map/map.js )
Rails.application.config.assets.precompile += %w( map/mapBookmarks.js )

#for data product chart features - static pages
Rails.application.config.assets.precompile += %w( data/chartData.js )
Rails.application.config.assets.precompile += %w( data/opt1/chartD3.js )
Rails.application.config.assets.precompile += %w( data/opt1/chartD3Layers.js )
#second variation chart features
Rails.application.config.assets.precompile += %w( data/opt2/chartD3Layers.js )
#individual blacklight app data product display
Rails.application.config.assets.precompile += %w( data/showview/page_chartD3.js )
Rails.application.config.assets.precompile += %w( data/showview/page_chartD3Layers.js )

# used on data product pages for selecting date range
Rails.application.config.assets.precompile += %w( bootstrap.datepicker.js )

# used to make linked data OR sparql query requests to VIVO within index/show pages
Rails.application.config.assets.precompile += %w( vivoDataRequests.js )
# used for data product content and gis content and picking between them on a page
Rails.application.config.assets.precompile += %w( dataProductResults.js )
Rails.application.config.assets.precompile += %w( initContentHandlers.js )
Rails.application.config.assets.precompile += %w( getGISLayerInfo.js )

##Making jquery ui available
##This will be different for Rails 4, to do: UPDATE
Rails.application.config.assets.precompile += %w( jquery.ui.all.js )
Rails.application.config.assets.precompile += %w( jquery.ui.slider.js )
Rails.application.config.assets.precompile += %w( jquery.ui.selectmenu.js )

##Making the map stuff available
Rails.application.config.assets.precompile += %w( map/*_mapbundle.js )

##Making data products available
Rails.application.config.assets.precompile += %w( data/*.bundle.js )
Rails.application.config.assets.precompile += %w( data/loader.js )

##Css
Rails.application.config.assets.precompile += %w( jquery.ui.all.css )
Rails.application.config.assets.precompile += %w( map/app.css )
Rails.application.config.assets.precompile += %w( map/map.css )

