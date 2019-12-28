$(document).ready(function(){
	var tok = localStorage.getItem('token');
	//console.log(tok);
	var uid=localStorage.getItem('uid');
	//console.log(uid);

	$.ajax({
		type: 'get',
		url: 'http://localhost:8000/users/me',
		beforeSend: function(xhr) {
			if (tok) {
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
			data1+='<button class="btn btn-block btn-primary text-uppercase" style="width:250px;"><a href="updateProfile.html">Update Profile</a></button>';
			data1+='</div>';
			
			data2+='<h5>Profile Image:</h5>';
			if (profile_image!="") {
				data2+='<img src="http://localhost:8000/'+data.user_image+'" class="img-responsive" width="200"><br/><br/>';
			}
			if(profile_image==""){
				data2+='<h5>No image uploaded yet.Please upload profile picture</h5>';
			}
			data2+='<button class="btn btn-block btn-primary text-uppercase" style="width:250px;"><a href="updateImage.html">Update Profile Image</a></button>&nbsp;';
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



	$.getJSON("http://localhost:8000/users", function(res) {
    $("#users").append(res); 
    });
    $.getJSON("http://localhost:8000/users/admins", function(res) {
    $("#admins").append(res); 

    });
     
      $.ajax({
		type: 'get',
		url: 'http://localhost:8000/courses',
		beforeSend: function(xhr) {
			if (tok) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
			}
		},
		success: function(data) {
			
			$("#courses").append(data.length);
			
		},
		error: function() {
			//alert("Sorry, you are not logged in.");
			//location.href="../index.html";
		}
	});

      $.ajax({
		type: 'get',
		url: 'http://localhost:8000/notices',
		beforeSend: function(xhr) {
			if (tok) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
			}
		},
		success: function(data) {
			
			$("#notices").append(data.length);
			
		},
		error: function() {
			//alert("Sorry, you are not logged in.");
			//location.href="../index.html";
		}
	});

      $.ajax({
		type: 'get',
		url: 'http://localhost:8000/assignments',
		beforeSend: function(xhr) {
			if (tok) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
			}
		},
		success: function(data) {
			
			$("#assignments").append(data.length);
			
		},
		error: function() {
			//alert("Sorry, you are not logged in.");
			//location.href="../index.html";
		}

	});
      $.ajax({
		type: 'get',
		url: 'http://localhost:8000/submissions',
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
	});
      $.ajax({
		type: 'get',
		url: 'http://localhost:8000/feedbacks',
		beforeSend: function(xhr) {
			if (tok) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
			}
		},
		success: function(data) {
			
			$("#feedbacks").append(data.length);
			
		},
		error: function() {
			//alert("Sorry, you are not logged in.");
			//location.href="../index.html";
		}
	});
      $.ajax({
		type: 'get',
		url: 'http://localhost:8000/enquires',
		beforeSend: function(xhr) {
			if (tok) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
			}
		},
		success: function(data) {
			
			$("#enquiries").append(data.length);
			
		},
		error: function() {
			//alert("Sorry, you are not logged in.");
			//location.href="../index.html";
		}
	});
       $.ajax({
		type: 'get',
		url: 'http://localhost:8000/modules',
		beforeSend: function(xhr) {
			if (tok) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
			}
		},
		success: function(data) {
			
			$("#modules").append(data.length);
			
		},
		error: function() {
			//alert("Sorry, you are not logged in.");
			//location.href="../index.html";
		}
	});




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
				
				alert(errorThrown)
			}
		});
		return false;
	});


});

