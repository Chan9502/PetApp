'use strict';
/*---------------------------------------*/
//inputvalidate
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const btnFind = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

let deleteList = document.querySelectorAll('.btn.btn-danger');

//đầu vào biển thị toàn bộ dữ liệu thú cưng
renderTableData(petArr);

/*---------------------------------------*/
//bắt đầu sự kiện nhấn vào nút Find
//tìm kiếm dữ liệu thú cưng theo điều kiện nhâp vào và hiển thị theo thông tin đã nhập
btnFind.addEventListener('click', function(){
    /*  Lưu ý 1: Nếu người dùng k nhập các trường dữ liệu mà ấn Submit 
        ==> hiển thị toàn bộ danh sách thú cưng

        Lưu ý 2: Trường Hợp người dùng nhập nhiều trường dữ liệu để tìm kiếm 
        ==> kết hợp các điều kiện đó để tìm kiếm kết quả cho ng dung
    */

    let petArrFind = petArr;

    //nếu nhập tìm kiếm theo ID ==> tìm theo ID
    if (idInput.value){
        petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
    };

    //nếu nhập tìm kiếm theo tên ==> tìm theo tên
    if(nameInput.value){
        petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
    };

    //TH nhập Type ==> tìm kiếm theo Type
    if(typeInput.value !== "Select Type"){
        petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
    }

    //TH nhập breed ==> tìm kiếm theo Breed
    if(breedInput.value !== "Select Breed"){
        petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
    }

    // TH tích chọn vaccinatedInput
    if(vaccinatedInput.checked === true){
        petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
    }

    //TH tích chọn dewormedInput
    if(dewormedInput.checked === true){
        petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
    }

    // TH tích chọn sterilizedInput
    if(sterilizedInput.checked === true){
        petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
    }

    //hiển thị lại dữ liệu theo những trường đã tìm kiếm
    renderTableData(petArrFind);

});

/*---------------------------------------*/
//hàm hiển thị danh sách thú cưng
function renderTableData(petArr){
    //xóa nội dung trong form
    tableBodyEl.innerHTML = "";
    //với mỗi thú cưng có trong dãy petArr, ta hiển thị thành 1 dãy.
    petArr.forEach(pet => {
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
        </td>`;
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

// hiển thị các loại giống breed
renderBreed();

/*---------------begin------------------*/
// hàm hiển thị tất cả các giống breed 
// lưu ý: tất cả các giống thứ cưng, không phân biệt Dog or Cat
function renderBreed(){
    breedArr.forEach(function(breedItem){
        const option = document.createElement("option");
        option.innerHTML = `${breedItem.breed}`;
        breedInput.appendChild(option);
    });
};




