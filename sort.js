// var data = JSON.parse(localStorage.getItem("listTask"));
// var dataTask = [...data];

// dataTask.sort(function (a, b) {
//     var nameA = a.task.toUpperCase();
//     var nameB = b.task.toUpperCase();

//     if (nameA < nameB) {
//         return -1;
//     }
//     if (nameA > nameB) {
//         return 1;
//     }
//     return 0;
// });

// function updateLocalStorage() {
//     localStorage.setItem("listTask", JSON.stringify(data));
// }

// var arrIndex = [];
// var arrTask = [];
// var arrCheckBox = [];

// for (let i = 0; i < dataTask.length; i++) {
//     arrIndex.push(dataTask[i].rowIndex);
//     arrTask.push(dataTask[i].task);
//     arrCheckBox.push(dataTask[i].completed);
// }

// document.getElementById("taskFilter").addEventListener("change", function () {
//     var changeValue = document.getElementById("taskFilter").value;
//     var table = document.getElementById("taskTable").getElementsByTagName("tbody")[0];

//     if (changeValue == "az") {
//         while (table.firstChild) {
//             table.removeChild(table.firstChild);
//         }

//         for (var i = 0; i < dataTask.length; i++) {
//             addRowToTable(table, dataTask[i]);
//         }
//     } else if (changeValue == "incomplete") {
//     } else {
//         while (table.firstChild) {
//             table.removeChild(table.firstChild);
//         }

//         for (var i = 0; i < data.length; i++) {
//             addRowToTable(table, data[i]);
//         }
//     }
// });

// function addRowToTable(table, value) {
//     var newRow = table.insertRow(table.rows.length);
//     var checkbox = document.createElement("input");

//     checkbox.type = "checkbox";
//     checkbox.checked = value.completed;

//     if (typeof value.completed !== "undefined") {
//         checkbox.checked = value.completed;
//     }

//     var cell1 = newRow.insertCell(0);
//     var cell2 = newRow.insertCell(1);
//     var cell3 = newRow.insertCell(2);
//     var cell4 = newRow.insertCell(3);

//     // cell1.innerHTML = value.checkbox.checked;
//     cell1.appendChild(checkbox);
//     cell2.innerHTML = value.task;
//     cell3.innerHTML = value.date;
//     cell4.innerHTML = value.rowIndex;

//     checkbox.addEventListener("click", function () {
//         value.completed = checkbox.checked;
//         updateCompletedStatus(value.rowIndex, value.completed);
//         console.log(data);
//     });
// }

// function updateCompletedStatus(rowIndex, newCompletedStatus) {
//     for (var i = 0; i < data.length; i++) {
//         if (data[i].rowIndex === rowIndex) {
//             data[i].completed = checked;
//             updateLocalStorage(data);
//             break;
//         }
//     }
// }
