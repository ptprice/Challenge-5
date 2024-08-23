// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const data = $("#taskData").on("click", handleAddTask);
// Todo: create a function to generate a unique task id
function generateTaskId() {
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $("<div>").addClass("card draggable").attr("id", task.id);
    const cardBody = $("<div>").addClass("card-body");
    const cardTitle = $("<h5>").addClass("card-title").text(task.name);
    const cardText = $("<p>").addClass("card-text").text(task.description);
    const cardDueDate = $("<p>").addClass("card-text").text(task.dueDate);
    const deleteButton = $("<button>").addClass("btn btn-danger delete").text("Delete").on("click", handleDeleteTask);
    cardBody.append(cardTitle, cardText, cardDueDate, deleteButton);
    taskCard.append(cardBody);
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $("#todo-cards").empty();
    $("#in-progress-cards").empty();
    $("#done-cards").empty();
    taskList.forEach(task => {
        console.log(task);
    const card = createTaskCard(task);
    $("#" + task.status+"-cards").append(card);
    });
    $(".draggable").draggable({
    zIndex: 100,
    helper: function (event) {
    const target = $(event.target) .hasClass("ui-draggable") ? $(event.target) : $(event.target).closest(".ui-draggable");
    return target.clone();
    }
    });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
const taskName = $("#task-name").val();
const taskDescription = $("#task-description").val();
const taskDueDate = $("#task-due-date").val();
const task = {
    id: generateTaskId(),
    name: taskName,
    description: taskDescription,
    dueDate: taskDueDate,
    status: "todo"
};
taskList.push(task);
localStorage.setItem("tasks", JSON.stringify(taskList));
renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const taskId = $(this).closest(".card").attr("id");
    taskList = taskList.filter(task => task.id != taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.attr("id");
    const status = $(this).attr("id");
    console.log (status);
    const task = taskList.find(task => task.id == taskId);
    task.status = status;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    // ui.draggable.detach().appendTo($(this));
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    $(".lane").droppable({
    drop: handleDrop,
    accept: ".draggable"
    });
    $("#task-due-date").datepicker();
}
);



