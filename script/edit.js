'use strict';
/*---------------------------------------*/
//inputvalidate
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const formEle = document.getElementById("container-form");

/*---------------------------------------*/
//hiển thị lại bảng danh sách thú cưng
renderTableData(petArr);

/*---------------------------------------*/
//hiển thị dữ liệu thú cưng vào bảng
function renderTableData(petArr){
    //xóa nội dung hiển thị của form
    tableBodyEl.innerHTML="";

    //với mỗi thú cưng có trong dãy petArr, ta hiển thị thành 1 dãy.
    petArr.forEach((pet) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <th scope="row">${pet.id}</th>
        <td>${pet.name}</td>
        <td>${pet.age}</td>
        <td>${pet.type}</td>
        <td>${pet.weight}</td>
        <td>${pet.length}</td>
        <td>${pet.breed}</td>
        <td>
        <i class="bi bi-square-fill" style="color: 
        ${pet.color}"></i>
        </td>
        <td><i class="bi ${pet.vaccinated ? 
            "bi-check-circle-fill" : 
            "bi-x-circle-fill"
        }"></i></td>
        <td><i class="bi ${pet.dewormed ? 
            "bi-check-circle-fill" : 
            "bi-x-circle-fill"
        }"></i></td>
        <td><i class="bi ${pet.sterilized ? 
            "bi-check-circle-fill" : 
            "bi-x-circle-fill"
        }"></i></td>
        <td>
        ${displayTime(pet.date).slice(8,10)}/
        ${displayTime(pet.date).slice(5,7)}/
        ${displayTime(pet.date).slice(0,4)}
        </td>
        <td><button onclick = "editPet('${pet.id}')" type="button" 
        class="btn btn-danger">Edit</button></td>
        `;
        tableBodyEl.appendChild(row);
    });
    
    // bắt sự kiện Edit
    editEvent();
}
/*---------------begin------------------*/
//hàm hiển thị thời gian
function displayTime(date){
    if(typeof date === 'string'){
        return date;
    }else if (typeof date === "object"){
        return JSON.parse(JSON.stringify(date));
    };
};

/*---------------begin------------------*/
//hàm bắt sự kiện khi người dùng click vào nút Edit
function editEvent(){
    const editElList = document.querySelectorAll(".btn.btn-danger");
    editElList.forEach((editEle) => {
        
        //sự kiện click nút edit
        editEle.addEventListener("click", function(){
        
        //lấy ID của thú cưng được edit
        const id = editEle.parentElement.parentElement.children[0].innerHTML;
        
        //gọi hàm edit
        editPet(id);
        });
    });
};

/*---------------begin------------------*/
// hàm chỉnh sửa dữ liệu thông tin thú cưng
function editPet(id){
    //hiện lại form nhập dữ liệu
    formEle.classList.remove("hide");

    //tìm đến dữ liệu của pet cần edit 
    const pet = petArr.find((petItem) => petItem.id === id);
    
    //hiển thị những thông tin của thú cưng trên form nhập 
    idInput.value = id;
    nameInput.value = pet.name;
    ageInput.value = pet.age;
    typeInput.value = pet.value;
    weightInput.value = pet.weight;
    lengthInput.value = pet.length;
    colorInput.value = pet.color;
    vaccinatedInput.checked = pet.vaccinated;
    dewormedInput.checked = pet.dewormed;
    sterilizedInput.checked = pet.sterilized;

    //hiển thị đúng các loại type cho từng loại Dog-Cat khi người sửa đổi dũ liệu
    renderBreed();

    //hiển thị dữ liệu loại giống thú cưng (trước khi edit)
    breedInput.value = `${pet.breed}`;
};

/*---------------begin------------------*/
//sự kiện click nút typeInput, sau đó hiển thị đúng type thú cưng
typeInput.addEventListener('click', renderBreed);

/*---------------begin------------------*/
//hiển thị type thú cưng theo từng loại nhất định
function renderBreed(){
    breedInput.innerHTML = "<option>Select Type</option>";

    //nếu type là Dog
    if(typeInput.value === "Dog"){
        //mảng chứa thú cưng nếu type là Dog
        const breedDog = breedArr.filter((breedItem) => breedItem.type === "Dog");
        breedDog.forEach(function(breedItem){
            const option = document.createElement("option");
            option.innerHTML =`${breedItem.breed}`;
            breedInput.appendChild(option);
        });
        
        //nếu type là Cat
    } else if (typeInput.value === "Cat"){
        //mảng chứa thứ cưng nếu type là Cat
        const breedCat = breedArr.filter((breedItem) => breedItem.type === "Cat");
        breedCat.forEach(function(breedItem){
            const option = document.createElement("option");
            option.innerHTML =`${breedItem.breed}`;
            breedInput.appendChild(option);
        });
    }
}

/*---------------begin------------------*/
//sự kiện click vào nút submit
btnSubmit.addEventListener('click', function(){
    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        length: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked, 
        // date: new Date(),
};
    //validate dữ liệu hợp lệ
    const isValidate = validate(data);
    
    if(isValidate){
        const i = petArr.findIndex((pet) => pet.id === data.id);

        //giữ nguyên ngày tháng nhập 
        data.date = petArr[i].date;

        //cập nhật lại dữ liêu thứ cưng vừa được edit
        petArr[i] = data;
        //lưu lại thông tin vừa được edit
        saveToStorage("petArr", petArr);

        //ẩn lại form và hiện lại bảng dữ liệu thú cưng
        formEle.classList.add("hide");
        renderTableData(petArr);
    }
});
/*---------------begin------------------*/
//validate dữ liệu hợp lệ
function validate(data){
    //khai báo biến flag
    let isValidate = true;
    // bỏ điều kiện trùng thú cưng, do đang tìm thú cưng cần sửa chữa;
    if(nameInput.value.trim().length === 0){
        alert('vui lòng nhập Tên Pet!!');
        isValidate = false;
    }

    if(isNaN(data.age)){
        alert("vui lòng nhập Tuổi Pet!!")
        isValidate = false;
    }

    if(isNaN(data.weight)){
        alert("Không để trống Weigth!!")
        isValidate = false;
    }
    if(isNaN(data.length)){
        alert("Không để trống Length!!")
        isValidate = false;
    }
    if(data.age < 1 || data.age >15){
        alert("Age must be between 1 and 15!");
        isValidate = false;
        };
        
    if(data.weight < 1 || data.weight >15){
        alert("Weight must be between 1 and 15!");
        isValidate = false;
        };
        
    if(data.length < 1 || data.length >100){
        alert("Length must be between 1 and 100!");
        isValidate = false;
        };
    
    //Bắt buộc phải chọn dữ liệu cho trường type
    if(data.type ==="Select Type"){
        alert('Pls seletor Type!!')
        isValidate = false;
    }

    //bắt buộc chọn dữ liệu cho trường breed
    if(data.breed === "Select breed"){
        alert('Pls seletor Breed!!')
        isValidate = false;
    }

    return isValidate;
}









