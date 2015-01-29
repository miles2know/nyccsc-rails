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

  ##
  # Standard display of a facet value in a list. Used in both _facets sidebar
  # partial and catalog/facet expanded list. Will output facet value name as
  # a link to add that to your restrictions, with count in parens.
  #
  # @param [Blacklight::SolrResponse::Facets::FacetField]
  # @param [String] facet item
  # @param [Hash] options
  # @option options [Boolean] :suppress_link display the facet, but don't link to it
  # @return [String]
  def render_facet_value(facet_solr_field, item, options ={})
    path = search_action_path(add_facet_params_and_redirect(facet_solr_field, item))
    content_tag(:span, :class => "facet-label") do
      link_to_unless(options[:suppress_link], facet_display_value(facet_solr_field, item), path, :class=>"facet_select") +
      render_facet_count(item.hits)
    end 
  end

  ##
  # Standard display of a SELECTED facet value (e.g. without a link and with a remove button)
  # @params (see #render_facet_value)
  def render_selected_facet_value(facet_solr_field, item)
    content_tag(:span, :class => "facet-label") do
      content_tag(:span, facet_display_value(facet_solr_field, item), :class => "selected") +
      # remove link
      link_to(content_tag(:span, '', :class => "glyphicon glyphicon-remove") + content_tag(:span, '[remove]', :class => 'sr-only'), search_action_path(remove_facet_params(facet_solr_field, item, params)), :class=>"remove") +
      render_facet_count(item.hits, :classes => ["selected"])
    end 
  end

  SECTOR_MAPPINGS = {
    "Agriculture" => "leaf",
    "Water Resources" =>"tint",
    "Coastal Zones" => 'anchor',
    "Ecosystems" => "tree",
    "Buildings" => "university",
    "Transportation" => "truck",
    "Telecommunications" => "mobile-phone",
    "Energy" => "lightbulb-o",
    "Public Health" => "medkit"
  }

  def icon_mapping(format)
    if (icon_mapping = SECTOR_MAPPINGS[format])
      icon_mapping
    else
      'default'
    end
  end

  # Renders the format field values with applicable format icons
  def render_facet_with_icon value
    content_tag :span do
      icon = '<i class="fa fa-' + icon_mapping(value) + '"></i> '
      value.prepend(icon).html_safe unless value.nil?
    end 
  end

  

  
  
end