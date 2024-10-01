import React, { useState, useEffect } from 'react';

function IncompleteTask() {
  const [incompletetasks, setincompletetasks] = useState([]);

  useEffect(() => {
    const fetchincompletetasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks/incomplete'); // API for completed tasks
        if (!response.ok) {
          throw new Error('Failed to fetch completed tasks');
        }
        const data = await response.json();
        setincompletetasks(data);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    };

    fetchincompletetasks();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {incompletetasks.length > 0 ? (
        incompletetasks.map(task => (
          <div key={task._id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-gray-600">{task.assignedUser}</p>
            <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p className="text-sm text-green-600 font-bold">{task.status}</p>

          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No completed tasks available.</p>
      )}
    </div>
  );
}

export default IncompleteTask;
