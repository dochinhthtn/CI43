// đồng bộ - bất đồng bộ
// --> xử lý cho code đồng bộ hơn
// callback hell
// console.log("Hello world");

// setTimeout(function() {
//     console.log("kết nối");

//     setTimeout(function() {
//         console.log("vào trình duyệt");

//         setTimeout(function() {
//             console.log("search google");

//             setTimeout(function() {
//                 console.log("xem kết quả");

//                 setTimeout(function() {
//                     console.log("ra đê ở hay chưa");
//                 }, 1000);
                
//             }, 5000);
//         }, 3000);

//     }, 2000);

// }, 3000);


// xử lý bất đồng bộ --> làm trình tự thực hiện công việc trở nên đồng bộ

// function timeout(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
// async function sleep(ms) {
//     return await timeout(ms);
// }

// (async function(){
//     console.log("Hello world");
//     await sleep(3000);
//     console.log("Kết nối");
//     await sleep(2000);
//     console.log("vào trình duyệt");
//     await sleep(3000);
//     console.log("search google");

//     /* 
//     ...
//     ...
//     ...
//     ...
//     */
// })();

// xử lý lỗi (try/catch)
// chương trình gặp lỗi thì dừng

// try {
//     // đoạn chương trình có thể gây lỗi 
// } catch (error) {
//     // xử lý lỗi
// }

// let input = prompt("Input id of element to change content");
// let element = document.getElementById(input);
// try {
//     element.innerHTML = "Content changed";
// } catch (error) {
//     console.log(error);
// }

// console.log("End program");

// ctrl + /, alt + shift + a

// let input = Number(prompt("Input a number"));



// if(input > 0) {
//     console.log(input * input);
// } else {
//     try {
//         throw new Error("Mày nhập cho cẩn thận vô");
//     } catch (error) {
//         // console.log(error);
//         console.error(error);
//     }
// }

// console.log("tính toán xong, tiếp tục chương trình");

// console.log("end program");