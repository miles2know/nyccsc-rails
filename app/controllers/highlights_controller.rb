#Right now using this so we can call the solr index directly as it sits on a different port
# Also  utilizing this to make calls to the forestecoservices site but that will eventually get routed differently
# when code is moved
class HighlightsController < ApplicationController

  require 'net/http'
  require 'open-uri'
  #Get highlighted content using a sparql query
  def feature
      require "net/http"
      
      @query = "PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
            "PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#> " + 
            "PREFIX xsd:      <http://www.w3.org/2001/XMLSchema#> " + 
            "PREFIX owl:      <http://www.w3.org/2002/07/owl#> " + 
            "PREFIX ccsc:      <http://nyclimateclearinghouse.org/ontology/> " + 
            " SELECT ?uri ?label ?abstract " +
            "WHERE { " + 
            "?uri ccsc:isHighlightedContent 'true'^^<http://www.w3.org/2000/01/rdf-schema#Literal>  ." +
            "?uri rdfs:label ?label . " +
            "OPTIONAL {?uri <http://purl.org/ontology/bibo/abstract> ?abstract . } " +
            " }"
      Rails.logger.debug("Query is #{@query}")
      @encoded_query = URI::encode(@query)
      Rails.logger.debug("URL encoded query is #{@encoded_query}")
      @base_sparql_url = 'http://climate-dev.library.cornell.edu:8080/vivo/ajax/sparqlQuery'
      url = URI.parse(@base_sparql_url + "?query=" + @encoded_query)
      # url = URI.parse("http://www.reddit.com/user/brain_poop/comments/.json")
      response = Net::HTTP.get_response(url)
      
      @data = JSON.parse(response.body)

      # or establish an array # 
      # @arr = []
      # data['data']['children'].each do |child|
      #     @arr.push child['data']['body']
      # end
      # data['results']['bindings'].each do |child|
      #     @arr.push child['label']['value']
      # end
    

    
      #@name = 'Test to be sure data is exposed to view.'

  end
end