console.log("Hello");

let letter = "c";
function constchecker(letter){
    if(letter === "c"){
        console.log("correct");
    }
    
    if(letter === "a"){
        console.log("correct");
    }
    
    if(letter === "t"){
        console.log("correct");
    }
    console.log("Not correct. Try again!");
}
constchecker(letter);