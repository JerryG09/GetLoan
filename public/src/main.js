// Admin Status Buttons

const acceptBtn = () => {
  document.getElementById('reject').style.display = "none";
  document.getElementById('delete').style.display = "none";
  document.getElementById('accept').innerHTML = "Accepted";
  document.getElementById('changeStatus').innerText = "Accepted";
}

const deleteBtn = () => {
  document.getElementById('accept').style.display = "none";
  document.getElementById('reject').style.display = "none";
  document.getElementById('delete').innerHTML = "Deleted";
}

const rejectBtn = () => {
  document.getElementById('accept').style.display = "none";
  document.getElementById('delete').style.display = "none";
  document.getElementById('reject').innerHTML = "Rejected";
}


$(function () {
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
          loans += `<tr>
                      <td>${result[i].id}</td>
                      <td>${result[i].email}</td>
                      <td>${result[i].amount}</td>
                      <td>
                      <a class='btn btn-warning' id="accept" onclick="acceptBtn()">${result[i].status}</a>
                      <a class='btn btn-success' id="reject" onclick="rejectBtn()">Reject</a>
                      <a class='btn btn-danger' id="delete" onclick="deleteBtn()">Delete</a> 
                      </td>
                      </tr>
                  `;

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

    if (!user.amount || !user.email) {
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
          console.log(data);
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