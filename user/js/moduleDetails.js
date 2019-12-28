$(document).ready(function(){
	var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");

  $.getJSON("http://localhost:8000/modules/"+id, function(res) {
    
      var mcode=res.module_code;
      var mname=res.module_name;
      var content1=res.topic1;
      var content2=res.topic2;
      var content3=res.topic3;
      var content4=res.topic4;
      var content5=res.topic5;
      var content6=res.topic6;
      var content7=res.topic7;
      var content8=res.topic8;
      var content9=res.topic9;
      var content10=res.topic10;
      var content11=res.topic11;
      var content12=res.topic12;
      var content13=res.topic13;
      var content14=res.topic14;
      var content15=res.topic15;
      var content16=res.topic16;
      var content17=res.topic17;
      var content18=res.topic18;
      var content19=res.topic19;
      var content20=res.topic20;

      var data=""
      data+='<div class="col-md-12 " style="background:#fff;">';
      data+='<h1 class="text-center">'+mcode+'</h1>';
      data+='<h1 class="text-center">'+mname+'</h1>';
      data+='</div>';
      data+='<span class="mgap"></span>';
      data+='<div class="module_content" style="background:#fff;width:100%;">';
      if(content1!=null ){
      	data+='<div class="col-md-12">';
      	data+='<h1>Topic 1</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
        data+='<a href="http://localhost:8000/'+content1+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 1</a>';
      	data+='</div>';
      	data+='<hr/>';
      }
      if(content2!=null && content2!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 2</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content2+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 2</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content3!=null && content3!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 3</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content3+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 3</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content4!=null && content4!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 4</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content4+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 4</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content5!=null && content5!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 5</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content5+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 5</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content6!=null && content6!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 6</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content6+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 6</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content7!=null && content7!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 7</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content7+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 7</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content8!=null && content8!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 8</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content8+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 8</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content9!=null && content9!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 9</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content9+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 9</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content10!=null && content10!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 10</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content10+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 10</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content11!=null && content11!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 11</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content11+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 11</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content12!=null && content12!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 12</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content12+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 12</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content13!=null && content13!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 13</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
              data+='<a href="http://localhost:8000/'+content13+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 13</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content14!=null && content14!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 14</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content14+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 14</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content15!=null && content15!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 15</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content15+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 15</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content16!=null && content16!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 16</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content16+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 16</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content17!=null && content17!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 17</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content17+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 17</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content18!=null && content18!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 18</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content18+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 18</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content19!=null && content19!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 19</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
              data+='<a href="http://localhost:8000/'+content19+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 19</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      if(content20!=null && content20!=""){
      	data+='<div class="col-md-12" >';
      	data+='<h1>Topic 20</h1>';
      	data+='</div>'
      	data+='<div class="col-md-12">';
      	        data+='<a href="http://localhost:8000/'+content20+'" target="blank" style="color:blue;">'+res.module_code+'-Topic 20</a>';

      	data+='</div>';
      	data+='<hr/>';
      }
      data+='</div>';
      

      $("#module_details_data").append(data);
   
  });

})

