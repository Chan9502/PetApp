'use strict';
const btnExport = document.getElementById('export-btn');
const btnImport = document.getElementById('import-btn');
const fileInput = document.getElementById('input-file');

// sự kiện nhấn vào nút Export
btnExport.addEventListener('click', function(){
    const isExport = confirm('Bạn muốn xuất dữ liệu?')
    if (isExport){
        saveStaticDataToFile();
    }
});

// hàm lưu dữ liệu xuống file
function saveStaticDataToFile (){
    
    // tạo dữ liệu để lưu xuống file
    const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)],{
        type: "application/json",
    });

    // lưu file 
    saveAs(blob, "petData.json");
    // dùng thư viện FileSaver.Js (theo hướng dẫn ở đề bài)
};

// bắt sự kiện lưu vào nút import
btnImport.addEventListener('click', function(){
    //kiểm tra xem người dùng có chọn tệp tin hay chưa?
    if(!fileInput.value){
        alert('Vui lòng đính kèm file!!');
    }else {
        //xác nhận tệp tin đã chọn
        const isImport = confirm('Bạn có chắc muốn up file này?');
        if(isImport){
            const file = fileInput.files[0];

            const reader = new FileReader();

            //sự kiện load dữ liệu từ file 
            reader.addEventListener(
                "load",
                function(){
                    // kiểm tra xem cấu trúc file có hợp lệ với định dạng yêu cầu hay không?
                    const isValidateFile = JSON.parse(reader.result);
                    if(isValidateFile){
                        // lưu dữ liệu
                        saveToStorage("petArrdata", JSON.parse(reader.result));
                        // thông báo import thành công
                        alert('Bạn đã upfile thành công :)');
                    }
                },
                false
            );

            //đọc file
            if(file){
                reader.readAsText(file);
            }

            // reset file input
            fileInput.value = "";
        }
    }
});

// /*kiểm tra cấu trúc file có hợp lệ hay không?
//     tránh trường hợp file không tương thích với phần mền

//     nguyên tắc kiểm tra:
//     - đi từ ngoài vào trong, từ trên xuống dưới nếu 
//     <data là dữ liệu sau khi đã JSON.parse()>
//     1. data phải là 1 mảng chứa các pet Obje bên trong 
//     2. các phần tử của Data phải là 1 dạng giống Object 
//     3. đi sâu vào trong từ phần tử của mảng

// */

// // Hàm kiểm tra cấu trúc file 
// function checkFile(data){
//     // nếu hàm không phải là 1 array
//     if(!data instanceof Array){
//         alert('File không hợp lệ: Dữ liệu phải là một mảng chứa Object!!')
//         return false;
//     };
//     //nếu phần bên trong không phải là một object
//     if(!isPetObject(data)){
//         return false;
//     };
    
//     // Nếu các Object trong mảng Data chứa dữ liệu không hợp lệ với định dạng yêu cầu
//     if(!isValidate(data)){
//         return false;
//     };
// }

// // hàm kiểm tra các phần tử có 
// function isPetObject(data){
//     //nếu toàn bọ phần tử trong mảng là Object ==> trả về false
//     if(!data.every((item) => item instanceof Object)){
//         alert("File không hơp lệ: Có phần tử trong mảng không phải là object!!");
//         return false;
//     }
    
//     // nếu tất cả các Object trong mảng data đều có nhưng thuộc tính như bên dưới ==> return True
//     const isOK = data.every((item) => {
//         return (    
//             Object.keys(item).length === 12 &&
//             item.hasOwnProperty("id") &&
//             item.hasOwnProperty("name") &&
//             item.hasOwnProperty("age") &&
//             item.hasOwnProperty("type") &&
//             item.hasOwnProperty("weight") &&
//             item.hasOwnProperty("length") &&
//             item.hasOwnProperty("color") &&
//             item.hasOwnProperty("breed") &&
//             item.hasOwnProperty("vaccinated") &&
//             item.hasOwnProperty("dewormed") &&
//             item.hasOwnProperty("sterilized") &&
//             item.hasOwnProperty("date") &&
//         )
//     });

//     if(!isOK){
//         alert("File không hợp lệ: Có thuộc tính không hợp lệ!");
//         return false;
//     }

//     return true;
// }

// // hàm kiểm tra tính hợp lệ của dữ liệu
// function isValidate(data){
//     //kiểm tra nếu tất cả dữ liệu trong mảng là Object hợp lệ
//     //dữ liêu ràng buộc giống Asm 1
    
//     //nếu hơp lệ  ==> return về true
//     return data.every(function (oet){

//     })
// }


