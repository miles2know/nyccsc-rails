# Execute sparql queries to get elements that are highlighted
class HighlightsController < ApplicationController

  require 'net/http'
  require 'open-uri'

  def strategies 
    @data = get_highlights
  end

  def impacts 
    @data = get_highlights
  end

  def events 
    @data = get_event_highlights
  end

  
  def get_highlights 
    
    @query = "PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
          "PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#> " + 
          "PREFIX xsd:      <http://www.w3.org/2001/XMLSchema#> " + 
          "PREFIX owl:      <http://www.w3.org/2002/07/owl#> " + 
          "PREFIX ccsc:      <http://nyclimateclearinghouse.org/ontology/> " + 
          " SELECT ?resourceURI ?resourceLabel ?collectionURI ?collectionAbstract" +
          " WHERE { " + 
          "?resourceURI rdfs:label ?resourceLabel . " +
          "?collectionURI <http://nyclimateclearinghouse.org/ontology/includesHighlightedResource> ?resourceURI . " +
          "?collectionURI rdf:type <http://nyclimateclearinghouse.org/ontology/HighlightsCollection> . " +
          "OPTIONAL {?collectionURI <http://purl.org/ontology/bibo/abstract> ?collectionAbstract . } " +
          " } "

    # Rails.logger.debug("HIGHLIGHTS QUERY:::::::::::::::::::::::::" + @query)
    @encoded_query = URI::encode(@query)
    @base_sparql_url = Rails.application.config.vivo_app_url + '/ajax/sparqlQuery'
    url = URI.parse(@base_sparql_url + "?query=" + @encoded_query)
    response = Net::HTTP.get_response(url)
    # Rails.logger.debug("RESPONSE:::::::::::::::::::::::::" + response.to_s)
    @data = JSON.parse(response.body)
  
  end


  def get_event_highlights
    
    #TODO: add datetime and description 
    @query = "PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
          "PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#> " + 
          "PREFIX xsd:      <http://www.w3.org/2001/XMLSchema#> " + 
          "PREFIX owl:      <http://www.w3.org/2002/07/owl#> " + 
          "PREFIX ccsc:      <http://nyclimateclearinghouse.org/ontology/> " + 
          " SELECT ?resourceURI ?label ?location ?datetimeURI ?start ?end ?description" +
          " WHERE {" + 
            " ?resourceURI rdfs:label ?label ." +
            " <http://nyclimateclearinghouse.org/individual/n14708> <http://nyclimateclearinghouse.org/ontology/includesHighlightedResource> ?resourceURI ." +
            " OPTIONAL {?resourceURI <http://purl.obolibrary.org/obo/RO_0001025> ?locationURI . ?locationURI rdfs:label ?location . }" +
            " OPTIONAL {?resourceURI <http://vivoweb.org/ontology/core#dateTimeInterval> ?datetimeURI . }" + 
            " OPTIONAL {?datetimeURI <http://vivoweb.org/ontology/core#start> ?startURI . " +
                   " ?startURI <http://vivoweb.org/ontology/core#dateTime> ?start . }" +
            " OPTIONAL {?datetimeURI <http://vivoweb.org/ontology/core#end> ?endURI . " +
                   " ?startURI <http://vivoweb.org/ontology/core#dateTime> ?end . }" +
            " OPTIONAL {?resourceURI <http://vivoweb.org/ontology/core#description> ?description . } " +
          " }"

    Rails.logger.debug("HIGHLIGHTS QUERY:::::::::::::::::::::::::" + @query)
    @encoded_query = URI::encode(@query)
    @base_sparql_url = Rails.application.config.vivo_app_url + '/ajax/sparqlQuery'
    url = URI.parse(@base_sparql_url + "?query=" + @encoded_query)
    response = Net::HTTP.get_response(url)
     Rails.logger.debug("RESPONSE:::::::::::::::::::::::::" + JSON.parse(response.body).to_s)
    @data = JSON.parse(response.body)

  end

end
