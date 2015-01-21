
# Mac Quick start

## Versions/Stack
* Rails version 4.1.1
* Ruby version 2.1.1

## Install Rails and Ruby using one of the following guides:
* https://gorails.com/setup/osx/10.9-mavericks
* https://gorails.com/setup/osx/10.10-yosemite
* If using Windows, recommended installer is RailsInstaller (http://railsinstaller.org/en)

## Running the application locally

1. Clone this repository (the gemfile contains necessary dependencies i.e. Blacklight)
2. Installed the packaged gems: $ bundle install 
3. Setup the Blacklight SQLite database: $ rake db:migrate
4. Configure Solr and VIVO references 
   * (config/solr.yml - line 13): 
  > `development:
  url: <%= ENV['SOLR_URL'] || "http://climate-dev.library.cornell.edu:8080/vivosolr" %>`
   * (config/initializers/app_constants - line 2):
  > `Rails.application.config.vivo_app_url = "http://climate-dev.library.cornell.edu:8080/vivo"`
5. Start the default rails web server (WEBrick): $ rails s (Cntl C to stop)

You should now see the Climate Change site at http://localhost:3000
