module PagesHelper 

  #this is just a test - using the url path to determine parameter values
  # in this case /year/month and month is optional

  def calendar (month, year)
    prev_month = link_to "previous", calendar_path(:month => month.to_i - 1, :year => year)
    cal_str =  "<table border='1'>\n"
    cal_str += "\t<tr><td colspan='7'>#{prev_month}</td></tr>\n"
    cal_str += "\t<tr>"
    cal_str += "\t\t<td>&nbsp;</td>\n"
    6.times do | day |
      cal_str += "\t\t<td>#{day + 1}</td>\n"
    end
    cal_str += "\t</tr>\n"
    cal_str += "</table>"

    return cal_str.html_safe

  end

end