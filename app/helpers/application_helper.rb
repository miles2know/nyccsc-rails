module ApplicationHelper

	def url_for_document doc, options = {}
    if respond_to?(:blacklight_config) and
        blacklight_config.show.route and
        (!doc.respond_to?(:to_model) or doc.to_model.is_a? SolrDocument)
      route = blacklight_config.show.route.merge(action: :show, id: doc).merge(options)
      route[:controller] = controller_name if route[:controller] == :current
      route
    else
       CGI.escapeHTML(doc.id)
      #doc
      # "google.com"
      # Rails.logger.info "////////////// ENCODE URI #{CGI::escape(doc.id)} ENCODE URI ///////////////"
    end
  end

end
