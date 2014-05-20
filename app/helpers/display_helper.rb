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
      $types = args[:document][args[:field]] unless args[:document][args[:field]].blank?
      if $types.present?
         $jsonResult = get_linkeddata_result args[:document]
         $types.each do |type|
           $typeName = ""
           #Get type name from json result
           $jsonResult.each do |element|
                            $elementId = element["@id"]
                            if $elementId == type
                               $typeLabel = element["http://www.w3.org/2000/01/rdf-schema#label"]
                               $typeName = $typeLabel[0]["@value"]
                            end      
           end
           
           path=type.html_safe
           if typeList != "" and $typeName != ""
              typeList << ", "
           end
           typeList << link_to($typeName, path)
           
         end
     
     #Get the label for the most specific type
     	
     	#This is a hack because the URI is currently NOT the URL for the individual
     	#TODO: change this so this works more consistently with the URI later
     	#url = URI.parse("http://climate-dev.library.cornell.edu:8080/vivo/individual/" + $localName  + "?format=jsonld")
     #JSON Result is an array
          typeList.html_safe
     end
    
  end
 
  def get_linkeddata_result document
      require "net/http"
      result = []
     $URI = document["URI"] unless document["URI"].blank?
     if $URI.present?
     	$URISplit = $URI.split("/")
     	$localName = $URISplit.last
     	#This is a hack because the URI is currently NOT the URL for the individual
     	#TODO: change this so this works more consistently with the URI later
     	url = URI.parse("http://climate-dev.library.cornell.edu:8080/vivo/individual/" + $localName  + "?format=jsonld")
     	resp = Net::HTTP.get_response(url)
     	data = resp.body
     	result = JSON.parse(data)
     	#Find the element which has the same id
     end 
     return result
  end
 
 
end
