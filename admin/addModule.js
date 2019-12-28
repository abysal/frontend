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

  var tok = localStorage.getItem('token');
  
	$("form.addModule").on("submit", function(e) {
    e.preventDefault();
    var module_code=$("#module_code").val();
    var module_name = $("#module_name").val();
    
    var data={
      module_code:module_code,
      module_name:module_name
    }
    
    $.ajax({
      type: "POST",
      url: "http://localhost:8000/modules/moduleOnly",
      data: data,
    beforeSend: function(xhr) {
      if (tok) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
      }
    },

    success: function(responseData, textStatus, jqXHR) {
      console.log(responseData);
      alert(responseData.message);
      location.href='module.html';

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown)
      alert(errorThrown)
    }
  });
    return false;
  });

 /* $.ajax({
    type: 'get',
    url: 'http://localhost:8000/modules',
    beforeSend: function(xhr) {
      if (tok) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
      }
    },
    success: function(data) {

      
      $("#submissions").append(data.length);
      
    },
    error: function() {
      //alert("Sorry, you are not logged in.");
      //location.href="../index.html";
    }
  });*/

  $.getJSON("http://localhost:8000/modules", function(res) {
    var data = "";
    $.each(res, function(index) {
      data='<div class="col-md-6 wow zoomIn" style="margin-bottom:20px;" >';
      data+='<div class="card mb-5 mb-lg-0">';
      data+='<div class="card-header">'
       data+='<a href="moduleDetails.html"><h6 class="card-price text-center">'+res[index].module_code+'</h6></a>';
      data+='</div>';
      data+='<div class="card-body">';
      data+='<h1 class="text-center">'+res[index].module_name+'</h1>';
      data+='<a href="addContent.html?id=' + res[index]._id + '" >';
      data+='<button class="btn btn-block btn-warning text-uppercase" id="addContent" style="margin-bottom:5px;width:160px;float:left;">Add Content</button></a>';
      data+='<a href="updateModule.html?id=' + res[index]._id + '" >';
      data+='<button class="btn btn-block btn-primary text-uppercase" id="addContent" style="margin-bottom:5px;width:120px;">Edit</button></a>';
      data+='<a href="moduleDetails.html?id=' + res[index]._id + '" >';
      data+='<button class="btn btn-block btn-success text-uppercase" id="moduleDetails" style="margin-bottom:5px;width:160px;float:left;">View Content</button></a>';
      
      data+='<button  id="delete" class="btn btn-block btn-danger text-uppercase"  style="width:120px;" value="'+res[index]._id+'">Delete</button>';
      data+='</div>';
      data+='</div>';
      data+='</div>';
      $("#module_data").append(data);
    });
  });
  $('#module_data').on('click','#delete',function () {
   id = $(this).val();
   var result = confirm("Are you sure want to delete this module?");
   if (result) {
    $.ajax({
      type: 'DELETE', 
      url: 'http://localhost:8000/modules/deleteModuleOnly/'+id,                                          
      data:id, 
      beforeSend: function(xhr) {
      if (tok) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
      }
    },                       
      success: function(responseData, textStatus, jqXHR) {
        alert(responseData.message)
        location.href="module.html";
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

  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");

  $.getJSON("http://localhost:8000/modules/"+id, function(res) {
    
      var mcode=res.module_code;
      var mname=res.module_name;
      $("#module_code1").val(mcode);
      $("#module_name1").val(mname);
   
  });


  $("form.addContent").on("submit", function(e) {
    e.preventDefault();
    var module_code=$("#module_code1").val();
    var module_topic=$("#module_topic").val();
    var formData=new FormData(this);

    formData.append('module_code',module_code);
    formData.append('module_topic',module_topic);
    
    $.ajax({
      type: "PUT",
      url: "http://localhost:8000/modules/moduleFile",
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
      location.href='module.html';

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(errorThrown)
      alert(errorThrown)
    }
  });
    return false;
  });



});