let myButton = document.querySelector('button');
let idCustom = 0;

function setUserName() {
    let myName = prompt('Note to ADD :');
    console.log(myName)
    if (!myName) {
        setUserName();
    } else {
        localStorage.setItem('name', myName);
        addElement()
    }
}

myButton.onclick = function () {
    setUserName();
}

document.body.onload = GetLoc;

function addElement() {
    let storedName = localStorage.getItem('name');
    let main = document.getElementById('main');
    let newDiv = document.createElement('div')

    newDiv.id = idCustom.toString();
    SaveLoc(storedName)
    idCustom++;

    main.appendChild(newDiv);

    let newContent = document.createTextNode(storedName);
    newDiv.appendChild(newContent);

    let Button = document.createElement('button');
    let br = document.createElement("br");

    Button.innerHTML = "Delete me";

    newDiv.appendChild(br);
    newDiv.appendChild(Button);

    Button.onclick = () => {
        let elem = document.getElementById(this.parentElement.id);
        elem.remove();
        RemoveLoc(storedName)
    }
}

function SaveLoc(storedName) {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(storedName)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function GetLoc() {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function (storedName) {
        let main = document.getElementById('main');
        let newDiv = document.createElement('div')

        newDiv.id = idCustom.toString();

        idCustom++;
        main.appendChild(newDiv);

        let newContent = document.createTextNode(storedName);
        newDiv.appendChild(newContent);

        let Button = document.createElement('button');
        Button.innerHTML = "Delete me";

        let br = document.createElement("br");
        newDiv.appendChild(br);
        newDiv.appendChild(Button);

        Button.onclick = function () {
            let elem = document.getElementById(this.parentElement.id);
            elem.remove();
            RemoveLoc(storedName)
        }
    })
}

function RemoveLoc(storedName) {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.splice(todos.indexOf(storedName), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
