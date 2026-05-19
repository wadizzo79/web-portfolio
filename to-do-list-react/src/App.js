import React, { useState } from 'react';
//import { useRef } from 'react';

export default function App() {
  const [items,setItems] = useState([]);

  function addTodo(inputValue) {
    setItems([...items, inputValue]);
  }

  return (
    <>
      <TextArea
        onAddText={addTodo}
      />
      <TaskList
        todos={items}
      />
    </>
  )
};

function TextArea({ onAddText }) { // Text field to input new items
  const [inputValue, setInputValue] = useState("");
  //const inputRef = useRef(null);

  return (
    <form method="post">
    <>
    <label>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
    </label>
    <button type="submit" onClick={() => {
      setInputValue('');
      onAddText(inputValue);
    }}>Submit</button>
    </>
    </form>
  )
}

function TaskList({ todos }){
  return (
    <ul>
      {todos.map(todo => (
        <li>
          {todo} 
        </li>
      ))}
    </ul>
  );
}



