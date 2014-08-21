#Right now using this so we can call the solr index directly as it sits on a different port
# Also  utilizing this to make calls to the forestecoservices site but that will eventually get routed differently
# when code is moved
class ProxyController < ApplicationController
  require 'net/http'
  def data
      require "net/http"
      ## Solr query parameter
  	  @query = params[:q]
  	  # GeoJSON parameter
      @querytype = params["querytype"]
      # VIVO profile as JSON parameter
      #@vivo_json = params["vivoprofile"] 
        # VIVO linked data request
      @vivo_linked_data = params["linkeddata"] 
      @vivo_sparql_query = params["sparqlquery"]
      @base_solr_url = Blacklight.solr_config[:url] + '/select/?wt=json&q='
      @base_forestservices = 'http://frontierspatial.com/nyccsc/data/'
      @base_url = request.env['HTTP_HOST']
      @base_current_url = 'http://' + @base_url + '/proxy/data'
        #@base_vivo_url = 
      ##Check whether this is solr or for something else
     
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
      elsif(@vivo_linked_data)
          vivo_app = Rails.application.config.vivo_app_url
          #The parameter value should be the URI we want
          url = URI.parse(vivo_app + "/individual?uri=" + @vivo_linked_data  + "&format=jsonld")
        resp = Net::HTTP.get_response(url)
                  data = resp.body
                  result = JSON.parse(data)
                  render :json => result
                  
      ## Deal with sparql queries
      elsif(@vivo_sparql_query) 
        ## This parameter should include the URI we want to execute this query for below
        ## Right now just doing one but can get more
        query = "PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
        "PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#> " + 
        "PREFIX xsd:      <http://www.w3.org/2001/XMLSchema#> " + 
        "PREFIX owl:      <http://www.w3.org/2002/07/owl#> " + 
        "PREFIX ccsc:      <http://nyclimateclearinghouse.org/ontology/> " + 
        "SELECT ?url ?linkLabel WHERE {" + 
        "<" + @vivo_sparql_query + "> <http://purl.obolibrary.org/obo/ARG_2000028> ?vcard ." + 
        "?vcard a <http://www.w3.org/2006/vcard/ns#Kind> ." + 
        "?vcard <http://www.w3.org/2006/vcard/ns#hasURL> ?link ." + 
        "?link a <http://www.w3.org/2006/vcard/ns#URL> ." + 
        "?link <http://www.w3.org/2006/vcard/ns#url> ?url ." + 
        "?link rdfs:label ?linkLabel ." +
        "}"         
        base_sparql_url = Rails.application.config.vivo_app_url + '/ajax/sparqlQuery'
        encoded_query = URI::encode(query)
        url = URI.parse(base_sparql_url + "?query=" + encoded_query)
        Rails.logger.debug("url for sparql query is " + url.to_s)
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
