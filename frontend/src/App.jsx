import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import taskService from './features/taskService';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function Dashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await taskService.getTasks();
        setTasks(data);
      } catch (error) { console.error(error); }
    };
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    const newTask = await taskService.createTask({ text });
    setTasks([...tasks, newTask]);
    setText('');
  }
  ;

  const onDelete = async (id) => {
    await taskService.deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Welcome, {user.name}</h1>
        <button className="btn" style={{backgroundColor: '#e74c3c', marginTop: '10px'}} onClick={onLogout}>Logout</button>
      </header>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="What needs to be done?" />
          </div>
          <button type="submit" className="btn btn-block">Add Task</button>
        </form>
      </section>
      <section className="content">
        {tasks.map((task) => (
          <div key={task._id} className="task-item">
            <h3>{task.text}</h3>
            <button onClick={() => onDelete(task._id)} className="close">X</button>
          </div>
        ))}
      </section>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="container" style={{background: 'transparent', boxShadow: 'none'}}>
        <Routes>
          <Route path="/" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? 
            (<>
              <Login onLogin={handleLogin} />
              <p style={{textAlign:'center', marginTop: '20px'}}>Don't have an account? <Link to="/register">Register</Link></p>
            </>) : <Navigate to="/" />} 
          />
          <Route path="/register" element={!user ? 
            (<>
              <Register onLogin={handleLogin} />
              <p style={{textAlign:'center', marginTop: '20px'}}>Already have an account? <Link to="/login">Login</Link></p>
            </>) : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;