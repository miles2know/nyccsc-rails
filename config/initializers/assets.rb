#for mapping features
Rails.application.config.assets.precompile += %w( map/mapDataOverlays.js )
Rails.application.config.assets.precompile += %w( map/mapAddD3Layer.js )
Rails.application.config.assets.precompile += %w( map/mapResults.js )
Rails.application.config.assets.precompile += %w( map/mapSearch.js )

#for data product chart features
Rails.application.config.assets.precompile += %w( data/chartData.js )
Rails.application.config.assets.precompile += %w( data/opt1/chartD3.js )
Rails.application.config.assets.precompile += %w( data/opt1/chartD3Layers.js )
#second variation chart features
Rails.application.config.assets.precompile += %w( data/opt2/chartD3Layers.js )

# used on data product pages for selecting date range
Rails.application.config.assets.precompile += %w( bootstrap.datepicker.js )

Rails.application.config.assets.precompile += %w( linkedDataRequests.js )
Rails.application.config.assets.precompile += %w( sparqlQueryResults.js )

