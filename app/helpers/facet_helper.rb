# Helping with display facets etc.
# Allow overriding methods in facets_helper_behavior
module FacetHelper
  include Blacklight::FacetsHelperBehavior
  
  def facet_value_for_facet_item item
    # Check and see
    #Rails.logger.debug("Item #{item.inspect}")
    if item.respond_to? :value
      value = item.value
    else
      value = item
    end
  end
  
  ##
    # Get the displayable version of a facet's value
    # 
    # @param [Object] field
    # @param [String] item value
    # @return [String] 
    def facet_display_value field, item
      facet_config = facet_configuration_for_field(field)
      #Rails.logger.debug("facet_display_value:Facet configuration #{facet_config.inspect}")
      #Rails.logger.debug("facet_display_value:Item is #{item.inspect}")
      value = if item.respond_to? :label
        #Rails.logger.debug("facet_display_value:Item responds to label")
        value = item.label
      else
        #Rails.logger.debug("facet_display_value:Get value for facet item")
        facet_value_for_facet_item(item)
      end
  
      display_label = case
        when facet_config.helper_method
          #Rails.logger.debug("facet_display_value:Helper method")
          
          display_label = send facet_config.helper_method, value 
        when (facet_config.query and facet_config.query[value])
          #Rails.logger.debug("facet_display_value:facet config query and query[value'")
          display_label = facet_config.query[value][:label]     
        when facet_config.date
          #Rails.logger.debug("facet_display_value:DAte")
          localization_options = {}
          localization_options = facet_config.date unless facet_config.date === true
          display_label = l(value.to_datetime, localization_options)
        else
          #Rails.logger.debug("facet_display_value:Value")
          value
      end
    end
  
  
end