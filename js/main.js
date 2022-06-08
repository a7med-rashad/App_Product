let input = document.querySelector(".input");
let add = document.querySelector(".add");

let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}
getDataLocSto(); 


input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        if (input.value !== "") {
        
            addTaskToArray(input.value);
            
            input.value = "";
            
            }
    }
})
add.onclick = function () {
    if (input.value !== "") {
        
        addTaskToArray(input.value);
        
        input.value = "";
        
        }
}
tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        deleteTaskLocSto(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove()
    }
    if (e.target.classList.contains("checkbox")) {
 
        toggleStatuesTask(e.target.parentElement.getAttribute("data-id"))

        e.target.parentElement.classList.toggle("done");

    }
    if (e.target.classList.contains("task")) {
        toggleStatuesTask(e.target.getAttribute("data-id"))
        if (e.target.classList.contains("done")) {
            e.target.classList.remove("done");
            e.target.children[0].checked = false
        }else {
            e.target.classList.add("done");
            e.target.children[0].checked = true
        }
    }
    if (e.target.classList.contains("task-text")) {
        toggleStatuesTask(e.target.parentElement.getAttribute("data-id"))
        if (e.target.parentElement.classList.contains("done")) {
            e.target.parentElement.classList.remove("done");
            e.target.parentElement.children[0].checked = false
        }else {
            e.target.parentElement.classList.add("done");
            e.target.parentElement.children[0].checked = true
        }

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
        div.setAttribute("data-id", task.id)
        let checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.className = "checkbox"
        div.appendChild(checkBox)
        if (task.complete === true) {
        div.className = "task done";
        checkBox.checked = true
        }
        let taskText = document.createElement("p")
        taskText.className = "task-text"
        taskText.appendChild(document.createTextNode(task.text))
        div.appendChild(taskText);
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


function deleteTaskLocSto(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    locStoData(arrayOfTasks);
}


function toggleStatuesTask(taskId) {
    for (let i =0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].complete == false ? arrayOfTasks[i].complete = true : arrayOfTasks[i].complete = false
        }
    }
    locStoData(arrayOfTasks);
}