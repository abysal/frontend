$(document).ready(function () {
	$("#sidebar").mCustomScrollbar({
		theme: "minimal"
	});

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar, #content').toggleClass('active');
		$('.collapse.in').toggleClass('in');
		$('a[aria-expanded=true]').attr('aria-expanded', 'false');
	});

  var tok = localStorage.getItem('token');
 // console.log(tok);

	

	$("form.addAssignment").on("submit", function(e) {
    e.preventDefault();
		      var module_code = $("#module_code").val();
          var module_name = $("#module_name").val();
          var assignment_no = $("#assignment_no").val();
          var assignment_desc=$("#assignment_desc").val();
          var assignment_deadline=$("#assignment_deadline").val();
         
          var formData=new FormData(this);

          formData.append('module_code',module_code);
          formData.append('module_name',module_name);
          formData.append('assignment_no',assignment_no);
          formData.append('assignment_desc',assignment_desc);
          formData.append("assignment_deadline",assignment_deadline);

        
           $.ajax({
            type: "POST",
            url: "http://localhost:8000/assignments",
            enctype:"multipart/form-data",
            data: formData,
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
                location.href="assignment.html";
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown)
                alert(errorThrown)
            }
          });
           return false;
        });

        
});