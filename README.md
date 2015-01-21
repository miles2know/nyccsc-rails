== README

## Mac Quick start

# Versions/Stack
* Rails version 4.1.1
* Ruby version 2.1.1
* Solr Index (config/solr.yml) - http://climate-dev.library.cornell.edu:8080/vivosolr
* 

# Install Rails and Ruby using one of the following guides:
* https://gorails.com/setup/osx/10.9-mavericks
* https://gorails.com/setup/osx/10.10-yosemite

# If using Windows, recommended installer is RailsInstaller

# Running the application locally

1. Clone this repository (the gemfile contains necessary dependencies i.e. Blacklight)
2. Installed the packaged gems: $ bundle install 
3. Setup the Blacklight SQLite database: $ rake db:migrate
4. Start the default rails web server (WEBrick): $ rails s (Cntl C to stop)

You should now see the Climate Change site at http://localhost:3000
