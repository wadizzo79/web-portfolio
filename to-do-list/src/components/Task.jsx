import { useState, useRef, useEffect } from 'react';

function Task({ task, deleteTask, toggleTask, editTask }){
    const [isEditing, setIsEditing] = useState(false); // Tracks whether the task is currently being edited
    const [editText, setEditText] = useState(task.text); // Stores the temporary text while editing the task
    const inputRef = useRef(null); // Stores the reference to the input element so it can be focused

    useEffect(() => {
        if (isEditing){
            inputRef.current?.focus(); // focuses on the input 
        }
    }, [isEditing]); // When editing the input this enables the focus to be on the input bar which enables the keying events(enter, esc) to function

    function saveEdit() {
        if (editText.trim() === "") {
            return;
        } // if editText is empty nothing happens
        editTask(task.id, editText);
        setIsEditing(false);
    } // Saves the edit made to the task

    if (isEditing) {
        return(
        <li>
        <input ref={inputRef} value={editText} onChange={(e) => setEditText(e.target.value)} 
        onKeyDown={(e) => {
            if (e.key === "Enter") { // Save edited data using the Enter key
                saveEdit();
            } else if (e.key === "Escape"){
                setEditText(task.text);
                setIsEditing(false);
            }
        }} /> {/* InputArea where the current task is being edited */}
        <button onClick={() => { saveEdit() }} disabled={editText.trim() === ""}>Save</button> {/* Save button */} {/* Disabled when field is empty */}
        <button onClick={() => { 
                    setEditText(task.text); 
                    setIsEditing(false); 
                }}>
                    Cancel
        </button> {/* Cancel button */}
        </li>
        );
    } // Enables editing the task if the edit button has been clicked
    
    return(
            <li><span className={task.completed ? "completed" : ""}>{task.text}</span> {/* Adds a strikethrough to a task marked as complete */}
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} /> {/* Checkbox */}
            <button onClick={() => {
                        setEditText(task.text); 
                        setIsEditing(true);
                    }}>
                            Edit
            </button> {/* Edit button */}
            <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button> {/* Delete button */}
            </li> //Displays each task

    ); // Keeps the task as is if edit button has not been clicked
}

export default Task;