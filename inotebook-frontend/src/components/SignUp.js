
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {

  let history = useNavigate();

  const [credentials, setCredentials] = useState({ name:"",email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
    });

    let result = await response.json(); 
    if (result.success) {
      localStorage.setItem("token", result.token)
      history("/login"); 
      // console.log(result.token);
    }
 
  }
  return (
    <div className='container'>
      <form className='container' onSubmit={handlesubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={credentials.name} id="name" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name='email' className="form-control" id="email" value={credentials.email} aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password"  minLength={5} required  name="password" className="form-control" value={credentials.password} id="password" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default SignUp