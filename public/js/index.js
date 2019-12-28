$(document).ready(function(){
	$(function () {
		$('[data-bm-close][data-bm-open]').on('click', function () {
			var $this = $(this);
			$($this.data('bm-close')).one('hidden.bs.modal', function () {
				$($this.data('bm-open')).modal('show');
			}).modal('hide');
		});
	});

	$("#message").hide();
	$("#message_register_error").hide();
	$("#message_register_success").hide();
	$("#message_enquire_uccess").hide();


	$("form.addUser").on("submit",function(e){
		e.preventDefault();
		var first_name=$("#first_name").val();
		var last_name=$("#last_name").val();
		var email=$("#email").val();
		var gender=$("#gender").val();
		var batch=$("#batch").val();
		var section=$("#section").val();
		var user_name = $("#user_name").val();
		var password = $("#password").val();
		var confirm_password=$("#confirm_password").val();
		var gender = $("input[name='radio']:checked").val();

		if (password!=confirm_password) {
			alert("Password do not match");
			$("#confirm_password").focus();
			return;
		}

		var data = {
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
			type: "POST",
			url: "http://localhost:8000/users/register",
			data: data,
			async:false,
			success: function(responseData, textStatus, jqXHR) {
				var msg_error=responseData.message_error;
				var msg_success=responseData.message_success;
				if (responseData.message_error!=null ) {
					$("#message_register_error").show();
				$("#message_register_error").text(msg_error);
				}
				else if(responseData.message_success!=null){
					$("#message_register_success").show();
					$("#message_register_error").hide();
					$("#message_register_success").text(msg_success);
					$("#first_name").val("");
					$("#last_name").val("");
					$("#email").val("");
					$("#batch").val("");
					$("#section").val("");
					$("#user_name").val("");
					$("#password").val("");
					$("#confirm_password").val("");
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown)
				alert(errorThrown)
			}
		});
	});


	$("form.userLogin").on("submit",function(e){
		e.preventDefault();
		var user_name = $("#user_name1").val();
		var password = $("#password1").val();

		var data = {
			user_name: user_name,
			password:password,
		};
		console.log(data);
		$.ajax({
			type: "POST",
			url: "http://localhost:8000/users/login",
			data: data,
			async:false,
			success: function(responseData, textStatus, jqXHR) {
				//alert("Login Successful");
				if(responseData.token!=null){
					localStorage.setItem('token', responseData.token);
				localStorage.setItem('uid',responseData.user._id);
				localStorage.setItem('user_type',responseData.user.user_type);
				var user_type=responseData.user.user_type;
				if (user_type=="admin") {
					location.href="admin/index.html";
				}
				else if(user_type="user"){
					location.href="user/index.html";

				}
				}
				
			else{
				//alert(responseData.message);
				$("#message").text(responseData.message);
				$("#message").show();

			}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
				alert(errorThrown);
				window.location.reload();
			}
		});
	});

	$.getJSON("http://localhost:8000/courses", function(res) {
    var data = "";
    $.each(res, function(index) {
      var image=res[index].course_image;
      data='<div class="col-md-6 wow zoomIn" style="margin-bottom:20px;" >';
      data+='<div class="card mb-5 mb-lg-0 ">';
      data+='<div class="card-header">';
       data+='<h5 class="card-title text-uppercase text-center">'+res[index].course_name+'</h5>';
      data+='</div>';
      data+='<div class="card-body ">';
    
      data+='<h6 class="card-price text-center">Rs.'+res[index].course_price+'<span class="period">/'+res[index].course_duration+'</span></h6>';
      data+='<hr>';
      if (image!=null && image!="") {
        data+='<div class="text-center">';
         data+='<img src="http://localhost:8000/'+res[index].course_image+'" class="img-responsive" width="200">';
         data+='</div>';
      }
      data+='<ul class="fa-ul">';
      data+='<li><span class="fa-li"><i class="fas fa-check"></i></span>'+res[index].course_modules+'</li>';
      data+='<li><span class="fa-li"><i class="fas fa-check"></i></span>'+res[index].course_desc+'</li>';
      data+='</ul>';
      data +='<button class="btn btn-block btn-primary text-uppercase" value='+res[index]._id+' id="enquire" data-toggle="modal" data-target="#enquireModel" style="margin-bottom:5px;width:180px;float:left;">Enquire Now</button>';
      data+='</div>';
      data+='</div>';
      data+='</div>';
      $("#data").append(data);
    });
  });
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
      data+='</div>';
      data+='</div>';
      data+='</div>';
      data+='<hr>';
      $("#notice_data").append(data);
    });
  });

	$("form.addEnquire").on("submit",function(e){
		e.preventDefault();
		var first_name=$("#first_name3").val();
		var last_name=$("#last_name3").val();
		var email=$("#email3").val();
		var phone = $("#phone").val();
		var address = $("#address").val();
	
		var data = {
			first_name:first_name,
			last_name:last_name,
			email:email,
			phone:phone,
			address:address
		};
		console.log(data);
		$.ajax({
			type: "POST",
			url: "http://localhost:8000/enquires",
			data: data,
			async:false,
			success: function(responseData, textStatus, jqXHR) {
				var message=responseData.message;
					$("#message_enquire_success").text(message);
					$("#message_enquire_success").show();
					$("#first_name3").val("");
					$("#last_name3").val("");
					$("#email3").val("");
					$("#phone").val("");
					$("#address").val("");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown)
				alert(errorThrown)
			}
		});
	});


});