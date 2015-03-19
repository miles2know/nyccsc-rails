//This file is used to map between URIs and the files that will be employed
//This is for the javascript that needs to be utilized for custom maps
var definedExt = {
}
//Get javascript name

function getJavascriptFile(mapping, URI) {
	if(URI in mapping) {
		return mapping[URI];
	}
	//if it doesn't exist, will return null
	return null;
}