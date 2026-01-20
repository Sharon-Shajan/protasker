import { useState } from 'react';
import axios from 'axios';

function Register({ onLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://protasker.onrender.com/api/users/login', formData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        onLogin(response.data);
      }
    } catch (error) {
      alert('Registration Failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container">
      <div className="header"><h1>Register</h1></div>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group"><input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required /></div>
          <div className="form-group"><input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required /></div>
          <div className="form-group"><input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required /></div>
          <button type="submit" className="btn btn-block">Register</button>
        </form>
      </section>
    </div>
  );
}
export default Register;