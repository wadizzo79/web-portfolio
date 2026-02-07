let toDo = []; // initializes the array


function addTask(){
    var inputValue = document.getElementById("task").value; // Gets the value from the input field and stores it in inputValue
   
    toDo.push({
        task: inputValue, 
        description: document.getElementById("task-description").value,
        priority: document.getElementById("task-priority").value, // An object storing the values from the input fields
}   ); // The value in inputValue is then stored in the array

    renderTasks(); // Loops thrrough the array one array at a time and returns a new array 

    

    document.getElementById("task").value=""; 
    document.getElementById("task-description").value=""; 
    document.getElementById("task-priority").value=""; // Clears the input field
}

function deleteTask(){
    toDo.pop(); // Deletes the last field from the array

    document.getElementById("outputText").innerHTML = toDo
    .map(item => `${item.task}<br>${item.description}<br>${item.priority}`).join("<hr>");

}

function renderTasks(){
    const output = document.getElementById("outputText"); // The container wher everything nrendered will be housed
    output.innerHTML = ""; // clears the container safely (removes only the rendered tasks)

    // Loops over the data, item is the object and index is the position in the array
    toDo.forEach((item, index) => { 
        const taskDiv = document.createElement("div"); // Creates a task container 

        const title = document.createElement("p"); // Creates element which will display the data inside the container
        title.textContent = item.task; // assigns content from data

        const desc = document.createElement("p");
        desc.textContent = item.description;

        const priority = document.createElement("p");
        priority.textContent = item.priority;

        const editBtn = document.createElement("button"); // edit button
        editBtn.textContent = "Edit";

        const deleteBtn = document.createElement("button"); //delete button
        deleteBtn.textContent = "Delete";

        // event listener for the edit button
        editBtn.addEventListener("click", () => {
            // replaces text with inout fields
            const newTitle = document.createElement("input");
            newTitle.value = item.task;

            const newDesc = document.createElement("input");
            newDesc.value = item.description;

            const newPriority = document.createElement("input");
            newPriority.value = item.priority; 

            // replaces the current <p> elements with inputs
            taskDiv.innerHTML = ""; // clears old content
            taskDiv.appendChild(newTitle);
            taskDiv.appendChild(newDesc);
            taskDiv.appendChild(newPriority);

            // adds a save button
            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";

            // event listener for the save button
            saveBtn.addEventListener("click", () => {
                // updates the array
                item.task = newTitle.value;
                item.description = newDesc.value;
                item.priority = newPriority.value;

                renderTasks(); // redraws everything
            });
            taskDiv.appendChild(saveBtn);
        });

        
        // event listener for the delete button
        deleteBtn.addEventListener("click", () => {
            toDo.splice(index, 1);
            renderTasks();
        });
        
        // this is where the structure of the page(UI) is built
        taskDiv.appendChild(title); 
        taskDiv.appendChild(desc);
        taskDiv.appendChild(priority);
        taskDiv.appendChild(editBtn);
        taskDiv.appendChild(deleteBtn);
        
        // Attaches the task onto the page to enable it to appear on screen
        output.appendChild(taskDiv);
    });
}