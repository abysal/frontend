$(document).ready(function() {

  var tok = localStorage.getItem('token');
  //console.log(tok);

  $("#message").hide();
  $.getJSON("http://localhost:8000/assignments", function(res) {
    var data = "";
    $.each(res, function(index) {
      var file=res[index].assignment_file;
      var curdate=moment().format("ddd DD-MMMM-YYYY HH:mm:ss");
      //var pdate=moment(res[index].notice_date).fromNow(); 
      var pdate=moment(res[index].assignment_publish_date).format("ddd DD-MMMM-YYYY");
      var deadline=moment(res[index].assignment_deadline).format("ddd DD-MMMM-YYYY HH:mm");

      var end=moment(res[index].assignment_deadline,"YYYY-MM-DD HH:mm");
      var a = moment().format("YYYY-MM-DD HH:mm:ss");
      end.subtract(a);
      var rtime=end.fromNow();

      data='<div class="col-md-6 text-center wow zoomIn" style="flex:0 0 100%; margin-bottom:20px;">';
      data+='<div class="card">';
      data+='<div class="card-header">'+res[index].module_code+'</div>';
      data+='<div class="card-body">';
      data+='<h5 class="card-title">'+res[index].module_name+'</h5>';
      data+='<h6 class="card-title">Assignment No : '+res[index].assignment_no+'</h6>';
      data+='<p class="card-text">'+res[index].assignment_desc+'</p>';
      if (file!=null) {
        data+='<h6>Follow this link for details : <a href="http://localhost:8000/'+file+'" target="blank" style="color:blue;">'+res[index].module_code+'_assignment</a></h6>';
      }
      data+='<p class="">Assignment Published On : '+pdate+'</p>';
      data+='<p class="">Assignment Deadline : '+deadline+'</p>';
      if(moment(deadline)>moment(curdate)){
        data+='<p class="">Deadline ends '+rtime+'</p>';
      }
      if(moment(deadline)<moment(curdate)){
        data+='<p class="">Deadline ended '+rtime+'</p>';
      }
      data+='<a href="updateAssignment.html?id=' + res[index]._id + '" >';
      data+='<button class="btn btn-block btn-primary text-uppercase" id="edit" style="margin-bottom:5px;width:100px;float:left;">Edit</button></a>';
      data+='<button  id="delete" class="btn btn-block btn-danger text-uppercase"  style="width:100px;float:left" value="'+res[index]._id+'">Delete</button>';
      data+='<a href="singleSubmission.html?id=' + res[index]._id + '" >';
      data+='<button class="btn btn-block btn-success text-uppercase" id="edit" style="margin-bottom:5px;width:200px;float:left;">View Submissions</button></a>';
      data+='</div>';
      data+='</div>';
      data+='</div>';
      data+='<hr>';
      $("#assignment_data").append(data);
    });
  });

  $('#assignment_data').on('click','#delete',function () {
   id = $(this).val();
   var result = confirm("Are you sure want to delete this assignment?");
   if (result) {
    $.ajax({
      type: 'DELETE', 
      url: 'http://localhost:8000/assignments/deleteAssignment/'+id,                                          
      data:id,  
      beforeSend: function(xhr) {
      if (tok) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
      }
    },                      
      success: function(responseData, textStatus, jqXHR) {
        location.href="assignment.html";
        var message=responseData.message;
        console.log(responseData.message);
        alert(message);
        /*$("#message_success").append(message);
        $("#message").show();*/
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



