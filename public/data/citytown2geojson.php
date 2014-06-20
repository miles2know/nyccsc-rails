<?php
/**
 * Title:   PostGIS to GeoJSON
 * Notes:   Query a PostGIS table or view and return the results in GeoJSON format, suitable for use in OpenLayers, Leaflet, etc.
 * Author:  Bryan R. McBride, GISP
 * Contact: bryanmcbride.com
 * GitHub:  https://github.com/bmcbride/PHP-Database-GeoJSON
 */
session_start();

require("dbinfoNY.php");

// Get parameters from URL
$lat1 = $_GET["lat1"];
$lon1 = $_GET["lon1"];
$lat2 = $_GET["lat2"];
$lon2 = $_GET["lon2"];
$midlat = $_GET["midlat"];
$midlon = $_GET["midlon"];
# Connect to PostgreSQL database
$conn = new PDO("pgsql:host=$host;dbname=$database","$user","$password");

# Build SQL SELECT statement and return the geometry as a GeoJSON element
$sql = "SELECT *, public.ST_AsGeoJSON(public.ST_Transform(a.geom,4326),6) as geojson FROM boundaries.citytown AS a
        WHERE ST_Intersects(
          a.geom, (
            ST_Transform(
              ST_SetSRID(
                ST_GeomFromText('POLYGON(($lon2 $lat2,$lon2 $lat1, $lon1 $lat1, $lon1 $lat2,$lon2 $lat2))')
              ,4326)
            ,26918))
        );";

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
$f = fopen("citytown.geojson", "w"); 
fwrite($f, json_encode($geojson)); 
fclose($f);

$conn = NULL;
?>