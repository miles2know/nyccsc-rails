# Execute sparql queries to get elements that are highlighted
class HighlightsController < ApplicationController

  def strategies 
    @data = get_highlights
  end

  def impacts 
    @data = get_highlights
  end

  def understand 
    @data = get_highlights
  end

  def events 
    @data = get_event_highlights
  end

  
  def get_highlights 
    #SparqlQueries exists in the models directory
      sparql_query = SparqlQueries.new()
      @data = sparql_query.get_results()
       
      
  end


  def get_event_highlights
    sparql_query = SparqlQueries.new()
          @data = sparql_query.get_results("events_highlights")  

  end

end
