#As described here https://github.com/projectblacklight/blacklight/wiki/Providing-your-own-view-templates
# Attempting to get name of individual
module ConfigurationHelper
  include Blacklight::ConfigurationHelperBehavior
 
  # Commenting out for now to test if everything works correctly now that we are using a separate name_display field
  # whose value is only added once
  
  # Used in the document list partial (search view) for creating a link to the document show action
 # def document_show_link_field document=nil
    # blacklight_config.view_config(document_index_view_type).title_field will give you the name of the display field, i.e. 'name_display'
    # but reading this in from Solr will give you a comma-delimited list
    # NOTE: This is no longer the case now that Solr has been updated to only have one value for name_display
    # but leaving this in for future reference until production time
 #   title_field_name= blacklight_config.view_config(document_index_view_type).title_field
 #   name_array = document[title_field_name]
 #   name_array[0]
    #blacklight_config.view_config(document_index_view_type).title_field.try(:to_sym)
 # end
 


  
end