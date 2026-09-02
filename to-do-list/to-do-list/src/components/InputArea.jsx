import { useState } from "react";
function InputArea({ addTask }) {
    const [newTask, setNewTask ] = useState(""); // InputArea owns the text box

    function handleAddTask() {
        addTask(newTask); // Adds input from the user
        setNewTask(""); // Clears the text box
    } 

    function handleSubmit(e) {
        e.preventDefault(); // Lets the react code handle the form submission instead of the browser

        if (newTask.trim() === ""){
            return;
        } // Prevents adding new tasks using enter key if the field is empty
        
        handleAddTask();
    }

    return (
        <form className="input-area" onSubmit={handleSubmit}>
            <input  
                type="text" 
                placeholder="Enter task here" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value) } /> {/*value ={newTask} is a controlled input */}
            <button type="submit" disabled={newTask.trim() === ""}>
                Add
            </button> {/* When the button is clicked it runs the handleAddTask function */}
        </form>
    );
}

export default InputArea;