let input = document.querySelector(".input");
let add = document.querySelector(".add");

let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}
getDataLocSto(); 

add.onclick = function () {
    if (input.value !== "") {
        
        addTaskToArray(input.value);
        
        input.value = "";
        
        }
}
tasksDiv.addEventListener("click", (e) => {
    if (e.target.className === "del") {
        e.target.parentElement.remove()
}
})
function addTaskToArray(inputTask) {
    const task = {
    id: Date.now(),
    text: input.value,
    complete: false
    };
    
    arrayOfTasks.push(task);
    addElementToPage(arrayOfTasks);
    
    locStoData(arrayOfTasks);
}
function addElementToPage(arrayOfTasks) {
    tasksDiv.innerHTML = "";
    
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        if (task.complete === true) {
        div.className = "task done";
        }
        div.setAttribute("data-id", task.id)
        div.appendChild(document.createTextNode(task.text))
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("X"));
        div.appendChild(span);
        tasksDiv.appendChild(div);
    })
}

function locStoData(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}
function getDataLocSto() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data)
        addElementToPage(tasks);
    }
}