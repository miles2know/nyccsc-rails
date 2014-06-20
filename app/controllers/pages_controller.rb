
class PagesController < ApplicationController

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
