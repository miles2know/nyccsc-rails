<?php
require("dbinfoNY.php");

// Get parameters from URL
$lat = $_GET["lat"];
$lon = $_GET["lon"];

// Open a connection to PostgreSQL server
$connection=pg_connect ("dbname=$database user=$user password=$password host=$host port=$port");
if (!$connection) {
  die("Not connected : " . pg_error());
}

// Build SQL SELECT Statement.
$query = "SELECT a.name AS county_name, 
              a.countyfp AS county_fp,
              b.name AS huc8_name, 
              b.huc8, 
c.name AS decregion_name, substr(c.name,8,2) AS decregion, d.name AS clim_div_name,d.div AS clim_div


        FROM boundaries.ny_counties_tiger AS a,boundaries.huc8 AS b, boundaries.decregions AS c, boundaries.clim_div AS d
        WHERE 
        ST_Contains(
              a.geom, (
                ST_Transform(
                  ST_SetSRID(
                    ST_GeomFromText('POINT($lon $lat)')
                  ,4326)
                ,26918))
            )
        AND
        ST_Contains(
              b.geom, (
                ST_Transform(
                  ST_SetSRID(
                    ST_GeomFromText('POINT($lon $lat)')
                  ,4326)
                ,26918))
            )
AND
        ST_Contains(
              c.geom, (
                ST_Transform(
                  ST_SetSRID(
                    ST_GeomFromText('POINT($lon $lat)')
                  ,4326)
                ,26918))
            )
AND
        ST_Contains(
              ST_Transform(d.the_geom, 26918), (
                ST_Transform(
                  ST_SetSRID(
                    ST_GeomFromText('POINT($lon $lat)')
                  ,4326)
                ,26918))
            )
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