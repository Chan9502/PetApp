'use strict';

/*----------------begin---------------------*/
//Bổ sung Animation cho Sidebar
const navEle = document.getElementById('sidebar');
navEle.addEventListener('click', function () {
    this.classList.toggle('active');
});

/*-----------------end----------------------*/
//dữ liệu test
const data1 = {
    id:"P001",
    name: "Tom",
    age: 3,
    type: "Cat",
    weight: 5,
    length: 50,
    color: "Red",
    breed: "Tabby",
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    date: new Date(),
};

const data2 = {
    id:"P002",
    name: "Tyke",
    age: 5,
    type: "Dog",
    weight: 3,
    length: 40,
    color: "Greed",
    breed: "Mixed Breed",
    vaccinated: false,
    dewormed: false,
    sterilized: false,
    date: new Date(),
};


/*---------------------------------------*/
//dữ liệu test breedArr
const breed1 = {
    breed: "Mixed Breed",
    type: "Dog",
};

const breed2 = {
    breed: "Tabby",
    type: "Cat",
};
const breed3 = {
    breed: "Chó Phú Quốc",
    type: "Dog",
};
const breed4 = {
    breed: "Mèo Mướp",
    type: "Cat",
};
/*----------------begin---------------------*/
//lấy dữ liệu petArr
if(!getFromStorage("petArr")){
    //gán dữ kiệu test
    saveToStorage("petArr",[data1, data2]);
};
const petArr = getFromStorage("petArr");

/*----------------begin---------------------*/
//lấy dữ liệu breedArr
if(!getFromStorage("breedArr")){
    //gán dữ kiệu test
    saveToStorage("breedArr",[breed1,breed2, breed3, breed4]);
};

const breedArr = getFromStorage("breedArr");

/*----------------begin---------------------*/
//lấy dữ liệu từ LocalStorage theo Key tương ứng
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
};

/*----------------begin---------------------*/
//Lưu dữ liệu dưới LocalStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
