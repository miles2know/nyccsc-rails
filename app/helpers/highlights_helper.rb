module HighlightsHelper
  def render_highlights (data, type)
    #May need to revisit how this is done, currently saved in a class
    resource_map = ResourceMappings.new()
    type_uri = resource_map.getHighlightMapping(type)
    @html = '<ul class="fa-ul">'
    i = 0

    data.each_solution do |solution|
      collectionURI = solution["collectionURI"].to_s
      resourceURI = solution["resourceURI"].to_s
      resourceLabel = solution["resourceLabel"].to_s
      if collectionURI == type_uri
        @html += '<li><a href="/catalog/doc?DocId=vitroIndividual:' + resourceURI + '"><i class="fa-li fa fa-file-text-o"></i> ' + resourceLabel + '</a></li>'
        i += 1
      end
      break if i >= 3
    end

    @html += '</ul>'

    return @html.html_safe

  end

  def render_abstract (data, type)
    #Initialize this in case no abstract is returned
    @html = ""
    resource_map = ResourceMappings.new()
    type_uri = resource_map.getHighlightMapping(type)
    i = 0
    data.each_solution do |solution|
      collectionURI = solution["collectionURI"].to_s
      if(collectionURI == type_uri and solution.bound?("collectionAbstract"))
        collectionAbstract = solution["collectionAbstract"]
        if(collectionAbstract != nil && i == 0)
          @html = '<div>' + collectionAbstract.to_s + '</div>'
          i += 1
        end
      end
      break if i >= 1
    end
    return @html.html_safe
  end
  
 

end