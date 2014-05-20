# -*- encoding : utf-8 -*-
#
class CatalogController < ApplicationController

  include Blacklight::Catalog

  configure_blacklight do |config|
    ## Default parameters to send to solr for all search-like requests. See also SolrHelper#solr_search_params
    config.default_solr_params = {
      :qt => 'search',
      :rows => 10
    }

    ## Default parameters to send on single-document requests to Solr. These settings are the Blackligt defaults (see SolrHelper#solr_doc_params) or
    ## parameters included in the Blacklight-jetty document requestHandler.
    #
    #config.default_document_solr_params = {
    #  :qt => 'document',
    #  ## These are hard-coded in the blacklight 'document' requestHandler
    #  # :fl => '*',
    #  # :rows => 1
    #  # :q => '{!raw f=id v=$id}'
    #}

    # solr field configuration for search results/index views
    config.index.title_field = 'name_display'
    config.index.display_type_field = 'type'

    # solr field configuration for document/show views
    config.show.title_field = 'name_display'
    config.show.display_type_field = 'type'

    #config.add_facet_field 'type_facet', :label => 'Type', :single => true, :limit => 10
    #config.add_facet_field 'type', :label => 'Type',  :limit => 10
    config.add_facet_field 'subjectarea_facet', :label => 'Subject Area', :limit => 10
    config.add_facet_field 'keyword_facet', :label => 'Keyword', :limit => 10
    config.add_facet_field 'sector_facet', :label => 'Sector', :limit => 10
    config.add_facet_field 'hazard_facet', :label => 'Hazard', :limit => 10
    config.add_facet_field 'strategy_facet', :label => 'Strategy', :limit => 10
    config.add_facet_field 'risk_facet', :label => 'Risk', :limit => 10
    config.add_facet_field 'vulnerability_facet', :label => 'Vulnerability', :limit => 10
    config.add_facet_field 'author_facet', :label => 'Author', :limit => 10

    # solr fields that will be treated as facets by the blacklight application
    #   The ordering of the field names is the order of the display
    #
    # Setting a limit will trigger Blacklight's 'more' facet values link.
    # * If left unset, then all facet values returned by solr will be displayed.
    # * If set to an integer, then "f.somefield.facet.limit" will be added to
    # solr request, with actual solr request being +1 your configured limit --
    # you configure the number of items you actually want _displayed_ in a page.
    # * If set to 'true', then no additional parameters will be sent to solr,
    # but any 'sniffed' request limit parameters will be used for paging, with
    # paging at requested limit -1. Can sniff from facet.limit or
    # f.specific_field.facet.limit solr request params. This 'true' config
    # can be used if you set limits in :default_solr_params, or as defaults
    # on the solr side in the request handler itself. Request handler defaults
    # sniffing requires solr requests to be made with "echoParams=all", for
    # app code to actually have it echo'd back to see it.
    #
    # :show may be set to false if you don't want the facet to be drawn in the
    # facet bar
  

    # Have BL send all facet field names to Solr, which has been the default
    # previously. Simply remove these lines if you'd rather use Solr request
    # handler defaults, or have no facets.
    config.add_facet_fields_to_solr_request!

    # solr fields to be displayed in the index (search results) view
    #   The ordering of the field names is the order of the display
    #config.add_index_field 'name_display', :label => 'Name', :helper_method => :render_name_display
    config.add_index_field 'mostSpecificTypeURIs', :label => 'Type', :link_to_search => true, :helper_method => :render_type_display
    config.add_index_field 'URI', :label => '', :helper_method => :render_linkeddata_display
    config.add_index_field 'subjectarea_display', :label => 'Subject Area'
    config.add_index_field 'keyword_display', :label => 'Keyword'
    config.add_index_field 'author_display', :label => 'Author'
    # "fielded" search configuration. Used by pulldown among other places.
    # For supported keys in hash, see rdoc for Blacklight::SearchFields
    #
    # Search fields will inherit the :qt solr request handler from
    # config[:default_solr_parameters], OR can specify a different one
    # with a :qt key/value. Below examples inherit, except for subject
    # that specifies the same :qt as default for our own internal
    # testing purposes.
    #
    # The :key is what will be used to identify this BL search field internally,
    # as well as in URLs -- so changing it after deployment may break bookmarked
    # urls.  A display label will be automatically calculated from the :key,
    # or can be specified manually to be different.

    # This one uses all the defaults set by the solr request handler. Which
    # solr request handler? The one set in config[:default_solr_parameters][:qt],
    # since we aren't specifying it otherwise.

    config.add_search_field 'all_fields', :label => 'All Fields'


    # Now we see how to over-ride Solr request handler defaults, in this
    # case for a BL "search field", which is really a dismax aggregate
    # of Solr search fields.

    config.add_search_field('name') do |field|
      # solr_parameters hash are sent to Solr as ordinary url query params.
      field.solr_parameters = { :'spellcheck.dictionary' => 'name' }

      # :solr_local_parameters will be sent using Solr LocalParams
      # syntax, as eg {! qf=$title_qf }. This is neccesary to use
      # Solr parameter de-referencing like $title_qf.
      # See: http://wiki.apache.org/solr/LocalParams
      field.solr_local_parameters = {
        :qf => '$name_qf',
        :pf => '$name_pf'
      }
    end

 
    # "sort results by" select (pulldown)
    # label in pulldown is followed by the name of the SOLR field to sort by and
    # whether the sort is ascending or descending (it must be asc or desc
    # except in the relevancy case).
    #config.add_sort_field 'score desc, pub_date_sort desc, title_sort asc', :label => 'relevance'
    #config.add_sort_field 'pubDate_sort desc, title_sort asc', :label => 'year'
    #config.add_sort_field 'author_sort asc, title_sort asc', :label => 'author'
    #config.add_sort_field 'title_sort asc, pub_date_sort desc', :label => 'title'
    #config.add_sort_field 'name_sort asc', :label => 'name'

    # If there are more than this many search results, no spelling ("did you
    # mean") suggestion is offered.
    config.spell_max = 5
  end
  #Overriding
    
     # get single document from the solr index
    def show
    Rails.logger.debug("Trying to override show for the heck of it, inspect params #{params.inspect}")
      @response, @document = get_solr_response_for_doc_id    

      respond_to do |format|
        format.html {setup_next_and_previous_documents}

        format.json { render json: {response: {document: @document}}}

        # Add all dynamically added (such as by document extensions)
        # export formats.
        @document.export_formats.each_key do | format_name |
          # It's important that the argument to send be a symbol;
          # if it's a string, it makes Rails unhappy for unclear reasons. 
          format.send(format_name.to_sym) { render :text => @document.export_as(format_name), :layout => false }
        end
        
      end
    end

    # updates the search counter (allows the show view to paginate)
    #OVerriding to enable parameters to pass through
    def update
        Rails.logger.debug("Routing through update")
      search_session[:counter] = params[:counter]
      #Check if there is a DocId parameter and pass that along, this is for passing a URL
      if params["DocId"]
         redirect_to :action => "show", :status => 303, :DocId => params["DocId"]
      else 
           redirect_to :action => "show", :status => 303
      end
      
    end

end
