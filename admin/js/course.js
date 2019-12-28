$(document).ready(function() {
  var tok = localStorage.getItem('token');
  //console.log(tok);

  $("#message").hide();
  $.getJSON("http://localhost:8000/courses", function(res) {
    var data = "";
    $.each(res, function(index) {
      var image=res[index].course_image;
      data='<div class="col-md-6 wow zoomIn" style="margin-bottom:20px;" >';
      data+='<div class="card mb-5 mb-lg-0">';
      data+='<div class="card-header">'
      data+='<h5 class="card-title text-muted text-uppercase text-center">'+res[index].course_name+'</h5>';
      data+='</div>';
      data+='<div class="card-body">';
      data+='<h6 class="card-price text-center">Rs.'+res[index].course_price+'<span class="period">/'+res[index].course_duration+'</span></h6>';
      data+='<hr>';
      if (image!=null && image!="") {
        data+='<div class="text-center">';
         data+='<img src="http://localhost:8000/'+res[index].course_image+'" class="img-responsive" width="200">';
         data+='</div>';
      }
      data+='<ul class="fa-ul">';
      data+='<li><span class="fa-li"><i class="fas fa-check"></i></span>'+res[index].course_modules+'</li>';
      data+='<li><span class="fa-li"><i class="fas fa-check"></i></span>'+res[index].course_desc+'</li>';
      data+='</ul>';
      data +='<a href="updateCourse.html?id=' + res[index]._id + '" >';
      data +='<button class="btn btn-block btn-primary text-uppercase" id="edit" style="margin-bottom:5px;width:120px;float:left;">Edit</button></a>';
      data+='<button  id="delete" class="btn btn-block btn-danger text-uppercase"  style="width:120px;" value="'+res[index]._id+'">Delete</button>';
      data+='</div>';
      data+='</div>';
      data+='</div>';
      $("#data").append(data);
    });
  });

  $('#data').on('click','#delete',function () {
   id = $(this).val();
   var result = confirm("Are you sure want to delete this course?");
   if (result) {
    $.ajax({
      type: 'DELETE', 
      url: 'http://localhost:8000/courses/deleteCourse/'+id,                                          
      data:id, 
      beforeSend: function(xhr) {
      if (tok) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
      }
    },                       
      success: function(responseData, textStatus, jqXHR) {
        alert(responseData.message)
        location.href="course.html";
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        alert(errorThrown)
      }               
    });     

  }
  else{
  }

});

});
