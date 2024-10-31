import React, { useState } from 'react';

function AddTaskPopup({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('To Do');
  const [assignedUser, setAssignedUser] = useState('');
  const [priority, setPriority] = useState('High');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const taskData = {
        title,
        description,
        dueDate,
        status,
        assignedUser,
        priority,
      };

      const response = await fetch(`${import.meta.env.VITE_CLIENT_SIDE}/tasks`, { // Update the API endpoint as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to add task'); // Throw an error if response is not OK
      }

      const data = await response.json();
      console.log(data);
      onClose(); // Close the popup on success
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task. Please check your details and try again.');
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" >
        <div className="bg-white p-8 rounded-lg shadow-lg h-auto max-h-screen" style={{ width: '40%'}}>
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Task Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required // Make this field required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter task description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required // Make this field required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required // Make this field required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Status</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>To Do</option>
                <option>In progress</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Assigned User</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter assigned user"
                value={assignedUser}
                onChange={(e) => setAssignedUser(e.target.value)}
                required // Make this field required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Priority</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTaskPopup;
