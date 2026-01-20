import axios from 'axios';
// Comment out localhost
// const API_URL = 'http://localhost:5000/api/tasks/';

// Add your new Render URL (Make sure to keep the /api/tasks/ pa
const API_URL = 'https://protasker.onrender.com/api/tasks/';
const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

const deleteTask = async (taskId) => {
  const response = await axios.delete(API_URL + taskId);
  return response.data;
};

const taskService = {
  getTasks,
  createTask,
  deleteTask,
};

export default taskService;