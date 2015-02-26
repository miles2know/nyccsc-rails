
module HighlightsHelper

  def render_highlights (data, type)

    html = '<ul>'
    i = 0
    @data['results']['bindings'].each do |item| 
      if item['collectionURI']['value'] == HighlightMappings[type]
        html += '<li>' + item['resourceLabel']['value'] + '</li>'
        i += 1
      end 
      break if i >= 3
    end 
    html += '</ul>'

    return html.html_safe

  end


  HighlightMappings = {
    "adaptation" => "http://nyclimateclearinghouse.org/individual/n65129",
    "mitigation" => "http://nyclimateclearinghouse.org/individual/n5412",
    "event" => "http://nyclimateclearinghouse.org/individual/n14708",
    "step1" => "http://nyclimateclearinghouse.org/individual/n30051",
    "step2" => "http://nyclimateclearinghouse.org/individual/n2547",
    "step3" => "http://nyclimateclearinghouse.org/individual/n29234",
    "step4" => "http://nyclimateclearinghouse.org/individual/n29941",
    "step5" => "http://nyclimateclearinghouse.org/individual/n29559",
    "coastal" => "http://nyclimateclearinghouse.org/individual/n4447",
    "extreme" => "http://nyclimateclearinghouse.org/individual/n30495",
    "heat" => "http://nyclimateclearinghouse.org/individual/n3832",
    "downpours" => "http://nyclimateclearinghouse.org/individual/n88",
    "snowpack" => "http://nyclimateclearinghouse.org/individual/n11992",
    "drought" => "http://nyclimateclearinghouse.org/individual/n3231"
  }

end