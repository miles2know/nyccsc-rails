module DisplayHelper

  # @param [Array<SolrDocument>] list of documents to render
  # @param [Hash] locals to pass to the render call
  # @return [String]
  def render_map_collection_index documents = nil, locals = {}
    #documents ||= @document_list
    content = "<div id='maps-selected' class='hidden'>"

    documents ||= @document_list
    documents.each do |document|
      content = content + "<span id='" + document["URI"] + "' ></span>"
    end
    
    content = content + "</div>"

    return content.html_safe

  end

  # Types are returned as URIs, we want them returned as
  # Currently not using this as utilizing labels instead of URIs
  # But might not to consider this later
  #  def render_type_display args
  #    require "net/http"
  #    typeList = ""
  #    types = args[:document][args[:field]] unless args[:document][args[:field]].blank?
  #    if types.present?
  #      jsonResult = get_linkeddata_result args[:document]
  #      if jsonResult != nil
  #        types.each do |type|
  #          typeName = ""
  #          thisTypeLabels = get_element_label(jsonResult, type)
  #          if thisTypeLabels != nil
  #            typeName = thisTypeLabels[0]["@value"]
  #          end
  #
  #          path=type.html_safe
  #          if typeList != "" and typeName != ""
  #            typeList << ", "
  #          end
  #          typeList << link_to(typeName, path)
  #          #without link
  #          #typeList << $typeName
  #        end # end of do
  #
  #        #Get the label for the most specific type
  #        #JSON Result is an array
  #        typeList.html_safe
  #      end # end of if json result ! = nil
  #    end # end of if types present
  #
  #  end

  ## The code below was utilized to make linked data requests as part of the page code
  ## but (a) for types, we are using strings and not URIs so we no longer need to make a
  ## linked data request for that, and (b) any linked data requests we do need can be done
  ## using an AJAX request as calling this code from within the page slowed everything down too much
  #  def get_linkeddata_result document
  #    require "net/http"
  #    result = []
  #    thisURI = document["URI"] unless document["URI"].blank?
  #
  #    #Rails.logger.debug("thisURI is here  #{thisURI}")
  #    #Check whether we have vitroIndividual in front of URI
  #    #Also see how we can forward climate-dev etc. to the correct URI on this machine
  #    if thisURI.present?
  #      result = get_linkeddata_result_for_url(thisURI)
  #      #Find the element which has the same id
  #    end
  #    return result
  #  end
  #
  #  def get_linkeddata_result_for_url thisURI
  #    require 'cgi'
  #
  #    thisURISplit = thisURI.split("/")
  #    localName = thisURISplit.last
  #    #This is a hack - we will need to find a way to also get the VIVO application name into the configuraiton
  #    #where we can access it, but we can currently depend on the fact that VIVO solr is vivo app name + "solr"
  #    vivo_app = Rails.application.config.vivo_app_url
  #    #Rails.logger.debug("Vivo app is " + vivo_app)
  #    #base_url = request.protocol + request.host
  #    #vivoappName = "nyccscvivo"
  #    thisURI = CGI::escape(thisURI)
  #    url = URI.parse(vivo_app + "/individual?uri=" + thisURI  + "&format=jsonld")
  #    #Rails.logger.debug("URL is #{url.inspect} " + url.to_s)
  #    #Need to include a way to check whether or not this URL exists so we can catch the error
  #    begin
  #      resp = Net::HTTP.get_response(url)
  #    rescue
  #      Rails.logger.debug("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!linked data response encountered error " + e.to_s)
  #      result = nil
  #    else
  #      #Rails.logger.debug("No error, do what you would normally do ")
  #
  #      data = resp.body
  #      result = JSON.parse(data)
  #
  #    end
  #    #Find the element which has the same id
  #    return result
  #  end
  #
  #  # Find the element corresponding to a specific URI, since the RDF returned includes both main RDF and rdf for the first level of elements
  #  # referenced
  #
  #  def get_element_by_uri_from_linkeddata_result(jsonResult, id)
  #
  #    jsonResult.each do |element|
  #      elementId = element["@id"]
  #      #Rails.logger.debug("element id is " + elementId)
  #      if elementId == id
  #        return element
  #      end
  #    end
  #    # if the element doesn't exist there, return nil
  #    return nil
  #  end
  #
  #  # get label
  #  def get_element_label_from_element element
  #    if element.is_a?(Hash) and element.has_key?("http://www.w3.org/2000/01/rdf-schema#label")
  #      return element["http://www.w3.org/2000/01/rdf-schema#label"]
  #    end
  #    return nil
  #  end
  #
  #  # Get values from the linked data result, focusing on literal values here
  #  # Primarily for display under search results
  #  def get_display_hash(jsonResult, document)
  #    #get the labels for properties
  #    displayProperties = get_linkeddata_property_labels()
  #    displayResult = []
  #    # Get the element we want which is the one for this document
  #    element = get_element_by_uri_from_linkeddata_result(jsonResult, document["URI"])
  #
  #    if element != nil
  #      #this is the element that contains information on the individual itself
  #      # loop through the element, the properties of the element will be represented either as string or array
  #      # each value in the array will be either a string or HASH
  #      # it appears the hash will only have string values at this point, and not nested hashes but this may be wrong
  #      element.each do |name, value|
  #        if name != "@type" and name != "@id" and name != "http://vitro.mannlib.cornell.edu/ns/vitro/0.7#modTime" and name != "http://www.w3.org/2000/01/rdf-schema#label"
  #          #get display name for the property
  #          displayName = get_single_property_label(displayProperties, name)
  #          # put the display name and value in the result hash
  #          if displayName != nil
  #            displayValue = get_element_literal_value(value)
  #
  #            if displayValue != nil and displayValue != ""
  #              Rails.logger.debug("Display value is " + displayValue)
  #              displayResult.push({
  #                "name" => name,
  #                "displayName" => displayName,
  #                "displayValue" => displayValue})
  #            end
  #          else
  #            Rails.logger.debug("No label returned for " + name)
  #          end
  #        end
  #      end # end of loop through the element itself
  #    else
  #      # Rails.logger.debug("Element not returned for id " + document["URI"])
  #    end
  #
  #    return displayResult
  #  end
  #
  #  # Get the literal value from the linked data element
  #  def get_element_literal_value value
  #    displayValue = nil
  #    if value.is_a?(Array)
  #      #if this is array, need to loop through
  #      value.each do |arrayValue|
  #        #   Rails.logger.debug("Array, looping through elements "  + arrayValue.to_s)
  #        # Check if the arrayValue is a hash or a string
  #        if arrayValue.is_a?(Hash)
  #          if arrayValue.has_key?("@value")
  #            #Specifically, if the hash has the element @value, we want that as this will give us a literal
  #            #Otherwise, we don't want to display it right now
  #            displayValue = arrayValue["@value"]
  #          end
  #        else
  #          displayValue = arrayValue
  #        end
  #      end
  #    else
  #      displayValue = value
  #    end
  #    return displayValue
  #  end
  #
  #  # for linked data elements that are referenced, we need the label if they exist
  #  # specifically for elements that have URIs
  #  def get_element_label(jsonResult, element_id)
  #    label = nil
  #    element = get_element_by_uri_from_linkeddata_result(jsonResult, element_id)
  #    if element != nil
  #      label = get_element_label_from_element(element)
  #      if label != nil
  #        Rails.logger.debug("Label returned is " + label.to_s)
  #      else
  #        Rails.logger.debug("Label returned nil for " + element_id)
  #      end
  #    else
  #      Rails.logger.debug("Element was not returned " + element_id)
  #    end
  #    return label
  #  end
  #
  #  #Not sure if there is a linked data way of getting the labels for properties themselves
  #  # The alternative is to run a sparql query for each property and get the preferred label
  #  #Instead, for now, just hardcoding the labels we do know we want to see
  #  def get_linkeddata_property_labels
  #    propertyLabelsHash = {
  #      "http://vivoweb.org/ontology/core#overview" => "Overview",
  #      "http://www.w3.org/2000/01/rdf-schema#label" => "Label",
  #      "http://purl.org/ontology/bibo/abstract" => "Abstract",
  #      "http://vivoweb.org/ontology/core#freetextKeyword " => "Keywords"
  #    }
  #  end
  #
  #  def get_single_property_label(property_labels_hash, property)
  #    property_label = nil
  #    if property_labels_hash.has_key?(property)
  #      return property_labels_hash[property]
  #    end
  #    return property_label
  #  end
  #
  #  # This is a uri
  #  def render_type_facet_display args
  #    displayLabel = args
  #
  #    #Rails.logger.debug("Args are #{args.inspect}")
  #    #jsonresult = get_linkeddata_result_for_url(args)
  #    #if jsonresult !=  nil
  #    #hopefully this exists and we can the label
  #    #label = get_element_label(jsonresult, args)
  #    #Rails.logger.debug("label element is #{label.inspect}")
  #    #if label != nil
  #    #  displayLabel = label[0]["@value"]
  #    #end
  #
  #    #end
  #    displayLabel
  #  end
  #
  ####
  ##We are using the code below to make a call to get the JSON for the profile and display that
  ## We can convert this into an AJAX request if need be
  ## CAll the VIVO profile and get information back as JSON
  ## Args include the doc id which can be converted into the URI
  def get_individual_profile_json thisURI
    require 'cgi'

    #This is a hack - we will need to find a way to also get the VIVO application name into the configuraiton
    #where we can access it, but we can currently depend on the fact that VIVO solr is vivo app name + "solr"
    vivo_app = Rails.application.config.vivo_app_url
    #Rails.logger.debug("Vivo app is " + vivo_app)
    result= {}
    thisURI = CGI::escape(thisURI)
    url = URI.parse(vivo_app + "/individual?uri=" + thisURI  + "&action=defaultJSON")
    #Rails.logger.debug("URL is #{url.inspect} " + url.to_s)
    begin
      resp = Net::HTTP.get_response(url)
    rescue
      Rails.logger.debug("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!linked data response encountered error " + e.to_s)
      result = nil
    else
      #Rails.logger.debug("No error, do what you would normally do ")

      data = resp.body

      result = JSON.parse(data)

    end
    return result
  end

  #Called from _show_default.html
  def retrieve_individual_profile_properties_for_show document
    all_properties = []
    thisURI = document["URI"] unless document["URI"].blank?

    if thisURI.present?
      result = get_individual_profile_json(thisURI)
      #Find the element which has the same id
      if result.has_key?("individual")
        individual = result["individual"]
        if individual.has_key?("wrappedObject") and
        individual["wrappedObject"].has_key?("propertyList") and
        individual["wrappedObject"]["propertyList"].has_key?("all")

          all_properties = individual["wrappedObject"]["propertyList"]["all"]

        end
      end
    end

    return all_properties
  end

  ## This returns a hash that can just be output on the page
  ## so the logic for parsing the properties and what should come out of that is here

  def display_all_properties(all_properties)
    display_profile_properties_hash = []
    # This is an array where each element is the property grou
    # and each property group is a hash which can have a list of properties
    # where each property is a hash which can have a statements array
    all_properties.each do|property_group|
      if property_group.has_key?("properties")
        properties = property_group["properties"]
        properties.each do |property|
          property_uri = property["uri"]
          # If we want this property to be displayed on the page
          if isVisibleProperty(property_uri)
            #Rails.logger.debug("---------------->Property is #{property.inspect}")
            property_name = property["name"]
            # Data property or object property which can be either collated or uncollated
            property_type = property["type"]
            # For now, we are just printing out the data
            # But I am also saving the template name for reference
            # It may be useful with respect to our own templates
            # Works for data properties and uncollated object properties
            property_template_name = property["template"]
            statements = property["statements"]
            if(property_type == "object" and property["collatedBySubclass"] == true and property.has_key?("subclasses"))
              subclasses = property["subclasses"]
              # We are going to put everything into the same master statements array for now
              # although we may want to pull this out separately later
              statements = []
              subclasses.each do|subclass|
                Rails.logger.debug("Subclass exists #{subclass.inspect}")
                if(subclass.has_key?("statements"))
                  Rails.logger.debug("Subclass does have key statements")
                  statements += subclass["statements"]
                else
                  Rails.logger.debug("Subclass does NOT have key statements")
                end
                Rails.logger.debug("Statements after subclass is now #{statements.inspect}")
              end

            end

            if (statements != nil and statements.length > 0)
              display_statement_values_per_property = Array.new
              statements.each do|statement|
                Rails.logger.debug("Statement is #{statement.inspect}")
                display_statement_values = getStatementDisplay(statement, property_uri, property["domainUri"], property["rangeUri"], property_type, property_template_name)

                ## Testing out partial rendering
                ## display_statement_values returns a string, here we are going to store these in an array
                ## because we don't want to repeat the property name in case of multiple statements for the same property
                display_statement_values_per_property << display_statement_values

              end #end loop through statements
              # The hash should now be the property name plus an ARRAY of applicable statements
              display_profile_properties_hash << {"property_name" => property_name.titleize,
                "property_URI" => property_uri,
                "property_display_values"=> display_statement_values_per_property}
              Rails.logger.debug("Display profile properties hash is now #{display_profile_properties_hash.inspect}")
            end #if statements
          end # if visible property
        end #do properties
      end #if property_group.has_key
    end #do all_properties
    return display_profile_properties_hash
  end

  # We need something similar to above but for specific properties that we want to show first
  # Example: Any webpage links, Description/abstract/overview
  # This returns a hash, with priority key linking to properties that should be displayed on top
  # and the other key linking to properties that should be displayed below
  def get_display_by_priority(display_profile_properties_hash)
    priority_list = []
     non_priority_list = []
    display_profile_properties_hash.each do|statement_hash|
      if isPriorityProperty(statement_hash["property_name"].downcase)
        priority_list << statement_hash
      else 
        non_priority_list << statement_hash
      end
    end
    return {"priority" => priority_list, "non_priority" => non_priority_list}
  end

  #Is this a property that should be displayed at the top of the page?
  def isPriorityProperty(property_name)
    # We may want to change this to URIs later although then we would have to be careful about handling faux properties
    priority_property_names = ["alternate title", "webpage", "abstract"];
      Rails.logger.debug("Property name is " + property_name)
    if priority_property_names.include?(property_name)
      Rails.logger.debug("Is priority")
      return true
    end
    return false
  end
  


  ## Determine which partial to use based on the statement
  def getStatementDisplay(statement, property_uri, property_domain_uri, property_range_uri, property_type, property_template_name)
    display_statement_values = ""
    # Data property
    if(statement.has_key?("value") and statement["value"] != nil and statement["value"].gsub(/\s+/, "") != "")
      return statement["value"]
    end #if statement.has_key
    # if object, we may be in for a different situation
    if(property_type == "object" and statement.has_key?("allData"))
      # Print out all the data
      partial_name = pickPartial(property_uri, property_domain_uri, property_range_uri, property_type, property_template_name)
      display_statement_values = render(partial: partial_name, locals: {statement: statement,
        property_uri: property_uri,
        property_domain_uri: property_domain_uri,
        property_range_uri: property_range_uri,
        property_type: property_type, property_template_name: property_template_name})

    end

    return display_statement_values
  end

  # pick partial
  def pickPartial(property_uri, property_domain_uri, property_range_uri, property_type, property_template_name)
    partial_name = "catalog/profile/default_object_property"
    if(property_template_name == "propStatement-authorInAuthorship.ftl")
      partial_name = "catalog/profile/author_in_authorship"
    elsif(property_template_name == "propStatement-fullName.ftl")
      partial_name = "catalog/profile/full_name"
    elsif(property_template_name == "propStatement-informationResourceInAuthorship.ftl")
      partial_name = "catalog/profile/resource_in_authorship"
    elsif(property_template_name == "propStatement-webpage.ftl")
      partial_name = "catalog/profile/webpage"
    else

    end
    return partial_name
  end

  #  Certain properties we don't want displayed, e.g. data variables for a data product
  #or GIS-specific metadata

  def isVisibleProperty(property_uri)
    doNotShowProperties = ["http://nyclimateclearinghouse.org/ontology/hasDataVariable",
      "http://nyclimateclearinghouse.org/ontology/isHighlightedContent",
      "http://www.w3.org/2004/02/skos/core#inScheme",
      "http://nyclimateclearinghouse.org/ontology/informationApplicableToSector",
      "http://nyclimateclearinghouse.org/ontology/generatedBy"];
    if doNotShowProperties.include?(property_uri)
      return false;
    end

    return true;
  end
  
  ## Is this a specific type, e.g. GIS layer or data product
  ## We have access to type labels which we should be able to employ
  def isDocumentOfType(document, type_uri)
    #Rails.logger.debug("Document type #{document['type'].inspect}")
    if(document["type"].include?(type_uri))
      return true
    end
    return false
  end
  
  def isGISLayer(document)
    return isDocumentOfType(document, "http://nyclimateclearinghouse.org/ontology/gisMappingLayer")
  end
  
  def isDataProduct(document)
    return isDocumentOfType(document, "http://nyclimateclearinghouse.org/ontology/DataRetrievalService")

  end

end
