let texts = [];
let ids = [];
let tagName = "html";

// setup
for (let el of document.body.children) {
  if (el.nodeName == "SCRIPT" || el.nodeName == "#comment") continue;
  texts.push(el.innerText);
  ids.push(el.id);
  el.addEventListener("click", handleClick);
}
// initial reconstruction (because it won't let me write everything as html initially)
// (but will allow it through js?)
reconstruct();

function handleClick(e) {
  // this will determine what tag every other element is going to become
  tagName = e.target.id;
  document.getElementById(tagName).classList.remove("current");
  reconstruct();
}

function reconstruct() {
  let counter = 0;
  for (let child of document.body.children) {
    if (child.nodeName == "SCRIPT" || child.nodeName == "#comment") continue;

    let newEl = document.createElement(tagName);
    newEl.id = ids[counter];
    newEl.append(document.createTextNode(texts[counter]));
    if (child.id == tagName) {
      newEl.classList.add("current");
      document.title = texts[counter];
    }
    newEl.addEventListener("click", handleClick);
    document.body.insertBefore(newEl, child);
    document.body.removeChild(child);
    counter++;
  }
}