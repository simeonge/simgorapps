# adding calc js file here, which was excluded from application js and added independently
Rails.application.config.assets.precompile += %w( calculator.js )
