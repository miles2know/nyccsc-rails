# Execute sparql queries to get elements that are highlighted
class StrategyController < ApplicationController

  require 'net/http'
  require 'open-uri'
  
  #get adaptation highlights collection from vivo
  def adaptation
      require "net/http"
      
      @query = "PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
            "PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#> " + 
            "PREFIX xsd:      <http://www.w3.org/2001/XMLSchema#> " + 
            "PREFIX owl:      <http://www.w3.org/2002/07/owl#> " + 
            "PREFIX ccsc:      <http://nyclimateclearinghouse.org/ontology/> " + 
            " SELECT ?uri ?label ?abstract ?description " +
            "WHERE { " + 
            # "?uri ccsc:isHighlightedContent 'true'^^<http://www.w3.org/2000/01/rdf-schema#Literal>  ." +
            "?uri rdfs:label ?label . " +
            "<http://nyclimateclearinghouse.org/individual/n65129> <http://nyclimateclearinghouse.org/ontology/includesHighlightedResource> ?uri . " +
            "<http://nyclimateclearinghouse.org/individual/n65129> <http://purl.org/ontology/bibo/abstract> ?description . " +
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

  end

  #get adaptation highlights collection from vivo
  def mitigation
      require "net/http"
      
      @query = "PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
            "PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#> " + 
            "PREFIX xsd:      <http://www.w3.org/2001/XMLSchema#> " + 
            "PREFIX owl:      <http://www.w3.org/2002/07/owl#> " + 
            "PREFIX ccsc:      <http://nyclimateclearinghouse.org/ontology/> " + 
            " SELECT ?uri ?label ?abstract ?description " +
            "WHERE { " + 
            # "?uri ccsc:isHighlightedContent 'true'^^<http://www.w3.org/2000/01/rdf-schema#Literal>  ." +
            "?uri rdfs:label ?label . " +
            "<http://nyclimateclearinghouse.org/individual/n5412> <http://nyclimateclearinghouse.org/ontology/includesHighlightedResource> ?uri . " +
            "<http://nyclimateclearinghouse.org/individual/n5412> <http://purl.org/ontology/bibo/abstract> ?description . " +
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

  end 
  
end