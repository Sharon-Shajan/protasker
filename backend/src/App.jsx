import { useState, useEffect } from 'react';
import taskService from './features/taskService';
import './App.css'; // Assume basic CSS for styling

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  // Fetch Tasks on Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await taskService.getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Handle Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    try {
      const newTask = await taskService.createTask({ text });
      setTasks([...tasks, newTask]); // Update UI instantly
      setText('');
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Delete
  const onDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>ProTasker</h1>
      </header>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a project task..."
            />
          </div>
          <button type="submit" className="btn btn-block">Add Task</button>
        </form>
      </section>

      <section className="content">
        {tasks.length > 0 ? (
          <div className="tasks">
            {tasks.map((task) => (
              <div key={task._id} className="task-item">
                <h3>{task.text}</h3>
                <button onClick={() => onDelete(task._id)} className="close">X</button>
              </div>
            ))}
          </div>
        ) : (
          <h3>No tasks set</h3>
        )}
      </section>
    </div>
  );
}

export default App;