import { useState, useEffect } from "react";
import InputArea from "./components/InputArea"
import TaskList from "./components/TaskList"
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks !== null) {
      return JSON.parse(savedTasks);
    }

    return [];
  }); // App owns the task list and checks if there is existing save data in local storage

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // Saves the tasks in Local Storage

  const newId = tasks.length > 0
    ? Math.max(...tasks.map(task => task.id)) + 1
    : 1; // Calculates the next available id from existing tasks

  function addTask(text) { 
    const task = {
      id: newId,
      text: text,
      completed: false
    }; // Creates a task

    setTasks(currentTasks => [
      ...currentTasks,
      task
    ]); // Adds the new task to the task list

  } // Generates the task text 

  function deleteTask(id) {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id)); // Deletes a task 

   }

  function toggleTask(id) {
    setTasks(currentTasks => currentTasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        };
      }
      return task; 
      })
    );
   } //Updates the checkbox

   function editTask(id, newText) {
    setTasks(currentTasks => currentTasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          text: newText
        };
      }
      return task;
    }));
   } // Enables the editing of already existing tasks

   function clearCompleted() {
    setTasks(currentTasks => currentTasks.filter(task => !task.completed));
   } // Clears completed tasks

  return(
    <main className="app">
      <h1>My Tasks</h1>

      <InputArea addTask={addTask} /> {/* Renders the inputArea here and receives the addTask function */}

      <TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} editTask={editTask} clearCompleted={clearCompleted} /> {/* Renders the TaskList here and receives the task arrays to display the list */}

    </main>
  );
}

export default App

