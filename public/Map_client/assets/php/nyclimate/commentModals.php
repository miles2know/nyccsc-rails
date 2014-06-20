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

