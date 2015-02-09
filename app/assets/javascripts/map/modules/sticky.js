  
var stickyElement = function(el){ 
  try {
    $(el).sticky({
        topSpacing: 0, // Space between element and top of the viewport
        zIndex: 100, // z-index
        stopper: "footer" // Id, class, or number value
    });
    return true;
  } catch (err){
    console.log(err);
    return false;
  }
}