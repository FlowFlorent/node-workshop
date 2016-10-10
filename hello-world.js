// console.log("Hello World!");

// setTimeout(function(){
//     console.log("Hello World!");
// }, 10000)



// while (true){
//     setTimeout(function() {
//         console.log("Hello World");
//     }, 10000);
// }

function setInter (){
    console.log("Hello World!");
    setTimeout(function() {
        setInter();
    }, 1000);
}

setInter();