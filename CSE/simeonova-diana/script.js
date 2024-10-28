//h1 - "Welcome to my page" with font size of 25 px and colour green
//2 Add one input that asks a user to enter a number
//3 One button which I can press that will output a paragraph saying if the number is odd or not
// The paragraph should be above the button
let body = document.body;
const heading = document.createElement("h1");

heading.textContent = "Welcome to my page";

body.appendChild(heading);

heading.style.fontSize = "25px";
heading.style.color = "green";

const input = document.createElement("input");
input.setAttribute("type", "input");
body.appendChild(input);

let button = document.createElement("button");
button.textContent = "Even or odd?";
button.setAttribute("id", "button");
button.addEventListener("click", onClick);
body.appendChild(button);

let p = document.createElement("p");
p.textContent = "";

function onClick() {
    let number = Number(input.value);
    let copy = document.getElementById("button");
    //copy.parentNode.insertBefore(p, copy);
    let parent = copy.parentNode;
    parent.removeChild(copy);
    parent.appendChild(p);
    parent.appendChild(copy);
    
    if (number % 2 == 0) {
        p.textContent = "Your number is even";
    } else {
        p.textContent = "Your number is odd";
    }
}