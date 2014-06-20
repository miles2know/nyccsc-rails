<?php
require("dbinfoNY.php");

// Get parameters from URL
$lat1 = $_GET["lat1"];
$lon1 = $_GET["lon1"];
$lat2 = $_GET["lat2"];
$lon2 = $_GET["lon2"];
$midlat = $_GET["midlat"];
$midlon = $_GET["midlon"];

// Open a connection to PostgreSQL server
$connection=pg_connect ("dbname=$database user=$user password=$password host=$host port=$port");
if (!$connection) {
  die("Not connected : " . pg_error());
}

// Build SQL SELECT Statement.
$query = "SELECT name, 
              countyfp,
              statefp,
              geoid,
              ((ST_Distance(a.geom, (
              ST_Transform(
                ST_SetSRID(
                  ST_GeomFromText('POINT($midlon $midlat)')
                ,4326)
              ,26918))))/1000)::integer AS distance2mapcenter,
              ((ST_Distance(ST_Centroid(a.geom), (
              ST_Transform(
                ST_SetSRID(
                  ST_GeomFromText('POINT($midlon $midlat)')
                ,4326)
              ,26918))))/1000)::integer AS centroid2mapcenter, 
              
                ((ST_Area(ST_Intersection(a.geom,(ST_Transform(
                  ST_SetSRID(
                    ST_GeomFromText('POLYGON(($lon2 $lat2,$lon2 $lat1, $lon1 $lat1, $lon1 $lat2,$lon2 $lat2))')
                  ,4326)
                ,26918)))))/(ST_Area(ST_Transform(
                ST_SetSRID(
                  ST_GeomFromText('POLYGON(($lon2 $lat2,$lon2 $lat1, $lon1 $lat1, $lon1 $lat2,$lon2 $lat2))')
                ,4326)
              ,26918))))::numeric(4,3) AS percentbbox

        FROM boundaries.ny_counties_tiger AS a
        WHERE 
        ST_Intersects(
              a.geom, (
                ST_Transform(
                  ST_SetSRID(
                    ST_GeomFromText('POLYGON(($lon2 $lat2,$lon2 $lat1, $lon1 $lat1, $lon1 $lat2,$lon2 $lat2))')
                  ,4326)
                ,26918))
            )
        ORDER BY distance2mapcenter 
        ;";


$result = pg_exec($connection, $query);
if (!$result) {printf ("ERROR"); exit;}

//fetch result
$resultArray = pg_fetch_all($result);

//create json
echo json_encode($resultArray);

/*$f = fopen("countyREST.json", "w"); 
fwrite($f, json_encode($resultArray)); 
fclose($f);*/
?>