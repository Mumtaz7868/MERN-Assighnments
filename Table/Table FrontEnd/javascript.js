$(function () {
  console.log("script loaded");
  loadData();
  $("#dataappend").on("click", ".deletebutton", handleDelete);
  $("#dataappend").on("click", ".updatebutton", handleUpdate);
  $("#addbtn").click(handleAdd);
  $("#updatebtn").click(sendAjaxUpdate);
  $("#resetbtn").click(loadData);
});
function sendAjaxUpdate() {
  console.log("Send ajax PUT request");
  var name = $("#newName").val();
  var gender = $("#Male").is(":checked");

  var booleangender;
  if (booleangender == "Male") {
    booleangender == true;
  } else {
    booleangender == false;
  }
  var age = $("#newAge").val();
  var city = $("#newCity").val();
  var id = $("#hiddenid").html();
  console.log(id);

  $.ajax({
    url: "http://localhost:3300/Table/" + id,
    method: "PUT",
    data: { name, gender, age, city },
    success: function () {
      $("#newName").val("");
      $("#newAge").val("");
      $("#newCity").val("");
      $("#hiddenid").html("");

      loadData();
    },
  });
}
function handleAdd() {
  // var t = $("#newTitle").val();
  // var b = $("#newBody").val();
  var name = $("#newName").val();
  var age = $("#newAge").val();
  var city = $("#newCity").val();
  var gender = $("#Male").is(":checked");

  var booleangender;
  if (booleangender == "Male") {
    booleangender == true;
  } else {
    booleangender == false;
  }

  $.ajax({
    url: "http://localhost:3300/Table",
    method: "POST",
    // data: { title: t, body: b },
    data: { name, gender, age, city },
    success: function () {
      $("#newName").val("");
      $("#newAge").val("");
      $("#newCity").val("");
      loadData();
    },
    error: handleError,
  });
}

function handleDelete() {
  var btn = $(this);

  var id = btn.attr("data-id");
  $.ajax({
    url: "http://localhost:3300/Table/" + id,
    method: "DELETE",
    success: loadData,
  });
}
function handleUpdate() {
  var btn = $(this);
  var id = btn.attr("data-id");

  $.ajax({
    url: "http://localhost:3300/Table/" + id,
    method: "GET",
    // data: { title: t, body: b },
    success: function (response) {
      console.log(response);
      $("#newName").val(response.name);
      $("#newAge").val(response.age);
      $("#newCity").val(response.city);
      $("#hiddenid").append(response._id);
    },
  });
}

function loadData() {
  $.ajax({
    url: "http://localhost:3300/Table",
    method: "GET",
    success: getRequestData,
    error: handleError,
  });
}
function handleError() {
  $("#dataappend").empty();
  $("#dataappend").html("Error on server");
}
function getRequestData(response) {
  $("#dataappend").empty();
  console.log(response);
  for (var i = 0; i < response.length; i++) {
    $("#dataappend").append(
      ` <tr >
      <td>${response[i].name}</td>
      <td>${response[i].gender ? "Male" : "Female"}</td>
      <td>${response[i].age}</td>
      <td>${response[i].city}</td>
      
      <td><button class="btn btn-success  updatebutton  float-right" data-id=${
        response[i]._id
      }>Update</button><button class="btn btn-danger deletebutton float-right" data-id=${
        response[i]._id
      }>Delete</button></td></tr>`
    );
  }
}
