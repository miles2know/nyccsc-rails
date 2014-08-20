Rails.application.config.assets.precompile += %w( map/mapDataOverlays.js )
Rails.application.config.assets.precompile += %w( map/mapAddD3Layer.js )
Rails.application.config.assets.precompile += %w( map/mapResults.js )
Rails.application.config.assets.precompile += %w( map/mapSearch.js )
Rails.application.config.assets.precompile += %w( linkedDataRequests.js )

# if Bill Noon's vue/superagent (require.js variation) is utilized
# Rails.application.config.assets.precompile += %w( map.js )
# Rails.application.config.assets.precompile += %w( dataPlot.js )
# Rails.application.config.assets.precompile += %w( superagent.js )
