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
  //console.log(tok);

	$("form.addNotice").on("submit", function(e) {
    e.preventDefault();
		      var notice_title = $("#notice_title").val();
          var notice_subject = $("#notice_subject").val();
          var notice_desc = $("#notice_desc").val();
         
         
          var data = {
            notice_title: notice_title,
            notice_subject:notice_subject,
            notice_desc: notice_desc,
            
          };
           $.ajax({
            type: "POST",
            url: "http://localhost:8000/notices",
            data: data,
            beforeSend: function(xhr) {
      if (tok) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
      }
    },
            success: function(responseData, textStatus, jqXHR) {
              console.log(responseData);
                alert(responseData.message);
                location.href="notice.html";
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown)
                alert(errorThrown)
            }
          });
           return false;
        });

        
});