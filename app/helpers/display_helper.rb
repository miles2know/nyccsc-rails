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

  ##Helper method for rendering type information
  ##This helper method needs to be associated with a field that should always appear, example the most specific type
  ## Individuals not within a classgroup (i.e. among the classgroups we are looking for) will also need to 
  ## trigger this method and associating this method with the classgroup will not trigger the method for those individuals
  def render_index_type args
    returnvalue = ""
    doc = args[:document]
    #  Rails.logger.debug(">>>>>>>>>>>>>>RENDER INDEX DocID is " + doc["DocId"])
    # Different fields hold different kinds of information, e.g. the classgroup pivot and type fields
    # include the classgroups and corresponding types that we want to show under the types facet
    #These fields will be empty for individuals that do not have types that correspond to those classgroups
    #The most specific type should still be available for those individuals so we are including that here
    classgroup_pivot_field = "classgroup_pivot_facet"
    type_pivot_field = "type_pivot_facet"
    most_specific_type_field = "most_specific_type_label_facet"
    classgroup = []
    type_pivot = []
    most_specific_type = []
    ##Check what fields are available in doc, if classgroup and type_pivot are available use those
    ##Otherwise use most specific type
    if(doc.has_key?(classgroup_pivot_field))
      #Returns array
      classgroup = doc[classgroup_pivot_field]
      #Rails.logger.debug("Classgroup exists " + classgroup.join(","))
      if(doc.has_key?(type_pivot_field))
        #Returns array
        type_pivot = doc[type_pivot_field]
        #Rails.logger.debug("Type pivot exists " + type_pivot.join(","))
      end
    elsif (doc.has_key?(most_specific_type_field))
      most_specific_type = doc[most_specific_type_field]
      #Rails.logger.debug("Most specific type " + most_specific_type.join(","))
    end

    if(!classgroup.empty?)
      classgroup_html =  generateTypeFacetLinks(classgroup_pivot_field, classgroup).join(" ,")
      if(!type_pivot.empty?)
        #Loop through type pivot and setup urls
        type_pivot_html = generateTypeFacetLinks(type_pivot_field, type_pivot).join(" ,")
        
        returnvalue = type_pivot_html + " (" + classgroup_html + ")"
      else
        returnvalue = classgroup_html
      end
    elsif(!most_specific_type.empty?)
      most_specific_type_html = generateTypeFacetLinks(most_specific_type_field, most_specific_type).join(" ,")
      returnvalue = most_specific_type_html
    end
    returnvalue.html_safe
  end

  #facetname = name of the facet and facetvalues = array of values
  def generateTypeFacetLinks(facetname, facetvalues)
    returnhtml = []
    facetvalues.each do|facetvalue|
      faceturl = "/catalog?f[" + facetname + "][]=" + facetvalue
      returnhtml << "<a href='" + URI::escape(faceturl) + "'>" + facetvalue + "</a>"
    end
    return returnhtml
  end
  
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
                #Rails.logger.debug("Subclass exists #{subclass.inspect}")
                if(subclass.has_key?("statements"))
                  #Rails.logger.debug("Subclass does have key statements")
                  statements += subclass["statements"]
                else
                  #Rails.logger.debug("Subclass does NOT have key statements")
                end
                #Rails.logger.debug("Statements after subclass is now #{statements.inspect}")
              end

            end

            if (statements != nil and statements.length > 0)
              display_statement_values_per_property = Array.new
              statements.each do|statement|
                #Rails.logger.debug("Statement is #{statement.inspect}")
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
              #Rails.logger.debug("Display profile properties hash is now #{display_profile_properties_hash.inspect}")
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
    #Rails.logger.debug("Property name is " + property_name)
    if priority_property_names.include?(property_name)
      #Rails.logger.debug("Is priority")
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
    elsif(property_template_name == "propStatement-editorship.ftl")
      partial_name = "catalog/profile/editorship"
    elsif(property_template_name == "propStatement-informationResourceInEditorship.ftl")
      partial_name = "catalog/profile/resource_in_editorship"
    elsif(property_template_name == "propStatement-dateTimeValue.ftl")
      partial_name = "catalog/profile/date_time_value"
    elsif(property_template_name == "propStatement-dateTimeInterval.ftl")
      partial_name = "catalog/profile/date_time_interval"
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
      "http://nyclimateclearinghouse.org/ontology/generatedBy",
      "http://nyclimateclearinghouse.org/ontology/layerType",
      "http://nyclimateclearinghouse.org/ontology/colorHue",
      "http://nyclimateclearinghouse.org/ontology/iconClusterImageURL",
      "http://nyclimateclearinghouse.org/ontology/iconImageURL",
      "http://nyclimateclearinghouse.org/ontology/layerDataProp",
      "http://nyclimateclearinghouse.org/ontology/layerGeometry",
      "http://nyclimateclearinghouse.org/ontology/layerIconType",
      "http://nyclimateclearinghouse.org/ontology/layerRangeIntervals",
      "http://nyclimateclearinghouse.org/ontology/legendImageURL",
      "http://nyclimateclearinghouse.org/ontology/effectAssociatedSector",
      "http://vivoweb.org/ontology/core#hasSubjectArea"];
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
