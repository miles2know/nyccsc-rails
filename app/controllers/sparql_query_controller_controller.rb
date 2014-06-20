#Calls VIVO's Sparql query ajax controller, this may have to be changed in case that controller is shifted
#or when we decide we want to utilize the API
#Note the api requires passing in the email and password for authentication 
class SparqlQueryControllerController < ApplicationController
  require 'net/http'
  require 'open-uri'
  #Get highlighted content using a sparql query
  def getHighlightedContent
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
      @base_sparql_url = 'http://localhost:8080/vivo/ajax/sparqlQuery'
      url = URI.parse(@base_sparql_url + "?query=" + @encoded_query)
      resp = Net::HTTP.get_response(url)
      data = resp.body
      result = JSON.parse(data)
      render :json => result
      end
  end

