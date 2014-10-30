module ApplicationHelper
  
  ##SEPARATE MAP BOOKMARKS NOT FULLY IMPLEMENTED
  def current_maps response = nil
    response ||= @response
    @current_maps ||= current_or_guest_user.maps_for_documents(response.documents).to_a
  end

end
