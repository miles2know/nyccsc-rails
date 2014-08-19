Rails.application.config.assets.precompile += %w( mapDataOverlays.js )
Rails.application.config.assets.precompile += %w( mapAddD3Layer.js )
Rails.application.config.assets.precompile += %w( mapResults.js )
Rails.application.config.assets.precompile += %w( mapSearch.js )
Rails.application.config.assets.precompile += %w( linkedDataRequests.js )

# if Bill Noon's vue/superagent (require.js variation) is utilized
# Rails.application.config.assets.precompile += %w( map.js )
# Rails.application.config.assets.precompile += %w( dataPlot.js )
# Rails.application.config.assets.precompile += %w( superagent.js )
