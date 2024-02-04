// NoteSection.jsx
import React, { useState } from 'react';

const NoteSection = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="flex bg-white p-4 rounded-md flex-wrap">
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-4">To-Do List</h2>
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow p-2 border rounded-md focus:outline-none focus:ring focus:border-fourth-color mr-2"
            placeholder="Add a new task"
          />
          <button
            onClick={handleAddTodo}
            className="bg-fourth-color text-white px-4 py-2 rounded-md hover:bg-opacity-80"
          >
            Add
          </button>
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="flex items-center mb-2">
              <span className="mr-2">{index + 1}.</span>
              <span className="flex-grow">{todo}</span>
              <button
                onClick={() => handleRemoveTodo(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoteSection;
