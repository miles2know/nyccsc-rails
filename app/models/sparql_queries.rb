# -*- encoding : utf-8 -*-

# Utilizing this model to setup the sparql queries we will be utilizing

class SparqlQueries
  require 'sparql/client'
  ##The actual query strings
  @@query_definitions = {"highlights" => "PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
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
    " } ",
    "events_highlights" => "PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
    "PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#> " +
    "PREFIX xsd:      <http://www.w3.org/2001/XMLSchema#> " +
    "PREFIX owl:      <http://www.w3.org/2002/07/owl#> " +
    "PREFIX ccsc:      <http://nyclimateclearinghouse.org/ontology/> " +
    " SELECT ?resourceURI ?label ?location ?start ?end ?description" +
    " WHERE {" +
    " ?resourceURI rdfs:label ?label ." +
    " <http://nyclimateclearinghouse.org/individual/n14708> <http://nyclimateclearinghouse.org/ontology/includesHighlightedResource> ?resourceURI ." +
    " OPTIONAL {?resourceURI <http://purl.obolibrary.org/obo/RO_0001025> ?locationURI . ?locationURI rdfs:label ?location . }" +
    " OPTIONAL {?resourceURI <http://vivoweb.org/ontology/core#dateTimeInterval> ?datetimeURI ." +
    " ?datetimeURI <http://vivoweb.org/ontology/core#start> ?startURI . " +
    " ?startURI <http://vivoweb.org/ontology/core#dateTime> ?start . }" +
    " OPTIONAL {?resourceURI <http://vivoweb.org/ontology/core#dateTimeInterval> ?datetimeURI ." +
    " ?datetimeURI <http://vivoweb.org/ontology/core#end> ?endURI . " +
    " ?endURI <http://vivoweb.org/ontology/core#dateTime> ?end . }" +
    " OPTIONAL {?resourceURI <http://vivoweb.org/ontology/core#description> ?description . } " +
    " }"
  }
  
  ##Originally in helper method, moved here instead
  @@highlightMappings = {
    "adaptation" => "http://nyclimateclearinghouse.org/individual/n65129",
    "mitigation" => "http://nyclimateclearinghouse.org/individual/n5412",
    "event" => "http://nyclimateclearinghouse.org/individual/n14708",
    "step1" => "http://nyclimateclearinghouse.org/individual/n30051",
    "step2" => "http://nyclimateclearinghouse.org/individual/n2547",
    "step3" => "http://nyclimateclearinghouse.org/individual/n29234",
    "step4" => "http://nyclimateclearinghouse.org/individual/n29941",
    "step5" => "http://nyclimateclearinghouse.org/individual/n29559",
    "coastal" => "http://nyclimateclearinghouse.org/individual/n4447",
    "extreme" => "http://nyclimateclearinghouse.org/individual/n30495",
    "heat" => "http://nyclimateclearinghouse.org/individual/n3832",
    "downpours" => "http://nyclimateclearinghouse.org/individual/n88",
    "snowpack" => "http://nyclimateclearinghouse.org/individual/n11992",
    "drought" => "http://nyclimateclearinghouse.org/individual/n3231",
    "understand" => "http://nyclimateclearinghouse.org/individual/n7436"
  }

  ##Setting up the sparql query
  #This defaults to highlights if nothing is passed
  def initialize()
    options = {:method => :get}
    #Sparql API should be specified in app_constants
    @sparql = SPARQL::Client.new(Rails.application.config.vivo_sparqlapi  , options)
    if(@sparql == nil)
      Rails.logger.error("ERROR: Sparql client is nil")
    end
    #Prefer JSON results - plain text may have lead to encoding errors
    @queryoptions = {:content_type => SPARQL::Client::RESULT_JSON}
  end
  
  def get_results(query_id = "highlights")
    results = nil
    if(@sparql != nil and @@query_definitions.has_key?(query_id))
      @query = @@query_definitions[query_id]
      Rails.logger.debug("Query being executed is #{@query.inspect}")
      results = @sparql.query(@query, @queryoptions)
  else
      Rails.logger.error("sparql client is nil OR query_id #{query_id.inspect} does not exist in definitions")
    end 
   return results
  end
  

end