import { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) { // Props to notify App.jsx
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://protasker.onrender.com/api/users/login', formData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        onLogin(response.data); // Notify parent component
      }
    } catch (error) {
      alert('Login Failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Login</h1>
        <p>Login to start managing tasks</p>
      </div>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Enter password" required />
          </div>
          <button type="submit" className="btn btn-block">Submit</button>
        </form>
      </section>
    </div>
  );
}
export default Login;