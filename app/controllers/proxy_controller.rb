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
    result = []
    if (@querytype)
      result = get_geojson_data()
    elsif(@vivo_linked_data)
      result= get_vivo_linkeddata()
      ## Deal with sparql queries
    elsif(@vivo_sparql_query)
      result = get_vivo_sparqlquery(params)
    else
      result = get_vivo_solr_results()
    end
    render :json => result

  end

  # For forestecoservices/frontierspatial data from their urls
  # This will need to change once we have this data on our own servers
  def get_geojson_data
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
    return result

  end

  # Linked data request
  def get_vivo_linkeddata
    vivo_app = Rails.application.config.vivo_app_url
    #The parameter value should be the URI we want
    url = URI.parse(vivo_app + "/individual?uri=" + @vivo_linked_data  + "&format=jsonld")
    resp = Net::HTTP.get_response(url)
    data = resp.body
    result = JSON.parse(data)
    return result
  end

  #Execute sparql queries
  def get_vivo_sparqlquery(params)
    thisURI = params["sparqlquery"]
    if(params["sparqlquerytype"] == "link")
      result = get_vivo_link_sparql()
    elsif(params["sparqlquerytype"] == "dataproduct")
      result = get_vivo_dataproduct_info(thisURI)
    elsif(params["sparqlquerytype"] == "downloadurl")
      result = get_vivo_access_url(thisURI)
    elsif(params["sparqlquerytype"] == "gismap")
       result = get_GIS_Mapping_Info(thisURI)
    end

    return result
  end

  #To get link information, etc.
  def get_vivo_link_sparql
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
    return result
  end

  # Get data product information, i.e. variables, etc.
  def get_vivo_dataproduct_info(thisURI)
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

    result = JSON.parse(response.body)
    return result
  end

  # Get GIS source layer
  # For now, in ontology, defined as Access URL but this will need to change once the ontology changes
  def get_vivo_access_url(thisURI)  ## This parameter should include the URI we want to execute this query for below
    ## Right now just doing one but can get more
    query = "PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
    "PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#> " +
    "PREFIX xsd:      <http://www.w3.org/2001/XMLSchema#> " +
    "PREFIX owl:      <http://www.w3.org/2002/07/owl#> " +
    "PREFIX ccsc:      <http://nyclimateclearinghouse.org/ontology/> " +
    "SELECT ?url WHERE {" +
    "<" + thisURI + "> <http://purl.obolibrary.org/obo/ARG_2000028> ?vcard ." +
    "?vcard a <http://www.w3.org/2006/vcard/ns#Kind> ." +
    "?vcard <http://www.w3.org/2006/vcard/ns#hasURL> ?link ." +
    "?link a <http://nyclimateclearinghouse.org/ontology/DownloadURL> ." +
    "?link <http://www.w3.org/2006/vcard/ns#url> ?url ." +
    "}"
    base_sparql_url = Rails.application.config.vivo_app_url + '/ajax/sparqlQuery'
    encoded_query = URI::encode(query)
    url = URI.parse(base_sparql_url + "?query=" + encoded_query)
    Rails.logger.debug("url for sparql query is " + url.to_s)
    resp = Net::HTTP.get_response(url)
    data = resp.body
    result = JSON.parse(data)
    return result
  end
  
  ## Get the GIS layer information, apart from the URL - 
  def get_GIS_Mapping_Info(thisURI)
    query = "PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
        "PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#> " +
        "PREFIX xsd:      <http://www.w3.org/2001/XMLSchema#> " +
        "PREFIX owl:      <http://www.w3.org/2002/07/owl#> " +
        "PREFIX ccsc:      <http://nyclimateclearinghouse.org/ontology/> " +
    "SELECT ?url ?title ?format ?layerGeometry ?layerType ?layerIconType ?layerDataProp ?layerRangeIntervals ?colorHue ?iconImageURL ?iconClusterImageURL ?legendImageURL WHERE {"+
    "<" + thisURI + "> rdf:type  <http://nyclimateclearinghouse.org/ontology/gisMappingLayer> ."+
    "<" + thisURI + "> rdfs:label ?title ."+
    "<" + thisURI + "> <http://purl.org/dc/terms/format> ?formatInd."+
    "?formatInd rdfs:label ?format ."+
    "<" + thisURI + "> <http://purl.obolibrary.org/obo/ARG_2000028> ?vcard ." +
      "?vcard a <http://www.w3.org/2006/vcard/ns#Kind> ." +
      "?vcard <http://www.w3.org/2006/vcard/ns#hasURL> ?link ." +
      "?link a <http://nyclimateclearinghouse.org/ontology/DownloadURL> ." +
      "?link <http://www.w3.org/2006/vcard/ns#url> ?url ." +
    "OPTIONAL {"+
    "<" + thisURI + "> <http://nyclimateclearinghouse.org/ontology/layerGeometry> ?layerGeometry."+
    "}"+
    "OPTIONAL {"+
    "<" + thisURI + "> <http://nyclimateclearinghouse.org/ontology/layerType> ?layerType ."+
    "}"+
    "OPTIONAL {"+
    "<" + thisURI + "> <http://nyclimateclearinghouse.org/ontology/layerIconType> ?layerIconType ."+
    "}"+
    "OPTIONAL {"+
    "<" + thisURI + "> <http://nyclimateclearinghouse.org/ontology/layerDataProp> ?layerDataProp ."+
    "}"+
    "OPTIONAL {"+
    "<" + thisURI + "> <http://nyclimateclearinghouse.org/ontology/layerRangeIntervals> ?layerRangeIntervals."+
    "}"+
    "OPTIONAL {"+
    "<" + thisURI + "> <http://nyclimateclearinghouse.org/ontology/colorHue> ?colorHue ."+
    "}"+
    "OPTIONAL {"+
    "<" + thisURI + "> <http://nyclimateclearinghouse.org/ontology/iconImageURL> ?iconImageURL ."+
    "}"+
    "OPTIONAL {"+
    "<" + thisURI + "> <http://nyclimateclearinghouse.org/ontology/iconClusterImageURL> ?iconClusterImageURL ."+
    "}"+
    "OPTIONAL {"+
    "<" + thisURI + "> <http://nyclimateclearinghouse.org/ontology/legendImageURL> ?legendImageURL ."+
    "}"+
    "}"
        base_sparql_url = Rails.application.config.vivo_app_url + '/ajax/sparqlQuery'
        encoded_query = URI::encode(query)
        url = URI.parse(base_sparql_url + "?query=" + encoded_query)
        Rails.logger.debug("url for sparql query is " + url.to_s)
        resp = Net::HTTP.get_response(url)
        data = resp.body
        result = JSON.parse(data)
        return result
    
  end

  #Get Solr query results
  def get_vivo_solr_results
    url = URI.parse(@base_solr_url + @query)
    #req = Net::HTTP::Get.new(url.path)
    #res = Net::HTTP.start(url.host, url.port) {|http|
    #    http.request(req)
    #    }
    #render :json => res
    resp = Net::HTTP.get_response(url)
    data = resp.body
    result = JSON.parse(data)
  end

end
