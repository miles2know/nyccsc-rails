module DisplayHelper
  # Renders the link to the full text file
  def render_document_link args

    fulltext_path = args[:document][args[:field]] unless args[:document][args[:field]].blank?
    if fulltext_path.present?
      # This all hinges on symbolic link in public directory (to /teeal/documents)
      path = "/documents/#{fulltext_path}"
      link_to path do
        '<i class="icon-file"></i> Full text'.html_safe
      end
    end
  end

  # Render information from linked data request/
  def render_linkeddata_display args
    #result = get_linkeddata_result args[:document]
  end

  # Types are returned as URIs, we want them returned as
  def render_type_display args
    require "net/http"
    typeList = ""
    types = args[:document][args[:field]] unless args[:document][args[:field]].blank?
    if types.present?
      jsonResult = get_linkeddata_result args[:document]
      types.each do |type|
        typeName = ""
        thisTypeLabels = get_element_label(jsonResult, type)
        if thisTypeLabels != nil
          typeName = thisTypeLabels[0]["@value"]
        end
       

        path=type.html_safe
        if typeList != "" and typeName != ""
          typeList << ", "
        end
        typeList << link_to(typeName, path)
        #without link
        #typeList << $typeName
      end

      #Get the label for the most specific type
      #JSON Result is an array
      typeList.html_safe
    end

  end

  def get_linkeddata_result document
    require "net/http"
    result = []
    $URI = document["URI"] unless document["URI"].blank?

    Rails.logger.debug("$URI is here  #{$URI}")
    #Check whether we have vitroIndividual in front of URI
    #Also see how we can forward climate-dev etc. to the correct URI on this machine
    if $URI.present?
      $URISplit = $URI.split("/")
      $localName = $URISplit.last
      @base_url = request.protocol + request.host
      @vivoappName = "nyccscvivo"
      url = URI.parse(@base_url + ":8080/" + @vivoappName + "/individual?uri=" + $URI  + "&format=jsonld")
      #Need to include a way to check whether or not this URL exists so we can catch the error

      resp = Net::HTTP.get_response(url)
      data = resp.body
      result = JSON.parse(data)
      #Find the element which has the same id
    end
    return result
  end

  # Find the element corresponding to a specific URI, since the RDF returned includes both main RDF and rdf for the first level of elements
  # referenced

  def get_element_by_uri_from_linkeddata_result(jsonResult, id)

    jsonResult.each do |element|
      elementId = element["@id"]
        #Rails.logger.debug("element id is " + elementId)
      if elementId == id
        return element
      end
    end
    # if the element doesn't exist there, return nil
    return nil
  end

  # get label
  def get_element_label_from_element element
    if element.is_a?(Hash) and element.has_key?("http://www.w3.org/2000/01/rdf-schema#label")
      return element["http://www.w3.org/2000/01/rdf-schema#label"]
    end
    return nil
  end

  # Get values from the linked data result, focusing on literal values here
  # Primarily for display under search results
  def get_display_hash(jsonResult, document)
    #get the labels for properties 
    displayProperties = get_linkeddata_property_labels()
    displayResult = []
    # Get the element we want which is the one for this document
    element = get_element_by_uri_from_linkeddata_result(jsonResult, document["URI"])
   
    if element != nil
      #this is the element that contains information on the individual itself
      # loop through the element, the properties of the element will be represented either as string or array
      # each value in the array will be either a string or HASH
      # it appears the hash will only have string values at this point, and not nested hashes but this may be wrong
      element.each do |name, value|
        if name != "@type" and name != "@id" and name != "http://vitro.mannlib.cornell.edu/ns/vitro/0.7#modTime" and name != "http://www.w3.org/2000/01/rdf-schema#label"
          #get display name for the property
          displayName = get_single_property_label(displayProperties, name)
          # put the display name and value in the result hash
          if displayName != nil
            displayValue = get_element_literal_value(value)
           
            if displayValue != nil and displayValue != ""
              Rails.logger.debug("Display value is " + displayValue)
              displayResult.push({
                "name" => name,
              "displayName" => displayName, 
              "displayValue" => displayValue})
            end
          else
            Rails.logger.debug("No label returned for " + name)
          end
        end
      end # end of loop through the element itself
    else
      Rails.logger.debug("Element not returned for id " + document["URI"])
    end

    return displayResult
  end

  # Get the literal value from the linked data element
  def get_element_literal_value value
    displayValue = nil
    if value.is_a?(Array)
      #if this is array, need to loop through
      value.each do |arrayValue|
        Rails.logger.debug("Array, looping through elements "  + arrayValue.to_s)
        # Check if the arrayValue is a hash or a string
        if arrayValue.is_a?(Hash)
          if arrayValue.has_key?("@value")
            #Specifically, if the hash has the element @value, we want that as this will give us a literal
            #Otherwise, we don't want to display it right now
            displayValue = arrayValue["@value"]
          end
        else
          displayValue = arrayValue
        end
      end
    else
      displayValue = value
    end
    return displayValue
  end

  # for linked data elements that are referenced, we need the label if they exist
  # specifically for elements that have URIs
  def get_element_label(jsonResult, element_id)
    label = nil
    element = get_element_by_uri_from_linkeddata_result(jsonResult, element_id)
    if element != nil
      label = get_element_label_from_element(element)
      if label != nil
        Rails.logger.debug("Label returned is " + label.to_s)
      else
        Rails.logger.debug("Label returned nil for " + element_id)
      end
    else
      Rails.logger.debug("Element was not returned " + element_id)
    end
    return label
  end

  #Not sure if there is a linked data way of getting the labels for properties themselves
  # The alternative is to run a sparql query for each property and get the preferred label
  #Instead, for now, just hardcoding the labels we do know we want to see
  def get_linkeddata_property_labels
    propertyLabelsHash = {
    "http://vivoweb.org/ontology/core#overview" => "Overview",
     "http://www.w3.org/2000/01/rdf-schema#label" => "Label",
     "http://purl.org/ontology/bibo/abstract" => "Abstract",
     "http://vivoweb.org/ontology/core#freetextKeyword " => "Keywords"
    }
  end
  
  def get_single_property_label(property_labels_hash, property)
    property_label = nil
    if property_labels_hash.has_key?(property)
      return property_labels_hash[property]
    end
    return property_label
  end
end
