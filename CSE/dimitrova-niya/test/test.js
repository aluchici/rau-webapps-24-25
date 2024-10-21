let heading = document.createElement('h1');
heading.textContent = 'Welcome to my page';
heading.style.fontSize='25px';
heading.style.color='green';

let body = document.getElementsByTagName('body')[0];
document.body.appendChild(heading);

let input = document.createElement('input');
input.type = 'numeric';
document.body.appendChild(input);

let btn = document.createElement('button');
btn.textContent = 'Click me';
btn.addEventListener('click', oddOrEven)

document.body.appendChild(btn);
let p = document.createElement('p');

function oddOrEven(){
    
    if(p.textContent !== ''){
        clear();

    }

    let content = Number(input.value);
    let text = 'Number is odd';
    

    if(content % 2 == 0){
        text = 'Number is even';
    }

    p.textContent = text;
    document.body.insertBefore(p, btn);

    console.log(text);
}

function clear(){
    document.body.removeChild(p);
}