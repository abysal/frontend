$(document).ready(function() {
  var tok = localStorage.getItem('token');
  //console.log(tok);

  $("#message").hide();
  $.getJSON("http://localhost:8000/notices", function(res) {
    var data = "";
    $.each(res, function(index) {
      var file=res[index].notice_date;
      var pdate=moment(res[index].notice_date).fromNow(); 
      var pdate2=moment(res[index].notice_date).format("ddd DD-MMMM-YYYY");
      var pdate3=moment(res[index].notice_date).format("ddd DD-MMMM-YYYY HH:mm:ss");
      data='<div class="col-md-12 text-center wow zoomIn" style="flex:0 0 100%; margin-bottom:20px;">';
      data+='<div class="card">';
      data+='<div class="card-header">'+res[index].notice_title+'</div>';
      data+='<div class="card-body">';
      data+='<h5 class="card-title">'+res[index].notice_subject+'</h5>';
      data+='<p class="card-text">'+res[index].notice_desc+'</p>';
      if (pdate2!=null) {
        data+='<h6>'+pdate2+'</h6>';
      }
      data+='<a href="updateNotice.html?id=' + res[index]._id + '" >';
      data+='<button class="btn btn-block btn-primary text-uppercase" id="edit" style="margin-bottom:5px;width:100px;float:left;">Edit</button></a>';
      data+='<button  id="delete" class="btn btn-block btn-danger text-uppercase"  style="width:100px;" value="'+res[index]._id+'">Delete</button>';
      data+='</div>';
      data+='</div>';
      data+='</div>';
      data+='<hr>';
      $("#notice_data").append(data);
    });
  });

  $('#notice_data').on('click','#delete',function () {
   id = $(this).val();
   var result = confirm("Are you sure want to delete this notice?");
   if (result) {
    $.ajax({
      type: 'DELETE', 
      url: 'http://localhost:8000/notices/deleteNotice/'+id,                                          
      data:id,  
      beforeSend: function(xhr) {
      if (tok) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
      }
    },                      
      success: function(responseData, textStatus, jqXHR) {
        location.href="notice.html";
        var message=responseData.message;
        console.log(responseData.message);
        $("#message_success").append(message);
        $("#message").show();
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


var end=moment("2019-06-13 22:59:59","YYYY-MM-DD HH:mm:ss");
var a = moment();
end.subtract(a);
var datefinal=end.fromNow();
console.log(datefinal);
