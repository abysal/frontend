$(document).ready(function(){
  var tok = localStorage.getItem('token');
  //console.log(tok);

  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");

  $.getJSON("http://localhost:8000/courses/" + id, function(result) {
    $("#course_name").val(result.course_name);
    $("#course_duration").val(result.course_duration);
    $("#course_price").val(result.course_price);
    $("#course_modules").val(result.course_modules);
    $("#course_desc").val(result.course_desc);
    var imageFile=result.course_image;
    $('#course_image_show').attr('src', 'http://localhost:8000/'+imageFile);

  });

    $("form.updateCourse").on("submit", function(e) {
    e.preventDefault();
    var course_name=$("#course_name").val();
    var course_duration = $("#course_duration").val();
    var course_price = $("#course_price").val();
    var course_modules = $("#course_modules").val();
    var course_desc = $("#course_desc").val();
    
    var formData=new FormData(this);

    formData.append('course_name',course_name);
    formData.append('course_duration',course_duration);
    formData.append('course_price',course_price);
    formData.append('course_modules',course_modules);
    formData.append('course_desc',course_desc);
    
    $.ajax({
      type: "PUT",
      url: "http://localhost:8000/courses/updateCourse/"+id,
      enctype:"multipart/form-data",
      data: formData,
    //Options to tell jQuery not to process data or worry about content-type.
    cache: false,
    contentType: false,
    processData: false,
    beforeSend: function(xhr) {
      if (tok) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
      }
    },

    success: function(responseData, textStatus, jqXHR) {
      console.log(responseData);
      alert(responseData.message);
      location.href='course.html';

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown)
      alert(errorThrown)
    }
  });
    return false;
  });





  

});







