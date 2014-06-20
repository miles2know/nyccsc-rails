<?php
/**
 * Title:   PostGIS to GeoJSON
 * Notes:   Query a PostGIS table or view and return the results in GeoJSON format, suitable for use in OpenLayers, Leaflet, etc.
 * Author:  Bryan R. McBride, GISP
 * Contact: bryanmcbride.com
 * GitHub:  https://github.com/bmcbride/PHP-Database-GeoJSON
 */
session_start();

if ($_SERVER["SERVER_NAME"] === "localhost") {
  $dbhost = "frontierspatial.com";
}
if ($_SERVER["SERVER_NAME"] === "frontierspatial.com") {
  $dbhost = "localhost";
}
require("dbinfo.php");
# Connect to PostgreSQL database
$conn = new PDO("pgsql:host=$host;dbname=$database","$user","$password");

# Build SQL SELECT statement and return the geometry as a GeoJSON element
$sql = "SELECT a.name, a.asset, a.facility, public.ST_AsGeoJSON(public.ST_Transform(a.geom,4326),6) as geojson
FROM dec.asset a, apa.blueline b WHERE a.asset ='PRIMITIVE CAMPSITE' AND ST_Intersects(a.geom,b.geom)";

# Try query or error
$rs = $conn->query($sql);
if (!$rs) {
    echo 'An SQL error occured.\n';
    exit;
}

# Build GeoJSON feature collection array
$geojson = array(
   'type'      => 'FeatureCollection',
   'features'  => array()
);

# Loop through rows to build feature arrays
while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
    $properties = $row;
    # Remove geojson and geometry fields from properties
    unset($properties['geojson']);
    unset($properties['the_geom']);
    $feature = array(
         'type' => 'Feature',
         'geometry' => json_decode($row['geojson'], true),
         'properties' => $properties
    );
    # Add feature arrays to feature collection array
    array_push($geojson['features'], $feature);
}

header('Content-type: application/json');
echo json_encode($geojson, JSON_NUMERIC_CHECK);
$f = fopen("campsite.geojson", "w"); 
fwrite($f, json_encode($geojson)); 
fclose($f);

$conn = NULL;
?>