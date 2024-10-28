// To do:
// 1. Add a heading reading "Welcome to my page" with font size of 25px and font colour green.
// 2. Add one input that asks the user to enter a number.
// 3. Add one button which I can press and it will output a paragraph saying if the number is odd or not.
// The paragraph should be above the button. 
console.log("This is an external JS file");

// 1. 
// 1.1. Create the heading (h1)
let h1 = document.createElement("h1");

// 1.2. Edit the element data 
h1.innerText = "Welcome to my page";
h1.style.fontSize = "25px";
h1.style.color = "green";

// 1.3. Add h1 as a child of the body element
let body = document.getElementsByTagName("body")[0];
body.appendChild(h1);

// 2. 
let input = document.createElement("input");
input.placeholder = "Insert a number";
body.appendChild(input);

// 3. Add the paragraph to display results above the button
let resultPara = document.createElement("p");
resultPara.innerText = ""; // Start with an empty paragraph
body.appendChild(resultPara);

// 4. Create the button
let button = document.createElement("button");
button.innerText = "Check if Odd or Even";
body.appendChild(button);

// 5. Add event listener to the button
button.addEventListener("click", function () {

  let number = input.value; // Get the value from input

  if (number == "") {
    resultPara.innerText = "Please enter a number."; // Handle empty input case
    return;
  }

  try {
    number = parseInt(number); // Convert the input to an integer

    if (isNaN(number) || !Number.isInteger(number)) {
      resultPara.innerText = "That is not a valid number."; // Handle non-number or non-int input
      return;
    }

    if (number % 2 == 0) {
      resultPara.innerText = "The number is even.";
    } else {
      resultPara.innerText = "The number is odd.";
    }
  } catch {
    console.log('error');
  }
};