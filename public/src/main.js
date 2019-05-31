
$(function () {
   // Accept Button
  $(document).on('click', '#accept', function() {
    this.innerHTML = 'Accepted';
    $(this).siblings().css('display', 'none');

    let id = $(this).closest('tr').attr('id');
    let update = {
      status: "Accepted"
    }
    $.ajax({
      type: 'PATCH',
      url: 'http://localhost:3000/loans/' + id,
      data: JSON.stringify(update),
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        console.log('success', data);
      },
      error: (e) => console.log(e)
    });
  })

  // Reject Button
  $(document).on('click', '#reject', function() {
    this.innerHTML = 'Rejected';
    $(this).siblings().css('display', 'none');

    let id = $(this).closest('tr').attr('id');
    let update = {
      status: "Rejected"
    }
    $.ajax({
      type: 'PATCH',
      url: 'http://localhost:3000/loans/' + id,
      data: JSON.stringify(update),
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        console.log('success', data);
      },
      error: (e) => console.log(e)
    });
  })

  // Delete Button
  $(document).on('click', '#delete', function() {
    this.innerHTML = 'Deleted';
    $(this).siblings().css('display', 'none');

    let id = $(this).closest('tr').attr('id');
    let update = {
      status: "Rejected"
    }
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3000/loans/' + id,
      data: JSON.stringify(update),
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        console.log('success', data);
      },
      error: (e) => console.log(e)
    });
  })

  // Get Loan
  let getLoan = () => {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/loans",
      dataType: "json",
      success: result => {
        let loans = "";

        for (var i = 0; i < result.length; i++) {
          loans += `<tr>
                      <td>${result[i].id}</td>
                      <td>${result[i].amount}</td>
                      <td>${result[i].status}</td>
                  `;
        }

        $("#tbody").html(loans);

      },
      error: err => console.log("error", err)
    });
  };
  getLoan();

  // populate admin table
  let populateAdmin = () => {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/loans",
      dataType: "json",
      success: result => {
        let loans = "";

        for (var i = 0; i < result.length; i++) {
          loans += `<tr id='${result[i].id}'>
                      <td>${result[i].id}</td>
                      <td>${result[i].email}</td>
                      <td>${result[i].amount}</td>
                  `;

                  if (result[i].status === 'Accepted') {
                    loans += `<td><a class="btn btn-success text-light">${result[i].status}</a></td></tr>`
                  } else if (result[i].status === 'Rejected') {
                    loans += `<td><a class="btn btn-danger text-light">${result[i].status}</a></td></tr>`
                  } else if (result[i].status === 'Delete') {
                    loans += `<td><a class="btn btn-danger text-light">${result[i].status}</a></td></tr>`
                  }
                  else {
                  loans +=  `<td>
                    <a class='btn btn-warning' id="accept">${result[i].status}</a>
                    <a class='btn btn-success' id="reject">Reject</a>
                    <a class='btn btn-danger' id="delete">Delete</a> 
                    </td>
                    </tr>`
                  }
                  

        }

        $("#admin-tbody").html(loans);

      },
      error: err => console.log("error", err)
    });
  };
  populateAdmin()

  // Request Loan
  $('#request').on('click', function (e) {
    e.preventDefault();

    
    var user = {
      amount: $('#amount').val(),
      email: $('#exampleInputEmail1').val(),
      status: "Pending",
    }

    if (!user.email || !user.amount) {
      alert("Fill required fields")
    } else {
      $.ajax({
        type: 'POST',
        data: JSON.stringify(user),
        url: "http://localhost:3000/loans",
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
          console.log(result);
          getLoan();
        },
        error: function (err) {
          console.log("error", err);
        }
      });
    }
  });

  // Login User
  $('#login').on('click', function (e) {
    e.preventDefault();

    let user = {
      email: $('#loginEmail').val(),
      pwd: $('#loginPwd').val()
    }

    if (user.email === 'decadev@gmail.com' || user.pwd === 'decagon') {
      window.location = './ui/admin/adminProfile.html'
    } else {
      $.ajax({
        type: 'GET',
        data: JSON.stringify(user),
        url: `http://localhost:3000/users/?q=${user.email}`,
        dataType: 'json',
        contentType: "application/json",
        success: (data) => {
          if (data.length === 1) {
            window.location = './ui/users/userProfile.html'
          } else {
            alert('user does not exist in our record')
          }
        },
        error: e => console.log(e)
      })
    }
  });


  // create users
  $('#submit').on('click', function (e) {
    e.preventDefault();

    var user = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      phone: $('#phone').val(),
      email: $('#exampleInputEmail1').val(),
      pwd: $('#exampleInputPassword1').val()
    }
    
    

    if (!user.firstName || !user.lastName || !user.phone || !user.email || !user.pwd) {
      alert("Fill required fields")
    } else {
      $.ajax({
        type: 'POST',
        data: JSON.stringify(user),
        url: "http://localhost:3000/users",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
          let id = data.id
          console.log(id);
          populateAdmin();
          window.location = './ui/users/userProfile.html'
        },
        error: function (err) {
          console.log("error", err);
        }
      });
    }

  });
});