/**----------------------------------
 * Name:Jupin Lathiya
 * project Title : CRUD Application
 * Github : https://github.com/jupinsimform
 ------------------------------------*/

const searchInput = document.querySelector("#search");
let file;

searchInput.addEventListener("keyup", filterTask);

// function handle filter by Product ID
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".table-row").forEach((task) => {
    const item = task.querySelectorAll(".filter")[0].textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "table-row";
    } else {
      task.style.display = "none";
    }
  });
}

// validate inpu feild
function validateForm() {
  var product_id = document.getElementById("product_id").value;
  var product_name = document.getElementById("product_name").value;
  var price = document.getElementById("price").value;
  var details = document.getElementById("details").value;
  var picture = document.getElementById("image1").src;

  if (product_id == "") {
    alert("product ID is Required");
    return false;
  }

  if (product_name == "") {
    alert("Product Name is Required");
    return false;
  }
  if (price == "") {
    alert("Price must be Required");
    return false;
  }
  if (picture == null) {
    alert("image is Required");
  }
  return true;
}

// show Product details from localStrorage
function showData() {
  var productList;
  if (localStorage.getItem("productList") == null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }

  let table_data = "";

  productList.forEach((element, index) => {
    table_data += "<tr class='table-row'>";
    table_data += "<td class='filter'>" + element.product_id + "</td>";
    table_data += "<td>" + element.product_name + "</td>";
    table_data += "<td>" + element.price + "</td>";
    table_data += "<td>" + element.details + "</td>";
    table_data +=
      "<td> <button onclick='deleteData(" +
      index +
      ")' class='btn btn-danger m-1'><i class='fa-regular fa-trash-can'></i></button> <button onclick='updateData(" +
      index +
      ")' class='btn btn-warning m-1'><i class='fa-regular fa-pen-to-square'></i></button>  <button onclick='viewData(" +
      index +
      ")' class='btn btn-info m-1'><i class='fa-solid fa-eye'></button></td>";
    table_data += "</tr>";
  });
  document.querySelector("#crudtable tbody").innerHTML = table_data;
}

document.onload = showData();

// convert image data to URl for storing in localStorage
function readURL() {
  var image = document.getElementById("image").files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.addEventListener("load", async () => {
    file = reader.result;
  });

  document.getElementById("image1").src = URL.createObjectURL(image);

  return;
}

// add product into localStorage
function addProduct() {
  let product_id = document.getElementById("product_id").value;
  let product_name = document.getElementById("product_name").value;
  let price = document.getElementById("price").value;
  let details = document.getElementById("details").value;
  if (validateForm() == true) {
    let productList;
    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }

    productList.push({
      product_id: product_id,
      product_name: product_name,
      image: file,
      price: price,
      details: details,
    });

    localStorage.setItem("productList", JSON.stringify(productList));
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your Data has been saved",
      showConfirmButton: false,
      timer: 2000,
    });
    showData();
    document.getElementById("product_id").value = "";
    document.getElementById("product_name").value = "";
    document.getElementById("image").value = "";
    document.getElementById("image1").src = "";
    document.getElementById("price").value = "";
    document.getElementById("details").value = "";
  }
}

// delete Product from localStorage
function deleteData(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let productList;
      if (localStorage.getItem("productList") == null) {
        productList = [];
      } else {
        productList = JSON.parse(localStorage.getItem("productList"));
      }
      productList.splice(index, 1);

      localStorage.setItem("productList", JSON.stringify(productList));
      showData();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
}

// update data in localStorage
function updateData(index) {
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";

  let productList;
  if (localStorage.getItem("productList") == null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }

  document.getElementById("product_id").value = productList[index].product_id;
  document.getElementById("product_name").value =
    productList[index].product_name;

  document.getElementById("image1").src = productList[index].image;

  document.getElementById("price").value = productList[index].price;
  document.getElementById("details").value = productList[index].details;

  //   handle update button
  document.querySelector("#update").onclick = function () {
    let productList;
    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }

    if (validateForm() == true) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          productList[index].product_id =
            document.getElementById("product_id").value;
          productList[index].product_name =
            document.getElementById("product_name").value;
          productList[index].image = document.getElementById("image1").src;
          productList[index].price = document.getElementById("price").value;
          productList[index].details = document.getElementById("details").value;

          localStorage.setItem("productList", JSON.stringify(productList));
          showData();
          document.getElementById("product_id").value = "";
          document.getElementById("product_name").value = "";
          document.getElementById("image").value = "";
          document.getElementById("image1").src = "";
          document.getElementById("price").value = "";
          document.getElementById("details").value = "";

          document.getElementById("submit").style.display = "block";
          document.getElementById("update").style.display = "none";
          Swal.fire("Save changes!", "", "success");
        } else if (result.isDenied) {
          document.getElementById("product_id").value = "";
          document.getElementById("product_name").value = "";
          document.getElementById("image").value = "";
          document.getElementById("image1").src = "";
          document.getElementById("price").value = "";
          document.getElementById("details").value = "";

          document.getElementById("submit").style.display = "block";
          document.getElementById("update").style.display = "none";
        }
      });
    }
  };
}

// redirect to view page
function viewData(index) {
  window.location.href = "view.html?index=" + index;
}

// sort Table data by product id,product name,price
function sortTable(n, evt) {
  let thead = document.querySelector("thead");
  let tbody = document.querySelector("tbody");
  let bRows = [...tbody.rows];
  let hData = [...thead.querySelectorAll("th")];
  let desc = false;

  hData.map((head) => {
    if (head != evt) {
      head.classList.remove("asc", "desc");
    }
  });

  desc = evt.classList.contains("asc") ? true : false;
  evt.classList[desc ? "remove" : "add"]("asc");
  evt.classList[desc ? "add" : "remove"]("desc");

  tbody.innerHTML = "";

  if (n == 0 || n == 2) {
    bRows.sort((a, b) => {
      let x = Number(a.getElementsByTagName("td")[n].innerHTML.toLowerCase());
      let y = Number(b.getElementsByTagName("td")[n].innerHTML.toLowerCase());

      return desc ? (x < y ? 1 : -1) : x < y ? -1 : 1;
    });
  } else {
    bRows.sort((a, b) => {
      let x = a.getElementsByTagName("td")[n].innerHTML.toLowerCase();
      let y = b.getElementsByTagName("td")[n].innerHTML.toLowerCase();
      return desc ? (x < y ? 1 : -1) : x < y ? -1 : 1;
    });
  }

  bRows.map((bRow) => {
    tbody.appendChild(bRow);
  });
}
