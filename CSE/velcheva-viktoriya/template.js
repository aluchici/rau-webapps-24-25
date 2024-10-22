//To do:
// 1. Add a heading reading 'Welcome to my page' with font-size of 25px and font-colour: green;
// 2. Add one input that asks the user to enter a number
// 3. Add one button which I can press and it will output a paragraph saying if the number is odd or not
// The paragraph should be above the button

console.log("This is an external JS file");

//1.1 Create the heading
let h1=document.createElement("h1");

//1.2 Edit the element data
h1.innerText="Welcome to my page";
h1.style.fontSize="25px";
h1.style.color="green";

//1.3 Add h1 as a child of the body element
let body=document.getElementsByTagName("body")[0];
console.log(body);


body.appendChild(h1);

//2.
let input=document.createElement("input");
input.placeholder = ("Insert a number");
body.appendChild(input);
