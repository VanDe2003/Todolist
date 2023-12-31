var listTask = JSON.parse(localStorage.getItem("listTask")) || [];
var table = document.getElementById("taskTable").getElementsByTagName("tbody")[0];
var errorMessage = document.getElementById("error-message");

var currentDate = new Date();
var year = currentDate.getFullYear();
var month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
var day = currentDate.getDate().toString().padStart(2, "0");
var ascendingSort = true;
var formattedDate = `${year}-${month}-${day}`;

function updateLocalStorage() {
    localStorage.setItem("listTask", JSON.stringify(listTask));
}

var keyPressed = false;

document.getElementById("task-input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        if (keyPressed) {
            return;
        }
        addTask();
        keyPressed = true;
    } else {
        keyPressed = false;
    }
});

function addTask() {
    var taskInput = document.getElementById("task-input");
    var time = document.getElementById("date").value;
    var taskTable = document.getElementById("taskTable").getElementsByTagName("tbody")[0];

    var task = taskInput.value;
    if (task) {
        var newRow = taskTable.insertRow(0);
        var rowIndex = newRow.rowIndex;
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);

        var newTask = {task: task, date: time, completed: false, rowIndex: rowIndex};
        listTask.unshift(newTask);

        for (var i = 0; i < listTask.length; i++) {
            listTask[i].rowIndex = i;
        }

        updateLocalStorage();

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        var edit = document.createElement("button");
        var del = document.createElement("button");

        var editIcon = document.createElement("img");
        editIcon.src = "./images/edit.png";
        editIcon.alt = "Edit";
        edit.appendChild(editIcon);

        var delIcon = document.createElement("img");
        delIcon.src = "./images/delete.png";
        delIcon.alt = "Delete";
        del.appendChild(delIcon);

        cell1.appendChild(checkbox);
        cell2.innerHTML = task;
        cell3.innerHTML = time;
        cell4.appendChild(edit);
        cell5.appendChild(del);

        taskInput.value = "";
        document.getElementById("date").value = "";

        checkbox.addEventListener("click", function () {
            newTask.completed = checkbox.checked;
            updateLocalStorage();
        });

        edit.addEventListener("click", function () {
            var currentTask = cell2.innerHTML;
            var currentDate = cell3.innerHTML;

            var taskInput = document.createElement("textarea");
            var dateInput = document.createElement("input");

            taskInput.type = "text";
            taskInput.value = currentTask;

            dateInput.type = "date";
            dateInput.value = currentDate;

            taskInput.classList.add("custom-input-edit");
            // dateInput.classList.add("custom-input-date");
            taskInput.setAttribute("rows", "5");

            cell4.removeChild(edit);
            cell5.removeChild(del);

            var saveButton = document.createElement("button");
            var cancelButton = document.createElement("button");

            var saveIcon = document.createElement("img");
            var cancelIcon = document.createElement("img");

            saveIcon.src = "./images/save.png";
            cancelIcon.src = "./images/cancel.png";

            saveButton.appendChild(saveIcon);
            cancelButton.appendChild(cancelIcon);

            cell4.appendChild(saveButton);
            cell5.appendChild(cancelButton);

            cell2.innerHTML = "";
            cell3.innerHTML = "";

            cell2.appendChild(taskInput);
            cell3.appendChild(dateInput);
            taskInput.focus();

            saveButton.addEventListener("click", function () {
                var updatedTask = taskInput.value;
                var updatedDate = dateInput.value;

                if (updatedTask.trim() === "") {
                    alertMessage();
                } else {
                    cell2.innerHTML = updatedTask;
                    cell3.innerHTML = updatedDate;
                    cell4.appendChild(edit);
                    cell5.appendChild(del);
                    cell4.removeChild(saveButton);
                    cell5.removeChild(cancelButton);

                    errorMessage.style.display = "none";

                    var rowIndex = cell2.parentNode.rowIndex;

                    listTask[rowIndex].task = updatedTask;
                    listTask[rowIndex].date = updatedDate;

                    updateLocalStorage();
                }
            });

            cancelButton.addEventListener("click", function () {
                cell2.innerHTML = currentTask;
                cell3.innerHTML = currentDate;
                cell4.appendChild(edit);
                cell5.appendChild(del);
                cell4.removeChild(saveButton);
                cell5.removeChild(cancelButton);
                errorMessage.style.display = "none";
            });
        });

        del.addEventListener("click", function () {
            var modal = document.getElementById("confirmationModal");
            modal.style.display = "block";

            var confirmDelete = document.getElementById("confirmDelete");
            confirmDelete.addEventListener("click", function () {
                modal.style.display = "none";

                var rowIndex = del.parentNode.parentNode.rowIndex;

                listTask.splice(rowIndex, 1);

                for (var i = rowIndex; i < listTask.length; i++) {
                    listTask[i].rowIndex = i;
                }

                taskTable.deleteRow(rowIndex);

                updateLocalStorage();
            });

            var cancelDelete = document.getElementById("cancelDelete");
            cancelDelete.addEventListener("click", function () {
                modal.style.display = "none";
            });
        });

        document.getElementById("none-task").style.display = "none";
    } else {
        alertMessage();
    }
}

document.getElementById("date").min = formattedDate;

document.addEventListener("DOMContentLoaded", function () {
    var taskTable = document.getElementById("taskTable").getElementsByTagName("tbody")[0];

    if (listTask && listTask.length > 0) {
        document.getElementById("none-task").style.display = "none";

        listTask.forEach(function (taskData) {
            var newRow = taskTable.insertRow(taskTable.rows.length);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = taskData.completed;

            var edit = document.createElement("button");
            var del = document.createElement("button");

            var editIcon = document.createElement("img");
            editIcon.src = "./images/edit.png";
            editIcon.alt = "Edit";
            edit.appendChild(editIcon);

            var delIcon = document.createElement("img");
            delIcon.src = "./images/delete.png";
            delIcon.alt = "Delete";
            del.appendChild(delIcon);

            cell1.appendChild(checkbox);
            cell2.innerHTML = taskData.task;
            cell3.innerHTML = taskData.date;
            cell4.appendChild(edit);
            cell5.appendChild(del);

            checkbox.addEventListener("click", function () {
                taskData.completed = checkbox.checked;
                updateLocalStorage();
            });

            edit.addEventListener("click", function () {
                var currentTask = cell2.innerHTML;
                var currentDate = cell3.innerHTML;

                var taskInput = document.createElement("textarea");
                taskInput.type = "text";
                taskInput.value = currentTask;

                var dateInput = document.createElement("input");
                dateInput.type = "date";
                dateInput.value = currentDate;

                taskInput.classList.add("custom-input-edit");
                dateInput.classList.add("custom-input-date");

                taskInput.setAttribute("rows", "5");

                cell4.removeChild(edit);
                cell5.removeChild(del);

                var saveButton = document.createElement("button");
                var cancelButton = document.createElement("button");

                var saveIcon = document.createElement("img");
                var cancelIcon = document.createElement("img");

                saveIcon.src = "./images/save.png";
                cancelIcon.src = "./images/cancel.png";

                saveButton.appendChild(saveIcon);
                cancelButton.appendChild(cancelIcon);

                cell4.appendChild(saveButton);
                cell5.appendChild(cancelButton);

                cell2.innerHTML = "";
                cell3.innerHTML = "";

                cell2.appendChild(taskInput);
                cell3.appendChild(dateInput);
                taskInput.focus();

                saveButton.addEventListener("click", function () {
                    var updatedTask = taskInput.value;
                    var updatedDate = dateInput.value;

                    if (updatedTask.trim() === "") {
                        alertMessage();
                    } else {
                        cell2.innerHTML = updatedTask;
                        cell3.innerHTML = updatedDate;
                        cell4.appendChild(edit);
                        cell5.appendChild(del);
                        cell4.removeChild(saveButton);
                        cell5.removeChild(cancelButton);

                        errorMessage.style.display = "none";

                        var rowIndex = cell2.parentNode.rowIndex;

                        listTask[rowIndex].task = updatedTask;
                        listTask[rowIndex].date = updatedDate;

                        updateLocalStorage();
                    }
                });

                cancelButton.addEventListener("click", function () {
                    cell2.innerHTML = currentTask;
                    cell3.innerHTML = currentDate;
                    cell4.appendChild(edit);
                    cell5.appendChild(del);
                    cell4.removeChild(saveButton);
                    cell5.removeChild(cancelButton);
                    errorMessage.style.display = "none";
                });
            });

            del.addEventListener("click", function () {
                var modal = document.getElementById("confirmationModal");
                modal.style.display = "block";

                var confirmDelete = document.getElementById("confirmDelete");
                confirmDelete.addEventListener("click", function () {
                    modal.style.display = "none";

                    var rowIndex = del.parentNode.parentNode.rowIndex;

                    listTask.splice(rowIndex, 1);

                    for (var i = rowIndex; i < listTask.length; i++) {
                        listTask[i].rowIndex = i;
                    }

                    taskTable.deleteRow(rowIndex);

                    updateLocalStorage();
                });

                var cancelDelete = document.getElementById("cancelDelete");
                cancelDelete.addEventListener("click", function () {
                    modal.style.display = "none";
                });
            });
        });
    }
});

var dataTask = [...listTask];

// // Arrange Task
dataTask.sort(function (a, b) {
    var nameA = a.task.toUpperCase();
    var nameB = b.task.toUpperCase();

    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
});

// Sort
document.getElementById("taskFilter").addEventListener("change", function () {
    var changeValue = document.getElementById("taskFilter").value;

    if (changeValue == "incomplete") {
        filterIncompleteTasks();
    } else if (changeValue == "completed") {
        filtercompleteTasks();
    } else {
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        for (var i = 0; i < listTask.length; i++) {
            addRowToTable(table, listTask[i]);
        }
    }
});

// Add Row To Table

function addRowToTable(table, value, rowIndex) {
    var newRow = table.insertRow(table.rows.length);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = value.completed;

    var edit = document.createElement("button");
    var del = document.createElement("button");

    var editIcon = document.createElement("img");
    editIcon.src = "./images/edit.png";
    editIcon.alt = "Edit";
    edit.appendChild(editIcon);

    var delIcon = document.createElement("img");
    delIcon.src = "./images/delete.png";
    delIcon.alt = "Delete";
    del.appendChild(delIcon);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    cell1.appendChild(checkbox);
    cell2.innerHTML = value.task;
    cell3.innerHTML = value.date;
    cell4.appendChild(edit);
    cell5.appendChild(del);

    checkbox.addEventListener("click", function () {
        value.completed = checkbox.checked;
        updateCompletedStatus(rowIndex, value.completed);
    });

    edit.addEventListener("click", function () {
        var currentTask = cell2.innerHTML;
        var currentDate = cell3.innerHTML;

        var taskInput = document.createElement("textarea");
        taskInput.type = "text";
        taskInput.setAttribute("rows", "5");
        taskInput.value = currentTask;

        var dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.value = currentDate;

        taskInput.classList.add("custom-input-edit");
        dateInput.classList.add("custom-input-date");

        cell4.removeChild(edit);
        cell5.removeChild(del);

        var saveButton = document.createElement("button");
        var cancelButton = document.createElement("button");

        var saveIcon = document.createElement("img");
        var cancelIcon = document.createElement("img");

        saveIcon.src = "./images/save.png";
        cancelIcon.src = "./images/cancel.png";

        saveButton.appendChild(saveIcon);
        cancelButton.appendChild(cancelIcon);

        cell4.appendChild(saveButton);
        cell5.appendChild(cancelButton);

        cell2.innerHTML = "";
        cell3.innerHTML = "";

        cell2.appendChild(taskInput);
        cell3.appendChild(dateInput);
        taskInput.focus();

        saveButton.addEventListener("click", function () {
            var updatedTask = taskInput.value;
            var updatedDate = dateInput.value;

            if (updatedTask.trim() === "") {
                alertMessage();
            } else {
                cell2.innerHTML = updatedTask;
                cell3.innerHTML = updatedDate;
                cell4.appendChild(edit);
                cell5.appendChild(del);
                cell4.removeChild(saveButton);
                cell5.removeChild(cancelButton);

                errorMessage.style.display = "none";

                value.task = updatedTask;
                value.date = updatedDate;

                updateLocalStorage();
            }
        });

        cancelButton.addEventListener("click", function () {
            cell2.innerHTML = currentTask;
            cell3.innerHTML = currentDate;
            cell4.appendChild(edit);
            cell5.appendChild(del);
            cell4.removeChild(saveButton);
            cell5.removeChild(cancelButton);
            errorMessage.style.display = "none";
        });
    });

    del.addEventListener("click", function () {
        var modal = document.getElementById("confirmationModal");
        modal.style.display = "block";

        var confirmDelete = document.getElementById("confirmDelete");
        confirmDelete.addEventListener("click", function () {
            modal.style.display = "none";

            table.deleteRow(rowIndex);

            listTask.splice(rowIndex, 1);

            for (var i = rowIndex; i < listTask.length; i++) {
                listTask[i].rowIndex = i;
            }

            updateLocalStorage();
        });

        var cancelDelete = document.getElementById("cancelDelete");
        cancelDelete.addEventListener("click", function () {
            modal.style.display = "none";
        });
    });
}

function updateCompletedStatus(rowIndex, newCompletedStatus) {
    for (var i = 0; i < listTask.length; i++) {
        if (listTask[i].rowIndex === rowIndex) {
            listTask[i].completed = newCompletedStatus;
            updateLocalStorage(listTask);
            break;
        }
    }
}

// Filter Incomplete Tasks
function filterIncompleteTasks() {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    for (var i = 0; i < listTask.length; i++) {
        if (!listTask[i].completed) {
            addRowToTable(table, listTask[i]);
        }
    }
}

// Filter Complete Tasks
function filtercompleteTasks() {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    for (var i = 0; i < listTask.length; i++) {
        if (listTask[i].completed) {
            addRowToTable(table, listTask[i]);
        }
    }
}

// Alert Message Error
function alertMessage() {
    errorMessage.style.display = "block";
    setTimeout(function () {
        errorMessage.style.display = "none";
    }, 3000);
}
