let toDo = [];

function displayText(){
    var inputValue = document.getElementById("task").value; // Gets the value from the input field and stores it in inputValue
    
    toDo.push(inputValue); // The value in inputValue is then stored in the array

    document.getElementById("outputText").innerHTML = toDo.join("<br>"); // Displays the elements in the array onto the browser. .join("<br>") breaks the array into a new line

    document.getElementById("task").value=""; // Clears the input field
}

function deleteTask(){
    toDo.pop(); // Deletes the last field from the array

    document.getElementById("outputText").innerHTML = toDo.join("<br>");

}