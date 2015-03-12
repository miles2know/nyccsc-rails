# -*- encoding : utf-8 -*-
##Store mappings between files or terms and resource URIs

class ResourceMappings
  @@highlightMappings = {
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
    "drought" => "http://nyclimateclearinghouse.org/individual/n3231",
    "understand" => "http://nyclimateclearinghouse.org/individual/n7436"
  }
  
  #Specifically for highlight mapping
  def getHighlightMapping(mapping_key)
    if(@@highlightMappings.has_key?(mapping_key))
      return @@highlightMappings[mapping_key]
    end
    #Returning "" instead of nil, because will be comparing against 
    return ""
  end
 
end