var totalPrice = 0;

document.getElementById("product").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Kiểm tra xem phím bấm có phải là Enter không
    event.preventDefault(); // Ngăn hành vi mặc định của Enter
    document.getElementById("price").focus(); // Chuyển con trỏ về ô nhập giá
  }
});

document.getElementById("price").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Kiểm tra xem phím bấm có phải là Enter không
    event.preventDefault(); // Ngăn hành vi mặc định của Enter
    addProduct(); // Gọi hàm thêm sản phẩm
    document.getElementById("product").focus(); // Đưa con trỏ về ô nhập sản phẩm
  }
});

function addProduct() {
  var product = document.getElementById("product").value;
  var price = document.getElementById("price").value;
  price = parseFloat(price);

  if (product !== "" && !isNaN(price)) {
    // Tạo phần tử danh sách
    var orderList = document.getElementById("orderList");
    var listItem = document.createElement("li");

    // Tạo nội dung sản phẩm
    var productText = document.createElement("span");
    productText.textContent = product + " - $" + price;

    // Tạo nút xóa
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Xóa";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function () {
      // Trừ giá sản phẩm khỏi tổng tiền
      totalPrice -= price;
      document.getElementById("totalPrice").textContent =
        "Tổng tiền: $" + totalPrice;

      // Xóa phần tử khỏi danh sách
      orderList.removeChild(listItem);
    };

    // Gắn nội dung và nút xóa vào mục danh sách
    listItem.appendChild(productText);
    listItem.appendChild(deleteBtn);
    orderList.appendChild(listItem);

    // Cập nhật tổng tiền
    totalPrice += price;
    document.getElementById("totalPrice").textContent =
      "Tổng tiền: $" + totalPrice;

    // Xóa nội dung trong ô nhập liệu
    document.getElementById("product").value = "";
    document.getElementById("price").value = "";
  }
}
