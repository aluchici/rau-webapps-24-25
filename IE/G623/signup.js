const head = document.getElementsByTagName("head");
const meta = document.createElement("meta");
meta.name = "viewport";
head[0].appendChild(meta);

const p = document.createElement("p");
p.innerText = "paragraf";
p.style.color = "red";
p.style.fontSize = "30px";
const body = document.getElementsByTagName("body")[0];
body.appendChild(p);
