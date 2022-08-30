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
const healthyBtn = document.getElementById("healthy-btn");

let deleteList = document.querySelectorAll('.btn.btn-danger');

//hiển thị danh sách thú cưng test
renderTableData(petArr);

//bắt sự kiện nhấn vào nút inputType để hiển thị loại thú cưng theo Dog-Cat
typeInput.addEventListener('click', renderBreed);

//hàm hiển thị thú cưng theo Dog-Cat
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
//sự kiện nhấn nút Submit
btnSubmit.addEventListener('click', function(e){
    //tạo mảng để lưu trữ dữ liệu từ form input
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
        date: new Date(),
    };
  console.log(data); 

  //Validate dữ liệu hợp lệ
  const isValidate = validate(data);

  if(isValidate){
    //nếu oki thì thêm đối tượng mới vào mảng
    petArr.push(data);
    saveToStorage("petArr", petArr);

    //hiển thị lại danh sách thú cưng
    renderTableData(petArr);

    //xóa dữ liệu trên form vừa nhập
    deleteForm();
  }
});

/*---------------begin------------------*/
//hàm hiển thị danh sách thú cưng

function renderTableData(petArr){
    //xóa nội dung hiện có trong bản
    tableBodyEl.innerHTML = "";

    //tạo vòng lập duyệt qua các element trong petArr
    petArr.forEach((pet) => {
        const row = document.createElement("tr");
        row.innerHTML =`
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
            <td><button type="button" class="btn btn-danger" onclick = "deletePet('${pet.id}')
            ">Delete</button>
            </td>` ;
            tableBodyEl.appendChild(row);
    });
};

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
//hàm xóa các dữ liệu vừa nhập trên form
function deleteForm(){
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
};

/*---------------begin------------------*/
//hàm xóa thứ cưng dựa
function deletePet(petId){
    const isDelete = confirm ("Are you sure?");
    if(isDelete){
        //thực hiện việc xóa, sau khi xác nhận
        for (let i = 0; i < petArr.length; i++){
            if(petId === petArr[i].id){
                //xóa khỏi mảng
                petArr.splice(i,1);
                //cập nhật lại mảng trong localStorage
                saveToStorage('petArr', petArr);
                //gọi lại hàm hiển thị
                renderTableData(petArr);
                break;

            }
        }

    }
}

/*---------------begin------------------*/
//hiển thị các thú cưng khỏe mạnh
let healthyCheck = true;

healthyBtn.addEventListener('click', function(){
    if(healthyCheck){
        //hiển thị thú cưng khỏe mạnh
        showHealthyPet();

        //thay đổi tên nút - thành Show All Pet
        healthyBtn.innerHTML = "Show All Pet";
        healthyCheck = false;
    } else{
        //hiển thị toàn bộ thú cưng
        renderTableData(petArr);

        //thay đổi tên nút - thành Show Healthy Pet
        healthyBtn.innerHTML = "Show Healthy Pet";
        healthyCheck = true;
    };
});

/*---------------begin------------------*/
//hàm hiển thị các thú cưng khỏe mạnh
function showHealthyPet (){
    let healthyPetArr = petArr.filter(
        (pet) => pet.vaccinated && pet.dewormed && pet.sterilized
    );
    renderTableData(healthyPetArr);
};

//kiểm tra validate có hợp lệ   
function validate(data){
    //Không có trường nào bị nhập thiếu dữ liệu.

    //khai báo biến cờ
    let isValidate = true;
    
    // đối với trường ID và Name, dùng Trim() tránh TH là dấu space
    if(data.id.trim() === ""){
        alert('Không để trống Pet ID!!');
        isValidate = false;
    }
    
    if (data.name.trim() === ""){
        alert("Không để trống Pet Name!!")
        isValidate = false;
    }
    
    // đối với trường Age,weigth, length, dùng isNan(), chỉ nhận Number
    if(isNaN(data.age)){
        alert("Không để trống Age!!")
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

    //kiểm tra xem ID không được trùng lập
    if (!petArr.every((pet) => (pet.id != data.id ? true : false))){
        alert("ID must unique!");
        isValidate = false;
        };
        //kiêm tra các trường Age, Weight, Length có hợp lệ hay không?
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
        
    //kiểm tra trường Type và Breed
    if(data.type === "Select Type"){
        alert("Please select Type!");
        isValidate = false;
        };
        
    if(data.breed === "Select Breed"){
        alert("Please select Breed!");
        isValidate = false;
        };     
        return isValidate;
    };
/*----------------end-------------------*/
