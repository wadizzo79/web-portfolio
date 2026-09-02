import { useState } from 'react';
import Task from "./Task.jsx";

function TaskList({ tasks, deleteTask, toggleTask, editTask, clearCompleted }){
  const completedCount = tasks.filter(task => task.completed).length; // Counts the number of completed tasks
  const [filter, setFilter] = useState("all"); // Tracks the state of the filter(all, active, completed)
  const [sortOrder, setSortOrder] = useState("oldest"); // Tracks the state of the sort(oldest - newest/newest - oldest)

  let displayedTasks = [...tasks]; // Creates a copy of tasks to filter and sort

  if (filter === "active") {
    displayedTasks = displayedTasks.filter(task => !task.completed);
  } else if (filter === "completed") {
    displayedTasks = displayedTasks.filter(task => task.completed);
  } // Filters the tasks according to their status

  if (sortOrder === "newest") {
    displayedTasks.sort((a, b) => b.id - a.id);
  } else {
    displayedTasks.sort((a, b) => a.id - b.id);
  } // Sorts tasks according to their age

  let emptyMessage = "";

  if (tasks.length === 0) {
    emptyMessage = "No tasks yet";
  } else if (displayedTasks.length === 0) {
    emptyMessage = "No tasks match this filter";
  } // Decides the message to display when there are no tasks matching the selected filter(all, active, completed)

  
    return (
      <> 
        <div className="task-controls">
          <div className= "sort-controls">
            Sort:
            <button className={sortOrder === "newest" ? "active" : ""} onClick={() => setSortOrder("newest")}>Newest</button> {/* Sorts from newest to oldest */}
            <button className={sortOrder === "oldest" ? "active" : ""} onClick={() => setSortOrder("oldest")}>Oldest</button> {/* Sorts from oldest to newest */}
          </div>
          <div className="filter-controls">
            <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button> {/* Displays all tasks */}
            <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>Active</button> {/* Displays active tasks */}
            <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>Completed</button> {/* Displays completed tasks */}
          </div>
        {tasks.some(task => task.completed) && (<button onClick={clearCompleted}>Clear Completed</button>)} {/* If a task is completed show the button which clears completed tasks */}
        </div>
        {tasks.length > 0 && (<p className="task-count">{completedCount} of {tasks.length} completed</p>)} {/* If there are tasks render the completed tasks counter */}
        {emptyMessage && <p className="empty-message">{emptyMessage}</p>} {/* If emptyMessage contains something render the <p> otherwise render nothing */}
        <ul className="task-list">
            {displayedTasks.map(task => (
              <Task key={task.id} task={task} deleteTask={deleteTask} toggleTask={toggleTask} editTask={editTask} />
            ))}
          </ul> {/* A list of the tasks in the task array */} 
      </>
    );
}

export default TaskList;