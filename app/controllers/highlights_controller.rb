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
      #@base_url = request.protocol + request.host
      @base_sparql_url = Rails.application.config.vivo_app_url + '/ajax/sparqlQuery'
      Rails.logger.debug("sparql url is " + @base_sparql_url)
      url = URI.parse(@base_sparql_url + "?query=" + @encoded_query)
      # url = URI.parse("http://www.reddit.com/user/brain_poop/comments/.json")
      Rails.logger.debug("sparql url with query " + url.to_s)
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
  
  def gis
     require "net/http"
    if params.has_key?("uri") and params["uri"] != nil and params["uri"] != ""
          thisURI = params["uri"]
      query = "PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
      "PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#> " + 
      "PREFIX xsd:      <http://www.w3.org/2001/XMLSchema#> " + 
      "PREFIX owl:      <http://www.w3.org/2002/07/owl#> " + 
      "PREFIX ccsc:      <http://nyclimateclearinghouse.org/ontology/> " + 
      "Select ?dataVariable ?submissionValue ?label ?variableType ?typeLabel WHERE " +
      "{ " +
      "?dataVariable <http://nyclimateclearinghouse.org/ontology/dataVariableIn> <" + thisURI + "> ." +
      "?dataVariable <http://nyclimateclearinghouse.org/ontology/valueForSubmission> ?submissionValue ." +
      "?dataVariable rdfs:label ?label ." +
      "?dataVariable <http://vitro.mannlib.cornell.edu/ns/vitro/0.7#mostSpecificType> ?variableType." +
      "?variableType rdfs:label ?typeLabel ." +
      "}"

       
            
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