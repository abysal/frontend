$(document).ready(function () {

  var image;

  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });

	/*$("#course_image").change(function(event){
		image=event.target.files[0];
		console.log(image.name);
	});*/
  var tok = localStorage.getItem('token');
  //console.log(tok);

	$("form.addCourse").on("submit", function(e) {
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
      type: "POST",
      url: "http://localhost:8000/courses",
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