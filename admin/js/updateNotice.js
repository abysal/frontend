$(document).ready(function(){
  var tok = localStorage.getItem('token');
  //console.log(tok);

  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");

  $.getJSON("http://localhost:8000/notices/" + id, function(result) {
    $("#notice_title").val(result.notice_title);
    $("#notice_subject").val(result.notice_subject);
    $("#notice_desc").val(result.notice_desc);

  });

    $("form.updateNotice").on("submit", function(e) {
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
            type: "PUT",
            url: "http://localhost:8000/notices/updateNotice/"+id,
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







