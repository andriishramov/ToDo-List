let taskNameInput = document.querySelector("#task-name-input");
let addTaskButton = document.querySelector("#add-task-btn");
let startMessage = document.querySelector("#start-message");
let showAllButton = document.querySelector("#show-all-btn");
let showNotCompletedButton = document.querySelector("#show-not-completed-btn");
let taskList = document.querySelector(".task-list");

let tasks = [];

addTaskButton.addEventListener("click", addTaskHandler);
showAllButton.addEventListener("click", showAllHandler);
showNotCompletedButton.addEventListener("click", showNotCompletedHandler);

taskNameInput.addEventListener("keydown", function (e) {
    if (e.code == "Enter") addTaskHandler();
})

function addTaskHandler() {
    if (taskNameInput.value) {
        if (!startMessage.hidden) startMessage.hidden = true;

        let newTask = new Task(taskNameInput.value);
        newTask.createIn(taskList);
        tasks.push(newTask);

        taskNameInput.value = "";
    } else {
        alert("Enter New Task");
    }
}

function showAllHandler() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        task.createIn(taskList);
    });
}

function showNotCompletedHandler() {
    taskList.innerHTML = "";
    tasks
        .filter(task => task.isDone == false)
        .forEach(task => {
            task.createIn(taskList);
        });
}

class Task {
    constructor(text) {
        this.text = text;
        this.isDone = false;
        this.div = null;
        this.isDeleted = false;
    }


    createIn(element) {
        this.div = document.createElement("div");
        this.div.classList.add("task");

        let input = document.createElement("input");
        input.addEventListener("click", this.changeState.bind(this));
        input.type = "checkbox";

        let p = document.createElement("p");
        p.innerText = this.text;

        let btnDelete = document.createElement("span");
        btnDelete.dataset.id = "buttonDel";
        btnDelete.addEventListener('click', () => this.deleteTask());
        btnDelete.innerHTML = "";

        let editButton = document.createElement('span');
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => this.editTask(p));

        this.div.append(input);
        this.div.append(p);
        this.div.append(editButton);
        this.div.append(btnDelete)

        if (this.isDone) {
            this.div.classList.add("completed");
            input.checked = true;
        }

        if (!this.isDeleted) {
            element.append(this.div);
        }
    }

    deleteTask (element){
        this.div.remove()
        this.isDeleted = true;
    }
    editTask(element) {
        element.innerText = '';
        let newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        element.append(newInput);
        newInput.addEventListener('keydown', function (e) {
            let newValue = newInput.value;
            if (e.code == "Enter") {
                element.innerText = newValue;
            }
        })
    }
    changeState(element) {
        this.isDone = !this.isDone;
        this.div.classList.toggle("completed");
    }
}