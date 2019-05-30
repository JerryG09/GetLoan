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


// $(document).ready(function(){
//   $.ajax({
//     type: "POST",
//     url: 'http://localhost:3000/users',
//     dataType: json
//   });
// $("#submit").click(function(){
//       var email = $('#exampleInputEmail1').val();
//     var pwd = $('#exampleInputPassword1').val();
//     console.log(email, pwd)
//   // let url = `http://localhost:3000/users?email=${email}?passowrd=${pwd}`;
//   $.post(`http://localhost:3000/users?email=${email}?passowrd=${pwd}`,
//   function(data, status){
//     // alert("Data: " + data + "\nStatus: " + status);
//     console.log(data)
//   });
// });
// });




});