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

 var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id"); 

  $.getJSON("http://localhost:8000/submissions/update/" + id, function(data) {
    $("#assignment_title2").val(data.assignment_title);
    $("#assignment_links2").val(data.assignment_links);
    var assignmentFile=data.assignment_file_user;
    $("#assign_file_user3").val(assignmentFile);
   
  });
	

	$("form.updateSubmission").on("submit", function(e) {
    e.preventDefault();
    var assignment_title=$("#assignment_title2").val();
    var assignment_links=$("#assignment_links2").val();

    var formData=new FormData(this);
    formData.append('assignment_title',assignment_title);
    formData.append('assignment_links',assignment_links);

        
           $.ajax({
            type: "PUT",
            url: "http://localhost:8000/submissions/updateSubmission/"+id,
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
                location.href="mySubmission.html";
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown)
                alert(errorThrown)
            }
          });
           return false;
        });

        
});