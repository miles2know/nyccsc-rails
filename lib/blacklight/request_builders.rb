require "#{Blacklight.root}/lib/blacklight/request_builders.rb"
module Blacklight::RequestBuilders
  extend ActiveSupport::Concern

##
  # Add any existing facet limits, stored in app-level HTTP query
  # as :f, to solr as appropriate :fq query. 
  # We are overriding this to spend spatial query parameters
  def add_facet_fq_to_solr(solr_parameters, user_params)   
    Rails.logger.debug(">>Overriding add facet fq params are SOLR: #{solr_parameters} AND USER:#{user_params}")

    # convert a String value into an Array
    if solr_parameters[:fq].is_a? String
      solr_parameters[:fq] = [solr_parameters[:fq]]
    end

    # :fq, map from :f. 
    if ( user_params[:f])
      f_request_params = user_params[:f] 
      
      f_request_params.each_pair do |facet_field, value_list|
        Array(value_list).each do |value|
          solr_parameters.append_filter_query facet_value_to_fq_string(facet_field, value)
        end              
      end      
    end
    
  ##Handling spatial search here
     if (user_params["spatialrange"])
       spatialrange = user_params["spatialrange"]
       #Need to pass this along as fq=solr_bbox:the value that got passed
       #so the url should look like spatialrange=[lat,long TO lat,long] and will become fq=solr_bbox:[lat_long TO lat,long]
       solr_parameters.append_filter_query "solr_bbox:" + spatialrange
     end
     
  
  end

end
