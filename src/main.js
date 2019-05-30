$(function() {
  $('#submit').on('click', function(e){
    e.preventDefault();

    var user = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      phone: $('#phone').val(),
      email: $('#exampleInputEmail1').val(),
      pwd: $('#exampleInputPassword1').val()
  }

    $.ajax({
      type: 'POST',
      data: JSON.stringify(user),
      url: "http://localhost:3000/users",
      dataType: "json",
      contentType: "application/json",
      success: function(result) {
        console.log(result)
      },
      error: function(err) {
        console.log("error", err);
      }
    });
  });
});