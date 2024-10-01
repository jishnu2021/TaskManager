import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AddTaskPopup from './AddTaskpopup'; // Import the popup component
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for edit and delete

function Dashboard() {
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tasks, setTasks] = useState([]); // State to hold tasks
  // const userEmail = localStorage.getItem('user'); // Assuming user email is stored in local storage

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/alltasks'); // Fetch tasks for specific user
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data); // Set tasks in state
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Handle delete task
  // Handle delete task
const handleDelete = async (taskId) => {
  console.log("Task id",taskId)
  try {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}`, { // API endpoint for delete
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    // Remove the deleted task from the state by filtering out the deleted task
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};


  // Handle edit task (you can implement your own logic here)
  const handleEdit = (task) => {
    // Set the task data in a state to populate the popup (not shown in this snippet)
    openPopup(); // Open popup for editing
  };

  return (
    <div className="flex">
      <aside
        id="default-sidebar"
        className="w-64 h-screen bg-gray-50 dark:bg-gray-800 px-3 py-4"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto">
          <ul className="space-y-2 font-medium" style={{ color: 'black', fontWeight: '700' }}>
            {/* Sidebar links remain the same */}
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center p-2 rounded-lg ${
                  location.pathname === '/dashboard' ? 'bg-gray-100' : ''
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">All Tasks</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/completetask"
                className={`flex items-center p-2 rounded-lg ${
                  location.pathname === '/dashboard/completetask' ? 'bg-gray-200' : ''
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Completed Tasks</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/todotask"
                className={`flex items-center p-2 rounded-lg ${
                  location.pathname === '/dashboard/todotask' ? 'bg-gray-200' : ''
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">To-do Task</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/incompletetask"
                className={`flex items-center p-2 rounded-lg ${
                  location.pathname === '/dashboard/incompletetask' ? 'bg-gray-200' : ''
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">In progress Tasks</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="flex-grow p-8" style={{ width: '80%' }}>
        {location.pathname === '/dashboard' ? (
          <div>
            <div>
              <div className="mb-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={openPopup}
                >
                  Add Task
                </button>
              </div>
            </div>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
              <table className="min-w-full table-auto border-collapse" style={{ width: '100%' }}>
                <thead className="bg-gray-100">
                  <tr className="text-left text-gray-700 font-semibold">
                    <th className="px-6 py-4 border-b">Title</th>
                    <th className="px-6 py-4 border-b">Description</th>
                    <th className="px-6 py-4 border-b">Due Date</th>
                    <th className="px-6 py-4 border-b">Status</th>
                    <th className="px-6 py-4 border-b">Assigned User</th>
                    <th className="px-6 py-4 border-b">Priority</th>
                    <th className="px-6 py-4 border-b">Actions</th> {/* New column for actions */}
                  </tr>
                </thead>
                <tbody>
                  {tasks.length > 0 ? (
                    tasks.map(task => (
                      <tr key={task.id}>
                        <td className="px-6 py-4 border-b">{task.title}</td>
                        <td className="px-6 py-4 border-b">{task.description}</td>
                        <td className="px-6 py-4 border-b">{task.dueDate}</td>
                        <td className="px-6 py-4 border-b">{task.status}</td>
                        <td className="px-6 py-4 border-b">{task.assignedUser}</td>
                        <td className="px-6 py-4 border-b">{task.priority}</td>
                        <td className="px-6 py-4 border-b">
                          <button onClick={() => handleEdit(task)} className="text-blue-500 mr-2">
                            <FaEdit /> {/* Edit icon */}
                          </button>
                          <button onClick={() => handleDelete(task._id)} className="text-red-500">
                            <FaTrash /> {/* Delete icon */}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        No tasks available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <Outlet />
        )}

        {/* AddTaskPopup Component */}
        <AddTaskPopup isOpen={isPopupOpen} onClose={closePopup} />
      </div>
    </div>
  );
}

export default Dashboard;
