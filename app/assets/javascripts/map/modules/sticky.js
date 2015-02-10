  
var stickyElement = function(el,top){ 
  top ? top : 0;
  try {
    $(el).sticky({
        topSpacing: top, // Space between element and top of the viewport
        zIndex: 100, // z-index
        stopper: "footer" // Id, class, or number value
    });
    return true;
  } catch (err){
    console.log(err);
    return false;
  }
}