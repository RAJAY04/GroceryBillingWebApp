import React, { useState, useEffect } from 'react';

const NoteSection = () => {
  const [inputText, setInputText] = useState('');
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [updatedTaskText, setUpdatedTaskText] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/tasks')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddNote = () => {
    if (inputText.trim() !== '') {
      const newTask = { task: inputText, completed: false };

      fetch('http://localhost:8080/api/v1/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then(response => response.json())
        .then(data => {
          setNotes([...notes, data]);
          setInputText('');
        })
        .catch(error => console.error('Error adding task:', error));
    }
  };

  const handleRemoveNote = (id) => {
    fetch(`http://localhost:8080/api/v1/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const newNotes = notes.filter(note => note.id !== id);
          setNotes(newNotes);
        } else {
          console.error('Error deleting task');
        }
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleUpdateTask = (id) => {
    setSelectedNoteId(id);
    setShowModal(true);
  };

  const handleConfirmUpdate = () => {
    if (updatedTaskText.trim() !== '') {
      const updatedTask = { task: updatedTaskText };

      fetch(`http://localhost:8080/api/v1/tasks/${selectedNoteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      })
        .then(response => response.json())
        .then(data => {
          const updatedNotes = notes.map(note =>
            note.id === selectedNoteId ? { ...note, task: data.task } : note
          );
          setNotes(updatedNotes);
          setShowModal(false);
          setSelectedNoteId(null);
          setUpdatedTaskText('');
        })
        .catch(error => console.error('Error updating task:', error));
    }
  };

  const handleCancelUpdate = () => {
    setShowModal(false);
    setSelectedNoteId(null);
    setUpdatedTaskText('');
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleUpdateInputChange = (e) => {
    setUpdatedTaskText(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-300">
      <h2 className="text-lg font-semibold mb-4 text-center font-bold">To-Do List</h2>
      <div className="mb-4">
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder="Enter a new task..."
          className="w-full border-gray-300 border p-2 mb-2 focus:outline-none focus:border-indigo-500"
        />
        <button onClick={handleAddNote} className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Add Task</button>
      </div>
      <ol className="list-decimal list-inside">
        {notes.map((note, index) => (
          <li key={index} className="flex items-center justify-between border-b border-gray-200 py-2">
            <div>
              <span>{note.task}</span>
            </div>
            <div>
                <button onClick={() => handleUpdateTask(note.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600">Update
                </button>
                <button onClick={() => handleRemoveNote(note.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Remove
                </button>

            </div>
          </li>
        ))}
      </ol>
        {showModal && (
            <div
                className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Update Task</h3>
            <input
              type="text"
              value={updatedTaskText}
              onChange={handleUpdateInputChange}
              placeholder="Enter updated task..."
              className="w-full border-gray-300 border p-2 mb-4 focus:outline-none focus:border-indigo-500"
            />
            <div className="flex justify-end">
              <button onClick={handleConfirmUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">Confirm</button>
              <button onClick={handleCancelUpdate} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteSection;
