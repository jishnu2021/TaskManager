const Task = require('../modals/TaskSchema'); // Correct the path if necessary

// Add a new task
exports.addTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, assignedUser, priority } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate,
      status,
      assignedUser,
      priority,
    });

    const savedTask = await newTask.save();
    res.status(201).json({ message: 'Task added successfully', task: savedTask });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Failed to add task', error: error.message });
  }
};

  exports.alltasks = async (req, res) => {
    try {
      const tasks = await Task.find(); // Retrieve all tasks from the Task collection
      res.status(200).json(tasks); // Send tasks as a JSON response
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Failed to fetch tasks' });
    }
  };


// Update an existing task
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
      new: true, // Return the updated task
      runValidators: true, // Ensure validation is applied to updated data
    });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    await Task.findByIdAndDelete(taskId); // MongoDB method to delete task by ID
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

exports.completetask = async (req, res) => {
  try {
    const completedTasks = await Task.find({ status: 'Completed' }); // Fetch tasks with 'completed' status
    res.json(completedTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching completed tasks' });
  }
};
exports.todotask = async (req, res) => {
  try {
    const todoTasks = await Task.find({ status: 'To Do' }); // Fetch tasks with 'completed' status
    res.json(todoTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching completed tasks' });
  }
};
exports.incomplete = async (req, res) => {
  try {
    const incompTasks = await Task.find({ status: 'In progress' }); // Fetch tasks with 'completed' status
    res.json(incompTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching completed tasks' });
  }
};