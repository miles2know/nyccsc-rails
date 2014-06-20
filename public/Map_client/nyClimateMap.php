<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>NY Boundaries</title>

<!-- CORE CSS -->
<?php include("assets/php/nyclimate/coreCSS.php"); ?>
        <link href="assets/css/nyclimate/hamletViz.css" rel="stylesheet" type="text/css">

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>
        <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">NY Boundaries Map</a>
            </div>
            <div class="navbar-collapse collapse">
                <form class="navbar-form navbar-right" role="search">
                    <div class="form-group has-feedback navbar-right">
                        <input id="searchbox" type="text" placeholder="Search" class="form-control">
                        <span id="searchicon" class="fa fa-search form-control-feedback"></span>
                    </div>
                </form>
                <!-- <ul class="nav navbar-nav">
                    <li class="dropdown">  
                      <a href="#"  
                            class="dropdown-toggle"  
                            data-toggle="dropdown">  
                            <i class="fa fa-globe" style="color: white" ></i>&nbsp;&nbsp;Maps  
                            <b class="caret"></b>  
                      </a>  
                      <ul class="dropdown-menu">  
                        <li><a href="recreationMap.php">Outdoor Recreation</a></li>  
                        <li><a href="attractionsMap.php">Attractions</a></li> 
                        <li><a href="finchpruynMap.php">Finch Purchase</a></li> 
                        <li><a href="cellCoverageMap.php">Cell Service</a></li>
                        <li><a href="hamletViz.php">Hamlets Visualization</a></li> 
                      </ul>  
                    </li>
                    <li class="dropdown">
                        <a id="toolsDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-wrench" style="color: white"></i>&nbsp;&nbsp;Tools <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" onclick="map.fitBounds(blueline.getBounds()); return false;"><i class="fa fa-arrows-alt"></i>&nbsp;&nbsp;Zoom To Full Extent</a></li>
                        </ul> 
                    </li>                   
                    <li><a href="#hamletVizAboutModal" data-toggle="modal"><i class="fa fa-info-circle" style="color: white"></i>&nbsp;&nbsp;Info</a></li>
                    <li><a href="#helpModal" data-toggle="modal"><i class="fa fa-question-circle" style="color: white"></i>&nbsp;&nbsp;Help</a></li>

                    <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" onclick="sidebar.toggle(); return false;"><i class="fa fa-list" style="color: white"></i>&nbsp;&nbsp;Sidebar</a></li>
                </ul> -->
            </div><!--/.navbar-collapse -->
        </div>

<?php include("assets/php/nyclimate/modal.php"); ?>

        <div id="map"></div>

        <div id="sidebar">
            <h4 style="padding-bottom: 3px;"><b>Hamlets & Public Recreational Assets</b></h4>
                
            <div id="control"> 
                <select type='select' onchange='update(value);' >
                   <option value='percentpublic' name='percentpublic' selected='true' >Percent Public Land</option>
                   <option value='wilderness' name='wilderness'  >Percent Wilderness</option>
                   <option value='wildforest' name='wildforest'>Percent Wild Forest</option>
                   <option value='water' name='water'>Percent Water</option>
                   <option value='snowmb' name='snowmb'>Snowmobile Trails (mi.)</option>
                   <option value='hiking' name='hiking'>Hiking Trails (mi.)</option>

                   <option value='bike' name='bike'>Biking Trails (mi.)</option>
                   <option value='horse' name='horse'>Horse Trails (mi.)</option>
                   <option value='leanto' name='leanto'>Lean-tos</option>
                   </br><label ><input type="checkbox" id="sortcheck" style="margin-left:15px; font-size:16px;"> Sort</label>
                </select>
            </div>                        
                <div id="chart"></div>
            </div>
        </div>

        <div id="loading" style="display:block;">
            <div class="loading-indicator">
                <div class="progress progress-striped active">
                    <div class="progress-bar progress-bar-info" style="width: 100%"></div>
                </div>
            </div>
        </div>






<!-- CORE JS -->
<?php include("assets/php/nyclimate/coreJS.php"); ?>
        <script type="text/javascript" src="assets/colorbrewer/colorbrewer.js"></script>
        <script type="text/javascript" src="assets/d3.v3/d3.v3.js"></script>
        
<!-- LAYERS -->
        <script type="text/javascript" src="assets/js/nyclimate/overlays.js"></script>
        <script type="text/javascript" src="assets/js/nyclimate/nyClimateMap.js"></script>




    </body>
</html>