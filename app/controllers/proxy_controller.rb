#Right now using this so we can call the solr index directly as it sits on a different port
# Also  utilizing this to make calls to the forestecoservices site but that will eventually get routed differently
# when code is moved
class ProxyController < ApplicationController
  require 'net/http'
  def data
      require "net/http"
  	  @query = params[:q]
      @base_solr_url = 'http://climate-dev.library.cornell.edu:8080/vivosolr/select/?wt=json&q='
      @base_forestservices = 'http://forestecoservices.net/nyclimate/data/'
      @base_url = request.env['HTTP_HOST']
      @base_current_url = 'http://' + @base_url + '/proxy/data'
      ##Check whether this is solr or for something else
      @querytype = params["querytype"]
      if (@querytype) 
         current_url = request.original_url
         
         Rails.logger.debug("base url is #{@base_current_url} and Querytype parameter does exist and is #{@querytype} and current url is #{current_url}")   
         #Get the current url and get everything after the base url
         # The url will be passed in as follows: base_current_url?query_type=pagename&other relevant params
         sliced = current_url.slice!(@base_current_url)
         Rails.logger.debug("sliced #{sliced} and current #{current_url}")
         new_url = @base_forestservices + @querytype + ".php" + current_url
         Rails.logger.debug("new url is " + new_url)
         url = URI.parse(new_url)
         resp = Net::HTTP.get_response(url)
          data = resp.body
          result = JSON.parse(data)
          render :json => result
      else
      
  	      url = URI.parse(@base_solr_url + @query)
	        #req = Net::HTTP::Get.new(url.path)
	        #res = Net::HTTP.start(url.host, url.port) {|http|
	        #    http.request(req)
          #    }
          #render :json => res
          resp = Net::HTTP.get_response(url)
          data = resp.body
          result = JSON.parse(data)
          render :json => result
      end
  end
end
