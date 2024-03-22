import React, { useState } from 'react';

const NoteSection = () => {
  const [inputText, setInputText] = useState('');
  const [notes, setNotes] = useState([]);

  // Function to handle input change
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  // Function to handle add note
  const handleAddNote = () => {
    if (inputText.trim() !== '') {
      setNotes([...notes, { text: inputText, completed: false }]);
      setInputText('');
    }
  };

  // Function to handle remove note
  const handleRemoveNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  // Function to handle checkbox toggle
  const handleCheckboxToggle = (index) => {
    const newNotes = [...notes];
    newNotes[index].completed = !newNotes[index].completed;
    setNotes(newNotes);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4">To-Do List</h3>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder="Enter a new task..."
          className="flex-grow rounded-l-lg border-gray-300 border p-2 focus:outline-none focus:border-indigo-500"
        />
        <button onClick={handleAddNote} className="bg-indigo-500 text-white px-4 py-2 rounded-r-lg">Add</button>
      </div>
      <ul>
        {notes.map((note, index) => (
          <li key={index} className="flex items-center justify-between border-b border-gray-200 py-2">
            <div>
              <input
                type="checkbox"
                checked={note.completed}
                onChange={() => handleCheckboxToggle(index)}
                className="mr-2"
              />
              <span className={note.completed ? 'line-through' : ''}>{note.text}</span>
            </div>
            <button onClick={() => handleRemoveNote(index)} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteSection;
