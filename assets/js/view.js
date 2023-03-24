const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const index = urlParams.get("index");

// if page did not get index then it redirect to home page
if (index) {
  let productList;
  if (localStorage.getItem("productList") == null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }

  document.getElementById("product_id").innerText =
    "id :" + productList[index].product_id;
  document.getElementById("product_name").innerText =
    productList[index].product_name;
  document.getElementById("image1").src = productList[index].image;

  document.getElementById("price").innerText =
    "₹" + productList[index].price + ".00";
  document.getElementById("details").innerText = productList[index].details;
} else {
  window.location.href = "index.html";
}
