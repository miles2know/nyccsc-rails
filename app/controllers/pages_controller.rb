
class PagesController < ApplicationController

  def understand
    #placeholder
  end

  def vulnerabilities
    #placeholder
  end

  def strategies
    #placeholder
  end

  def news
    #placeholder
  end

  # playing with variables and testing the concepts of controllers, helpers and views
  def test1
    @year = params[:year]
    @name = 'Darcy'
  end

  def test2
    @mytime = Time.now
  end  

  def calendar
    @year = params[:year]
    @month = params[:month]
  end

end
