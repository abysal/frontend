$(document).ready(function () {
  

  $.getJSON("http://localhost:8000/modules", function(res) {
    var data = "";
    $.each(res, function(index) {
      data='<div class="col-md-6 wow zoomIn" style="margin-bottom:20px;" >';
      data+='<div class="card mb-5 mb-lg-0">';
      data+='<div class="card-header">'
      data+='<a href="moduleDetails.html"><h3 class=" text-center">'+res[index].module_code+'</h3></a>';
      data+='</div>';
      data+='<div class="card-body">';
      data+='<h3 class="text-center">'+res[index].module_name+'</h3>';
      
      data+='<a href="moduleDetails.html?id=' + res[index]._id + '" >';
      data+='<button class="btn btn-block btn-primary text-uppercase" id="moduleDetails" style="margin-bottom:5px;width:160px;float:left;">View Content</button></a>';
      
      
      data+='</div>';
      data+='</div>';
      data+='</div>';
      $("#module_data").append(data);
    });
  });
});