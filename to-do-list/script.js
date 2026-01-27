let toDo = []; // initializes the array


function addTask(){
    var inputValue = document.getElementById("task").value; // Gets the value from the input field and stores it in inputValue
   
    toDo.push({
        task: inputValue, 
        description: document.getElementById("task-description").value,
        priority: document.getElementById("task-priority").value, // An object storing the values from the input fields
}   ); // The value in inputValue is then stored in the array

    document.getElementById("outputText").innerHTML = toDo
    .map(item => `${item.task}<br>${item.description}<br>${item.priority}`).join("<hr>"); // Loops thrrough the array one array at a time and returns a new array 

    

    document.getElementById("task").value=""; 
    document.getElementById("task-description").value=""; 
    document.getElementById("task-priority").value=""; // Clears the input field
}

function deleteTask(){
    toDo.pop(); // Deletes the last field from the array

    document.getElementById("outputText").innerHTML = toDo
    .map(item => `${item.task}<br>${item.description}<br>${item.priority}`).join("<hr>");

}