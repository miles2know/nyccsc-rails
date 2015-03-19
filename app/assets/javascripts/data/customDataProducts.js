//This file is used to map between URIs and the files that will be employed
//Maps URs to data product pages
var definedExt = {
	  "http://nyclimateclearinghouse.org/individual/n12089": "n12089",
	  "http://nyclimateclearinghouse.org/individual/n1577":"n1577"
	};

//Get javascript name

function getJavascriptFile(mapping, URI) {
	if(URI in mapping) {
		return mapping[URI];
	}
	//if it doesn't exist, will return null
	return null;
}