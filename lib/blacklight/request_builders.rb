require "#{Blacklight.root}/lib/blacklight/request_builders.rb"

module Blacklight::RequestBuilders
  extend ActiveSupport::Concern
  ##
  # Add any existing facet limits, stored in app-level HTTP query
  # as :f, to solr as appropriate :fq query.
  # We are overriding this to spend spatial query parameters
  def add_facet_fq_to_solr(solr_parameters, user_params)
    #Rails.logger.debug(">>Overriding add facet fq params are SOLR: #{solr_parameters} AND USER:#{user_params}")

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

    ##Handling spatial search sort by distnace here
    ## Commenting out for now but will put back in when handling sorting
    if (user_params["spatialsort"])
      spatialsort = user_params["spatialsort"]
      #Need to pass this along as select?q=*%3A*&fq={!geofilt}&sfield=solr_pt&pt=42,-75&sort=geodist%28%29%20asc&d=1000&filter=false
      #solr_parameters.append_filter_query "{!geofilt}"
      #This field should contain the point latitude longitude for the indexed item
      solr_parameters["sfield"] = "solr_pt"
      #The parameter passed should be the point we want to sort by
      solr_parameters["pt"] = spatialsort
      #solr_parameters["sort"]= "geodist() asc"
      user_params["sort"]= "geodist() asc"

      #solr_parameters["d"] = "10"
      #we want to sort but not filter by distance
      #solr_parameters["filter"] = false
    end

    ##  This tests results using a boost instead of sorting completely by geodist() asc
    if(user_params["spatialboost"])
      spatialboost = user_params["spatialboost"]
      solr_parameters["sfield"] = "solr_pt"
      solr_parameters["pt"] = spatialboost
      # Isn't this normal anyway?
      user_params["sort"]= "score desc"
      # Passing this along in user parameters as should get copied to solr parameters
      user_params["bf"] = "recip(geodist(),2,200,20)"
    end
  end

  #For debugging
  # copy sorting params from BL app over to solr
  #   def add_sorting_to_solr(solr_parameters, user_params)
  #     Rails.logger.debug("##############Adding sorting parameters to solr --  #{solr_parameters} -- #{user_params}")
  #     Rails.logger.debug("default sort field = #{blacklight_config.default_sort_field.inspect}")
  #     Rails.logger.debug("blacklight field sort fields #{blacklight_config.sort_fields.inspect} ")
  #     if user_params[:sort].blank? and sort_field = blacklight_config.default_sort_field
  #       # no sort param provided, use default
  #       Rails.logger.debug("user params sort is blank")
  #       solr_parameters[:sort] = sort_field.sort unless sort_field.sort.blank?
  #     elsif sort_field = blacklight_config.sort_fields[user_params[:sort]]
  #       Rails.logger.debug("Blacklight config sore fields includes the one we used")
  #       # check for sort field key
  #       solr_parameters[:sort] = sort_field.sort unless sort_field.sort.blank?
  #     else
  #       # just pass the key through
  #       Rails.logger.debug("Just pass parameter through")
  #       solr_parameters[:sort] = user_params[:sort]
  #     end
  #   end

end
