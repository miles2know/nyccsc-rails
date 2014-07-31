# Execute sparql queries to get elements that are highlighted
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
      @base_url = request.protocol + request.host
      #TODO: Need a way to store the path to VIVO somewhere in some kind of configuration file which can then be different based on where this is being tested
      @base_sparql_url =  @base_url + ':8080/vivo/ajax/sparqlQuery'
      Rails.logger.debug("sparql url is " + @base_sparql_url)
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
  
  #Am putting this here but can be moved to another controller
  #This just executes a sparql query to get a label for an individual
  def getRdfsLabel
    require "net/http"
    # expect to pass uri as parameter
    if params.has_key?("uri") and params["uri"] != nil and params["uri"] != ""
      thisURI = params["uri"]
        
   
          query = "PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
                "PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#> " + 
                "PREFIX xsd:      <http://www.w3.org/2001/XMLSchema#> " + 
                "PREFIX owl:      <http://www.w3.org/2002/07/owl#> " + 
                "PREFIX ccsc:      <http://nyclimateclearinghouse.org/ontology/> " + 
                " SELECT ?label " +
                "WHERE { " + 
                "<" + thisURI + "> rdfs:label ?label ." +
                " }"
          Rails.logger.debug("Query is #{query}")
          encoded_query = URI::encode(query)
          Rails.logger.debug("URL encoded query is #{encoded_query}")
          #base_url = request.protocol + request.host
          base_sparql_url = Rails.application.config.vivo_app_url + '/ajax/sparqlQuery'
          Rails.logger.debug("sparql url is " + base_sparql_url)
          url = URI.parse(base_sparql_url + "?query=" + encoded_query)
          response = Net::HTTP.get_response(url)
          
          @data = JSON.parse(response.body)
    end
  end
end