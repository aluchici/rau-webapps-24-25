//To-Do:
// 1. A heading reading "Welcome to my page" with font size of 25px and font colour green.
// 2. Add one input that asks the user to enter a number.
// 3. Add one button which I can press and it will output a pragraph saying if the number is odd or not.
//The paragraph should be above the button
console.log("This is an external JS file");

//1.
//1.1 Create the heading (h1)
let h1 = document.createElement("h1");

//1.2 Edit the elemnt data
h1.innerText = "Welcome to my page";
h1.style.fontSize="25px";
h1.style.color="green";

//1.3 Add h1 as a child of the body element
let body = document.getElementsByTagName("body")[0];
body.appendChild(h1);

// 2. Create an input element to ask the user for a number
let input = document.createElement("input");
input.placeholder = "Insert a number";
body.appendChild(input);

// 2.1 Create a button to submit the input
let button = document.createElement("button");
button.innerText="Check Number";
body.appendChild(button);

//2.2 Creat a display element to see the result above the button
let resultDisplay = document.createElement("p");
body.appendChild(resultDisplay);

// 2.3 Add an event listener for the button
button.addEventListener("click", ()=> {
let number = parseInt(input.value);
    if( isNaN(number)){
    resultDisplay.innerText = "Please eneter a valid number.";
    }else{
        if (number % 2 == 0){
            resultDisplay.innerText =`${number} is not an odd number.`;
        } else {
            resultDisplay.innerText =`${number} is an odd number.`;
        }
    }
});








