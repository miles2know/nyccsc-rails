<!-- FEEDBACK MODAL -->

<div class="modal fade" id="feedbackModal">
    <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">×</button>
            <h3>Comments</h3>
          </div>
          <div class="modal-body">
            <p> Something missing from the map or in the wrong place?  Just have a random comment?  Comments are reviewed regularly, and appropriate content will either be posted on the map or incorporated into our database.  </p>
            <div class="well">
              <h4>How to make a comment:</h4>
                  <ul>
                      <li>Click on the 'Comment' button below</li>
                      <li>Navigate to your desired location and  click on the map.</li>
                      <li>Fill out the form to submit your feedback.</li>
                  </ul>
            </div>
          </div>
          <div class="modal-footer">
            <a href="#" onclick="$('#feedbackModal').modal('hide'); initRegistration(); return false;"class="btn btn-primary">Comment</a>
          </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<div class="modal fade" id="insertSuccessModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Success!</h4>
            </div>

            <div class="modal-body">                     
            
                <p>Your information has been submitted for review.</p>
            </div>
<!--                     <div class="modal-footer">
                <img src="img/longlake/LongLakeBearLogo.jpg" width="50px" height= "50px" align="left" ><img src="img/longlake/RaquetteLakeLoonLogo.jpg" width="50px" height= "50px" align="right" ></h4>
            </div>     -->                
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


        <div class="modal fade" id="helpModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">nyclimate Help</h4>
                    </div>

                    <div class="modal-body">
                        
                        <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#help-general">
                                        General
                                    </a>
                                </div>
                                <div id="help-general" class="panel-collapse collapse in">
                                    <div class="panel-body" style="padding: 10px 15px;">
                                       
                                        <p><b>Access different maps and data visualizations</b> via the 'Maps' drop-down on the black navigation bar.</p>
                                        <p><b>Turn layers on and off using </b> the checkboxes on map.</p>

                                        <p><b>Map-specific tools</b> like typeahead search boxes or commenting dialogues appear in the right-hand side of the black navigation bar.</p>
                                        <p><b>Zoom</b>: 
                                            <ul>
                                                <li> Click +/- buttons on map.</li>
                                                <li> Roll mouse wheel. </li>
                                                <li> Double-click on map. </li>
                                                <li> Hold shift while drawing a square on the map with mouse/touchpad.</li>
                                            </ul>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#help-mobile">
                                        Mobile Devices & Tablets
                                    </a>
                                </div>
                                <div id="help-mobile" class="panel-collapse collapse in">
                                    <div class="panel-body" style="padding: 10px 15px;">
                                       <p><b>Mobile compatibility is a work in progress. </b>The site seems to work best in Firefox and Safari, and will not likely work using Internet Explorer 9 or earlier.</p>
                                    <p>Show your current location on the map by tapping the <img src="assets/img/nyclimate/locateIcon.jpg"> icon on the map.</p> 
                                    <p><b>Menus and map-tools</b> like typeahead search boxes or commenting dialogues accesed by tapping the <img src="assets/img/nyclimate/toggleIcon.jpg"> icon on the navigation bar.</p>

                                    <p><b>Zoom</b>: 
                                        <ul>
                                            <li> Tap +/- buttons on map.</li>                               
                                            <li> Finger pinch.</li>
                                        </ul>
                                    </p> 
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->


<!-- INDEX ABOUT MODAL -->
        <div class="modal fade" id="nyclimateAboutModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Welcome to the Adirondack Web Map!</h4>
                    </div>

                    <div class="modal-body">
                         
                        <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#about-overview">
                                    Overview
                                    </a>
                                </div>
                                <div id="about-overview" class="panel-collapse collapse in">
                                    <div class="panel-body" style="padding: 10px 15px;">
                                        <p><b>nyclimate.com</b> is designed to connect you with information about the Adirondack Park in Upstate New York, USA.  Created by Steve Signell, owner of <a href="http://frontierspatial.com" target="_blank_">Frontier Spatial, LLC</a>, nyclimate.com is a modern, mobile-friendly descendant of the <a href="http://aprgis.org/argis" target="_blank_"> Adirondack Regional Geographic Information System </a> (ARGIS).                              
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#about-maps">
                                        Maps & Data Visualizations
                                    </a>
                                </div>
                                <div id="about-maps" class="panel-collapse collapse in">
                                    <div class="panel-body" style="padding: 10px 15px;">
                                        <p><b>Maps</b> are fully interactive-- you can zoom in and out, toggle layers on and off, and click on features for more info.  </p><p>Some maps offer additional features such as type-ahead search boxes or tools allowing you to comment on the map.  These features are found in the upper right-hand corner of the page. </p>
                                        <p><b>Data visualizations</b> allow you to interact with the map as well as graphs and/or charts.  Visualizations with timelines allow you select the specific time frame you are interested in. </p>
                                        
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

<!-- ATTRACTIONS ABOUT MODAL -->

        <div class="modal fade" id="attractionsAboutModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Adirondack Attractions Map</h4>
                    </div>

                    <div class="modal-body">
                         <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#about-thismap">
                                        About this map
                                    </a>
                                </div>
                                <div id="about-thismap" class="panel-collapse collapse in">
                                    <div class="panel-body" style="padding: 0px 15px;">
                                        <h5><b>Adirondack Attractions</b></h5>
                                        <p>This map shows a sampling of historical, cultural and ecological attractions in and around the Adirondack Park

                                        <h5><b>Contribute to this map!</b></h5>
                                        Know of any others attractions to add?  Remove? Random thoughts?  Click on the <i class="fa fa-comment-o" ></i>&nbsp;Comment tool at the upper right-hand corner of the page to give your feedback.</p>

                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#data-sources">
                                        Data Sources
                                    </a>
                                </div>
                                <div id="data-sources" class="panel-collapse collapse">
                                    <div class="panel-body" style="padding: 0px 15px;">
                                       <h5><b><a href="http://aatvny.org/content/Generic/View/18" target="_blank_">Adirondack Partnership</a></b>  </h5><p>Attractions data collected and compiled by the Economic Development Workgroup.</p>                          
                                    </div>
                                </div>
                            </div>
                        </div>

                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

<!-- CELL COVERAGE ABOUT MODAL -->

        <div class="modal fade" id="cellCoverageAboutModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Cellphone Coverage Map</h4>
                    </div>

                    <div class="modal-body">
                         <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#about-thismap">
                                        About this map
                                    </a>
                                </div>
                                <div id="about-thismap" class="panel-collapse collapse in">
                                    <div class="panel-body" style="padding: 0px 15px;">
                                        <h5><b>Cellphone Coverage in the Adirondack Park</b></h5>
                                        <p>Many areas in the Adirondack Park do not have cell service.  Use this map to see where your phone (and nyclimate.com!) will work.   </p>

                                    </div>
                                </div>
                            </div>


                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#data-sources">
                                        Data Sources
                                    </a>
                                </div>
                                <div id="data-sources" class="panel-collapse collapse">
                                    <div class="panel-body" style="padding: 0px 15px;">
                                       <p>Maps created by georeferencing screenshots taken from phone company websites.  Last Updated: 2/3/2014 </p><h5><b><a href="http://www.att.com" target="_blank_">AT&T</a></b>  </h5>
                                       <p><a href="http://www.att.com/maps/wireless-coverage.html#fbid=35-efmT32Pp" target="_blank_">Data Link</a></p>
                                       <hr>
                                       <h5><b><a href="http://verizonwireless.com" target="_blank_">Verizon Wireless </b></a></h5>
                                       <p><a href="http://vzwmap.verizonwireless.com/dotcom/coveragelocator/default.aspx?requestfrom=webagent" target="_blank_">Data Link</a></p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

<!-- FINCH ABOUT MODAL -->
        <div class="modal fade" id="finchpruynAboutModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Essex Chain Map</h4>
                    </div>

                    <div class="modal-body">
                         <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#about-thismap">
                                        About this map
                                    </a>
                                </div>
                                <div id="about-thismap" class="panel-collapse collapse in">
                                    <div class="panel-body" style="padding: 0px 15px;">
                                        <h5><b>APA Classification of the Finch-Pruyn Essex Chain Tracts</b></h5>
                                        <p>On December 13, 2013, the <a href="http://apa.ny.gov" target="_blank_">NYS Adirondack Park Agency</a> <a href="http://www.adirondackalmanack.com/2013/12/apa-approves-finch-pruyn-classifications.html" target="_blank_">approved land classifications</a> 

                                         for the state's recent acquisition of former Finch-Pruyn properties surrounding the Essex Chain Lakes south of Newcomb, NY. This map allows you to (virtually) explore these new wilderness, primitive and wild forest areas.  

                                    </div>
                                </div>
                            </div>


                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#data-sources">
                                        Data Sources
                                    </a>
                                </div>
                                <div id="data-sources" class="panel-collapse collapse">
                                    <div class="panel-body" style="padding: 0px 15px;">
                                       <h5><b><a href="http://apa.ny.gov" target="_blank_">NYS Adirondack Park Agency</a></b>  </h5>
                                       <ul>
                                            <li>Park Boundary</li>
                                            <li>Public Land </li>
                                            <li>Finch-Pruyn classifications: georeferenced by Frontier Spatial, LLC, from digital pdfs available on the APA website.</li>
                                        </ul>

                                       <p><a href="http://apa.ny.gov/gis/index.html" target="_blank_">Data Link</a></p>
                                       <hr>
                                       <h5><b><a href="http://dec.ny.gov" target="_blank_">NYS Department of Environmental Conservation </b></a></h5>
                                           <ul>
                                                <li>Lean-tos</li>
                                                <li>Campsites </li>
                                                <li>Hiking Trails</li>
                                            </ul>

                                       <p><a href="http://aprgis.org/argis" target="_blank_">Data Link</a></p>
                                       <hr>
                                       <h5><b><a href="http://nysparks.com" target="_blank_">NYS Office of Parks, Recreation & Historic Preservation </b></a></h5>
                                           <ul>
                                                <li>Snowmobile Trails</li>
                                            </ul>

                                       <p><a href="https://gis.ny.gov/gisdata/inventories/details.cfm?DSID=427" target="_blank_">Data Link</a></p>
                                       <hr>
                                            

                                            
                                    </div>
                                </div>
                            </div>

                        

                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->


<!-- HAMLETS ABOUT MODAL -->

        <div class="modal fade" id="hamletVizAboutModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Hamlets & the Distribution of Public Recreational Assets</h4>
                    </div>

                    <div class="modal-body">
                         <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#about-thismap">
                                        About this map
                                    </a>
                                </div>
                                <div id="about-thismap" class="panel-collapse collapse in">
                                    <div class="panel-body" style="padding: 0px 15px;">
                                        <h5><b>Adirondack Hamlets and the Distribution of Public Recreational Assets</b></h5>
                                        <p>Conversations about public land in the Adirondack Park invariably include debate over the proper ratio of public vs. private lands.  Some claim there is already more than enough public land, while others say there can never be too much.    </p>
                                        <p>We wanted to see how public lands and recreational assets like trails and lean-tos were actually distributed among the hamlets within the park.  We summarized various statistics within a 10-mile buffer around each hamlet in the park, excluding those whose buffer went outside the park boundary.  </p>
                                        <p>Use the drop down menu to toggle between variables and see the values change. </p>
                                        <p> <b>Note: these results are representative of what's in the data, not necessarily what exists in reality!</b></p>

                                    </div>
                                </div>
                            </div>


                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#data-sources">
                                        Data Sources
                                    </a>
                                </div>
                                <div id="data-sources" class="panel-collapse collapse">
                                    <div class="panel-body" style="padding: 0px 15px;">
                                       <h5><b><a href="http://apa.ny.gov" target="_blank_">NYS Adirondack Park Agency</a></b>  </h5>
                                       <ul>
                                            <li>Park Boundary</li>
                                            <li>Public Land </li>
                                            <li>Hamlets</li>
                                        </ul>

                                       <p><a href="http://apa.ny.gov/gis/index.html" target="_blank_">Data Link</a></p>
                                       <hr>
                                       <h5><b><a href="http://dec.ny.gov" target="_blank_">NYS Department of Environmental Conservation </b></a></h5>
                                           <ul>
                                                <li>Lean-tos</li>
                                                <li>Campsites </li>
                                                <li>Hiking Trails</li>
                                            </ul>

                                       <p><a href="http://aprgis.org/argis" target="_blank_">Data Link</a></p>
                                       <hr>
                                       <h5><b><a href="http://nysparks.com" target="_blank_">NYS Office of Parks, Recreation & Historic Preservation </b></a></h5>
                                           <ul>
                                                <li>Snowmobile Trails</li>
                                            </ul>

                                       <p><a href="https://gis.ny.gov/gisdata/inventories/details.cfm?DSID=427" target="_blank_">Data Link</a></p>
                                       <hr>
                                            

                                            
                                    </div>
                                </div>
                            </div>

                        

                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->


<!-- RECREATION ABOUT MODAL -->

        <div class="modal fade" id="recreationAboutModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Outdoor Recreation Map</h4>
                    </div>

                    <div class="modal-body">
                         <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#about-thismap">
                                        About this map
                                    </a>
                                </div>
                                <div id="about-thismap" class="panel-collapse collapse in">
                                    <div class="panel-body" style="padding: 0px 15px;">
                                    
                                        <p>This map shows just a small portion of the outdoor recreational opportunities available in the 6 million-acre Adirondack Park.</p><p>Other recreation layers we'd like to add:
                                        <ul>
                                            <li>Whitewater Rafting</li>
                                            <li>Rock Climbing</li>
                                            <li>Canoeing</li>
                                            <li>Ice Climbing</li>
                                        </ul>
                                        Know of any others layers to add?  <a href="mailto: steve@frontierspatial.com" >Email us</a></p>

                                    </div>
                                </div>
                            </div>


                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion_" href="#data-sources">
                                        Data Sources
                                    </a>
                                </div>
                                <div id="data-sources" class="panel-collapse collapse">
                                    <div class="panel-body" style="padding: 0px 15px;">
                                       <h5><b><a href="http://apa.ny.gov" target="_blank_">NYS Adirondack Park Agency</a></b>  </h5>
                                       <ul>
                                            <li>Park Boundary</li>
                                            <li>Public Land </li>
                                        </ul>

                                       <p><a href="http://apa.ny.gov/gis/index.html" target="_blank_">Data Link</a></p>
                                       <hr>
                                       <h5><b><a href="http://dec.ny.gov" target="_blank_">NYS Department of Environmental Conservation </b></a></h5>
                                           <ul>
                                                <li>Lean-tos</li>
                                                <li>Campsites </li>
                                                <li>Parking Areas</li>
                                                <li>Hiking Trails</li>
                                            </ul>

                                       <p><a href="https://gis.ny.gov/gisdata/inventories/details.cfm?DSID=1258" target="_blank_">Data Link</a></p>
                                       <hr>
                                       <h5><b><a href="http://nysparks.com" target="_blank_">NYS Office of Parks, Recreation & Historic Preservation </b></a></h5>
                                           <ul>
                                                <li>Snowmobile Trails</li>
                                            </ul>

                                       <p><a href="https://gis.ny.gov/gisdata/inventories/details.cfm?DSID=427" target="_blank_">Data Link</a></p>
                                       <hr>
                                            

                                            
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->



        <div class="modal fade" id="featureModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-primary" id="feature-title"></h4>
                    </div>
                    <div class="modal-body" id="feature-info">
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->