#for mapping features
Rails.application.config.assets.precompile += %w( map/mapDataOverlays.js )
Rails.application.config.assets.precompile += %w( map/mapSessionLayers.js )
Rails.application.config.assets.precompile += %w( map/mapAddD3Layer.js )
Rails.application.config.assets.precompile += %w( map/mapAddLeafletLayer.js )
Rails.application.config.assets.precompile += %w( map/mapAddLayer.js )
Rails.application.config.assets.precompile += %w( map/mapResults.js )
Rails.application.config.assets.precompile += %w( map/mapSearch.js )
Rails.application.config.assets.precompile += %w( map/mapSearchAlt.js )
Rails.application.config.assets.precompile += %w( map/mapSearchApp.js )
Rails.application.config.assets.precompile += %w( map/mapUberApp.js )

#for mapping - static html version 
Rails.application.config.assets.precompile += %w( map/frontier/overlays.js )
Rails.application.config.assets.precompile += %w( map/frontier/county.js )
Rails.application.config.assets.precompile += %w( map/frontier/ny_dot.js )
Rails.application.config.assets.precompile += %w( map/frontier/ny_dec.js )
Rails.application.config.assets.precompile += %w( map/frontier/ny_clim_div.js )
Rails.application.config.assets.precompile += %w( map/frontier/spdes.js )
Rails.application.config.assets.precompile += %w( map/frontier/spdesLoad.js )
Rails.application.config.assets.precompile += %w( map/frontier/historicdeclarations_ny.js )
Rails.application.config.assets.precompile += %w( map/frontier/historicdeclarations_nyLoad.js )
Rails.application.config.assets.precompile += %w( map/frontier/alsc.js )
Rails.application.config.assets.precompile += %w( map/frontier/alscLoad.js )
Rails.application.config.assets.precompile += %w( map/frontier/usgs_streamflow.js )
Rails.application.config.assets.precompile += %w( map/frontier/usgs_streamflowLoad.js )
Rails.application.config.assets.precompile += %w( map/frontier/nfhl.js )
Rails.application.config.assets.precompile += %w( map/frontier/nfhlLoad.js )
Rails.application.config.assets.precompile += %w( map/frontier/app.js )

#for data product chart features
Rails.application.config.assets.precompile += %w( data/chartData.js )
Rails.application.config.assets.precompile += %w( data/opt1/chartD3.js )
Rails.application.config.assets.precompile += %w( data/opt1/chartD3Layers.js )
#second variation chart features
Rails.application.config.assets.precompile += %w( data/opt2/chartD3Layers.js )
#in page data product display
Rails.application.config.assets.precompile += %w( data/showview/page_chartD3.js )
Rails.application.config.assets.precompile += %w( data/showview/page_chartD3Layers.js )

# used on data product pages for selecting date range
Rails.application.config.assets.precompile += %w( bootstrap.datepicker.js )

# used to make linked data requests
Rails.application.config.assets.precompile += %w( linkedDataRequests.js )
# used for data product content and gis content and picking between them on a page
Rails.application.config.assets.precompile += %w( dataProductResults.js )
Rails.application.config.assets.precompile += %w( gisLayers.js )
Rails.application.config.assets.precompile += %w( initContentHandlers.js )



