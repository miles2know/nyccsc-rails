#As described here https://github.com/projectblacklight/blacklight/wiki/Providing-your-own-view-templates
# Seeing how URLs are handled
module UrlHelper
  include Blacklight::UrlHelperBehavior
  
  ##
  # Extension point for downstream applications
  # to provide more interesting routing to
  # documents
  
  # We are overriding this to enable passing the DocId parameter in the url should the DocId field exist
  def url_for_document doc, options = {}
    require 'cgi'
    if respond_to?(:blacklight_config) and
        blacklight_config.show.route and
        (!doc.respond_to?(:to_model) or doc.to_model.is_a? SolrDocument)
      route = blacklight_config.show.route.merge(action: :show, id: doc).merge(options)
      route[:controller] = controller_name if route[:controller] == :current
      route
    else
      # This branch is the one executed for a search results index page 
        if doc and doc["DocId"]
          # IF doc exists and has this field
          Rails.logger.debug("Route - returning doc #{doc['DocId']}" )
          # One mechanism is to return the doc itself (Ruby can recognize that it is an object and create the appropriate url)
          # In that case, the url would be catalog/id
          # but here, we want to ensure we pass the DocId parameter and we are escaping the ID in the parameter 
          # Additionally, we tried updating the doc id to be the escaped uri, but that did  not work correctly
          # What we are doing here is passing the local name (which has no slashes, etc. that could throw either apache or ruby off)
          # and then utilizing the normal behavior for showing a document but passing in the parameter as well
          # Code on the solr document helper side knows to expect that parameter and utilize that for the solr document id if it exists
          # Not passing in a local name in the url would make the code expect this was some search query, and without a query it jsut
          # goes back to the front page
          id = doc["DocId"]
          uri_sliced = id.split("/")
          local_name = uri_sliced.last
          uri_escaped = CGI::escape(id)
          # This was there originally before but let's try it without this, this would be useful if we were passing back doc
          # instead of passing the parameter in the URL
          # doc["id"] = local_name 
          "/catalog/" + local_name + "?DocId=" + id
         else       
           #Does what this code would do without our updates 
          doc                      
        end
          
      end
  end
 

  
 


  
end