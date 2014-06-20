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
/*$lat1 = $_GET["lat1"];
$lon1 = $_GET["lon1"];
$lat2 = $_GET["lat2"];
$lon2 = $_GET["lon2"];*/

# Connect to PostgreSQL database
$conn = new PDO("pgsql:host=$host;dbname=$database","$user","$password");

# Build SQL SELECT statement and return the geometry as a GeoJSON element
$sql = "SELECT a.name_county, a.gnis_id_county, a.dec_region, 
    st_intersection(b.geom, a.geom) AS geom, a.huc8, a.name_huc8, b.clim_div, 
    b.name AS clim_div_name, row_number() OVER () AS id_qgis
   FROM ( SELECT a.name_county, a.gnis_id_county, a.dec_region, 
            st_intersection(b.geom, a.geom) AS geom, b.huc8, 
            b.name AS name_huc8, row_number() OVER () AS id_qgis
           FROM boundaries.huc8_ny b, boundaries.county_decregion a
          WHERE b.name::text ~~* '%hudson%'::text) a, boundaries.clim_div_ny b;";

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
$f = fopen("boundaries.geojson", "w"); 
fwrite($f, json_encode($geojson)); 
fclose($f);

$conn = NULL;
?>