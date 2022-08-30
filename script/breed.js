"use strict";
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// hiển thị danh sách
renderTableBreed(breedArr);

///////////
// bắt sự kiện nhấn vào nút submit
btnSubmit.addEventListener("click", function () {
  // lấy dữ liệu từ form
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  //validate dữ liệu
  const isValidate = validate(data);
  if (isValidate) {
    // thêm dữ liệu vào trong mảng các breed
    breedArr.push(data);
    // lưu dữ liệu lại (cập nhật dữ liệu)
    saveToStorage("breedArr", breedArr);
    // hiển thị lại bảng thông tin các Breed
    renderTableBreed(breedArr);
    // xóa thông tin từ form nhập
    deleteForm();
  }
});

function validate(data) {
  let isValidate = true;

  // nếu nhập vào 1 chuỗi trống hoặc 1 chuỗi toàn khoảng trắng thì báo lỗi
  if (breedInput.value.trim().length === 0) {
    alert("Please input for breed !");
    isValidate = false;
  }

  // bắt lỗi phải chọn type
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }
  return isValidate;
}

///////////////
// hàm xóa thông tin forrm
function deleteForm() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

/////////////////
// Hàm : hiển thị thông tin các Breed lên bảng
function renderTableBreed() {
  tableBodyEl.innerHTML = "";

  // cứ mỗi loại breed ta sẽ thêm 1 dòng (row) đữ liệu vào bảng
  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope = "col"> ${index + 1} </td>
    <td scope = "col"> ${breedItem.breed} </td>
    <td scope = "col"> ${breedItem.type} </td>
    <td> <button type = "button" onclick = "deleteBreed('${
      breedItem.breed
    }')" class ="btn btn-danger"> Delete </button> </td>`;
    tableBodyEl.appendChild(row);
  });
}


///////////////
// hàm: xóa các breed
function deleteBreed(breed) {
  // xác nhận xóa
  const isDelete = confirm("Are you sure!!");
    if(isDelete){
        for(let i = 0; i <breedArr.length; i++ ){
            if(breed === breedArr[i].breed){
                //xóa khỏi mảng
                breedArr.splice(i, 1);
                
                //cập nhật lại dữ liệu
                saveToStorage("breedArr", breedArr);
    
                //gọi lại hàm hiển thị
                renderTableBreed(breedArr);
                break; 
        }
    }
  }
}

