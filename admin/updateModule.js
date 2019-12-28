$(document).ready(function(){
  var tok = localStorage.getItem('token');
  //console.log(tok);

  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");

  $.getJSON("http://localhost:8000/modules/" + id, function(result) {
    $("#module_code").val(result.module_code);
    $("#module_name").val(result.module_name);
   

  });

    $("form.updateModule").on("submit", function(e) {
    e.preventDefault();
          var module_code = $("#module_code").val();
          var module_name = $("#module_name").val();
        
         
          var data = {
            module_code: module_code,
            module_name:module_name,
            
          };
           $.ajax({
            type: "PUT",
            url: "http://localhost:8000/modules/updateModuleOnly/"+id,
            data: data,
            beforeSend: function(xhr) {
      if (tok) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
      }
    },
            success: function(responseData, textStatus, jqXHR) {
              console.log(responseData);
                alert(responseData.message);
                location.href="module.html";
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown)
                alert(errorThrown)
            }
          });
           return false;
        });




  

});







