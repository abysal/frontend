$(document).ready(function(){
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
	var uid=localStorage.getItem('uid');
	var user_type=localStorage.getItem('user_type');
	//console.log(uid);


	$.ajax({
		type: 'get',
		url: 'http://localhost:8000/users/me',
		beforeSend: function(xhr) {
			if (tok && user_type=="user") {
				xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
			}
		},
		success: function(data) {

			var profile_image=data.user_image;
			if(profile_image!=""){
				$('#profile_image').attr('src', 'http://localhost:8000/'+data.user_image);
			}
			$('#user_name').append(data.first_name +" "+ data.last_name);   
			var data1="";
			var data2="";
			data1+='<h3>First Name:'+data.first_name+'</h3>'
			data1+='<h3>Last Name:'+data.last_name+'</h3>'
			data1+='<h5>Email:'+data.email+'</h5>'
			data1+='<h5>Gender:'+data.gender+'</h5>'
			data1+='<h5>Batch:'+data.batch+'</h5>'
			data1+='<h5>Section:'+data.section+'</h5>'
			data1+='<h5>User name:'+data.user_name+'</h5>'
			data1+='<h5>Password:**********</h5>'
			data1+='<button class="btn btn-primary btn-block text-uppercase" style="width:200px;"><a href="updateProfile.html">Update Profile</a></button>';
			data1+='</div>';
			
			data2+='<h5>Profile Image:</h5>';
			if (profile_image!="") {
				data2+='<img src="http://localhost:8000/'+data.user_image+'" class="img-responsive" width="200"><br/><br/>';
			}
			if(profile_image==""){
				data2+='<h5>No image uploaded yet.Please upload profile picture</h5>';
			}
			data2+='<button class="btn btn-primary btn-block text-uppercase" style="width:235px;"><a href="updateImage.html">Update Profile Image</a></button>&nbsp;';
			$('#user_data1').append(data1); 
			$('#user_data2').append(data2); 

			$('#first_name').val(data.first_name); 
			$('#last_name').val(data.last_name);
			$('#email').val(data.email);
			
			$('#batch').val(data.batch);
			$('#section').val(data.section);
			$('#user_name2').val(data.user_name);  
			$('#password').val(data.password);
			var gender=data.gender;
			if(gender=="Male"){
				$("#male").prop("checked", true);
			}
			if (gender=="Female") {
				$("#female").prop("checked", true);
			}             
		},
		error: function() {
			//alert("Sorry, you are not logged in.");
			location.href="../index.html";
		}
	});

	$.getJSON("http://localhost:8000/submissions", function(res) {
    var data = "";
    $.each(res, function(index) {
    	if(res[index].user_id._id==uid){
    		var file=res[index].assignment_file_user;
      var curdate=moment().format("ddd DD-MMMM-YYYY HH:mm:ss");
 
      var sdate=moment(res[index].updatedAt).format("ddd DD-MMMM-YYYY HH:mm:ss");

      data='<div class="col-md-6 text-center wow zoomIn" style="flex:0 0 100%; margin-bottom:20px;">';
      data+='<div class="card">';
      data+='<div class="card-header">'+res[index].assignment_title+'</div>';
      data+='<div class="card-body">';
      data+='<h5 class="card-title">Links: '+res[index].assignment_links+'</h5>';
      if (file!=null) {
        data+='<h6>Assignment File : <a href="http://localhost:8000/'+file+'" target="blank" style="color:blue;">'+res[index].assignment_title+'</a></h6>';
      }
      data+='<p class="">Assignment Submitted On : '+sdate+'</p>';
    
      data+='<a href="updateSubmission.html?id=' + res[index]._id + '" >';
      data+='<button class="btn btn-block btn-primary text-uppercase" id="edit" style="margin-bottom:5px;width:100px;float:left;">Edit</button></a>';
      data+='<button  id="delete" class="btn btn-block btn-danger text-uppercase"  style="width:100px;" value="'+res[index]._id+'">Delete</button>';
      data+='</div>';
      data+='</div>';
      data+='</div>';
      data+='<hr>';
      $("#assignment_data_user").append(data);

    	}
      
    });
  });

	$('#assignment_data_user').on('click','#delete',function () {
   id = $(this).val();
   var result = confirm("Are you sure want to delete this assignment submission?");
   if (result) {
    $.ajax({
      type: 'DELETE', 
      url: 'http://localhost:8000/submissions/deleteSubmission/'+id,                                          
      data:id, 
      beforeSend: function(xhr) {
				if (tok) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
				}
			},                       
      success: function(responseData, textStatus, jqXHR) {
        location.href="mySubmission.html";
        var message=responseData.message;
        alert(message);
        
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



	$("#logout").click(function(){
		$.ajax({
			type: 'post',
			url: 'http://localhost:8000/users/logout',
			beforeSend: function(xhr) {
				if (tok) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
				}
			},
			success: function(responseData, textStatus, jqXHR) {
				location.href="../index.html";
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown)
				alert(errorThrown)
			}
			
		});
	}) 



	$("form.addImage").on("submit", function(e) {
		e.preventDefault();
		var formData=new FormData(this);
		formData.append('id',uid);

		$.ajax({
			type: "PUT",
			url: "http://localhost:8000/uploads/updateUserImage/"+uid,
			enctype:"multipart/form-data",
			data: formData,
    //Options to tell jQuery not to process data or worry about content-type.
    cache: false,
    contentType: false,
    processData: false,

    success: function(responseData, textStatus, jqXHR) {
    	console.log(responseData);
    	alert("Image Uploaded Successfuly");
    	location.href='profile.html';

    },
    error: function(jqXHR, textStatus, errorThrown) {
    	console.log(errorThrown)
    	alert(errorThrown)
    }
});
		return false;
	});


	$("form.updateUser").on("submit",function(e){
		e.preventDefault();
		var id=uid;
		var first_name=$("#first_name").val();
		var last_name=$("#last_name").val();
		var email=$("#email").val();
		var gender=$("#gender").val();
		var batch=$("#batch").val();
		var section=$("#section").val();
		var user_name = $("#user_name2").val();
		var password = $("#password").val();
		var gender = $("input[name='radio']:checked").val();

		var data = {
			id:id,
			first_name:first_name,
			last_name:last_name,
			email:email,
			gender:gender,
			batch:batch,
			section:section,
			user_name: user_name,
			password:password,
		};
		console.log(data);
		$.ajax({
			type: "PUT",
			url: "http://localhost:8000/users/updateUser/"+uid,
			data: data,
			async:false,
			beforeSend: function(xhr) {
				if (tok) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
				}
			},
			success: function(responseData, textStatus, jqXHR) {
				var msg=responseData.message;
				alert(msg);
				location.href="profile.html";
				

			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown)
				alert(errorThrown)
			}
		});
		return false;
	});


	$.getJSON("http://localhost:8000/assignments", function(res) {
		var data = "";
		$.each(res, function(index) {
			var file=res[index].assignment_file;
			var curdate=moment().format("ddd DD-MMMM-YYYY HH:mm");
      //var pdate=moment(res[index].notice_date).fromNow(); 
      var pdate=moment(res[index].assignment_publish_date).format("ddd DD-MMMM-YYYY");
      var deadline=moment(res[index].assignment_deadline).format("ddd DD-MMMM-YYYY HH:mm");

      var end=moment(res[index].assignment_deadline,"YYYY-MM-DD HH:mm");
      var a = moment().format("YYYY-MM-DD HH:mm");
      end.subtract(a);
      var rtime=end.fromNow();
      //console.log(rtime);

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

      
      if(moment(deadline) > moment(curdate)){
      	data+='<p class="">Deadline ends '+rtime+'</p>';
      	data+='<a href="addSubmission.html?id=' + res[index]._id + '" >';
      	data+='<button class="btn btn-block btn-success text-uppercase" id="addSubmission" style="margin-bottom:5px;width:200px;float:left;" >Add Submission</button></a>';
      }
      
      if(moment(deadline) < moment(curdate)){
      	data+='<p class="">Deadline ended '+rtime+'</p>';
      	data+='<a href="" >';
      	data+='<button class="btn btn-block btn-danger text-uppercase" id="addSubmissionLate" style="margin-bottom:5px;width:200px;float:left;" disabled>Add Submission</button></a>';	
      }
      
      data+='</div>';
      data+='</div>';
      data+='</div>';
      data+='<hr>';
      $("#assignment_data").append(data);
  });
	});

	

	var urlParams=new URLSearchParams(window.location.search);
	var assign_id=urlParams.get("id");
	var uid=localStorage.getItem('uid');
	$("#assignment_id").val(assign_id);
	$("#user_id").val(uid);

	$("form.addSubmission").on("submit",function(e){
		e.preventDefault();
		var user_id=uid;
		var assignment_id=$("#assignment_id").val();
		var assignment_title=$("#assignment_title").val();
		var assignment_links=$("#assignment_links").val();

		var formData=new FormData(this);
		formData.append('user_id',user_id);
		formData.append('assignment_id',assignment_id);
		formData.append('assignment_title',assignment_title);
		formData.append('assignment_links',assignment_links);

		$.ajax({
			type: "POST",
			url: "http://localhost:8000/submissions/addSubmission",
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
    	location.href='mySubmission.html';

    },
    error: function(jqXHR, textStatus, errorThrown) {
    	console.log(errorThrown)
    	alert(errorThrown)
    }
});
		return false;
	});
$("form.addFeedback").on("submit",function(e){
		e.preventDefault();
		var user_id=uid;
		var feedback=$("#feedback").val();

		var data={
			u_id:user_id,
			feedback:feedback
		};

		$.ajax({
			type: "POST",
			url: "http://localhost:8000/feedbacks",
			data: data,
    beforeSend: function(xhr) {
    	if (tok) {
    		xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
    	}
    },

    success: function(responseData, textStatus, jqXHR) {
    	console.log(responseData);
    	alert(responseData.message);
    	location.href='myFeedback.html';

    },
    error: function(jqXHR, textStatus, errorThrown) {
    	console.log(errorThrown)
    	alert(errorThrown)
    }
});
		return false;
	});

$.getJSON("http://localhost:8000/feedbacks", function(res) {
    var data = "";
    $.each(res, function(index) {
    	if(res[index].u_id._id==uid){
      var sdate=moment(res[index].updatedAt).format("ddd DD-MMMM-YYYY HH:mm:ss");
      data='<div class="col-md-6 text-center wow zoomIn" style="flex:0 0 100%; margin-bottom:20px;">';
      data+='<div class="card">';
      data+='<div class="card-header"><h3>Feedback</h3></div>';
      data+='<div class="card-body">';
      data+='<h6>'+res[index].feedback+'</h6>';
      data+='<p class="">Feedback Posted On : '+sdate+'</p>';
      data+='<button  id="deletefeedback" class="btn btn-block btn-danger text-uppercase"  style="width:100px;" value="'+res[index]._id+'">Delete</button>';
      data+='</div>';
      data+='</div>';
      data+='</div>';
      data+='<hr>';
      $("#feedback_data").append(data);

    	}
      
    });
  });

$('#feedback_data').on('click','#deletefeedback',function () {
   id = $(this).val();
   var result = confirm("Are you sure want to delete this feedback?");
   if (result) {
    $.ajax({
      type: 'DELETE', 
      url: 'http://localhost:8000/feedbacks/deleteFeedback/'+id,                                          
      data:id,   
       beforeSend: function(xhr) {
				if (tok) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
				}
			},                 
      success: function(responseData, textStatus, jqXHR) {
        location.href="myFeedback.html";
        var message=responseData.message;
        alert(message);
        
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
