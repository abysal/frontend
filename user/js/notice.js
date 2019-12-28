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

            });