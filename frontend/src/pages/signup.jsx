import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const Signup = () => {
  const [title, setTitle] = useState("LearnTrack");
  const [fullname, setFullname] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [username, setUsername] = useState(""); 
  const [department, setDepartment] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [alertMessage, setAlertMessage] = useState(null);

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        fullname: fullname,
        email: email,
        username: username,
        department: department,
        password: password
      };
      await axios.post('http://localhost:4000/create', formData);
      alert('Student Account added Successfully');
    } catch (error) {
      console.error(error);
      alert('failed to add an account');
    }
  }
    
  return (
    <div className='bg-gray-900 h-screen w-screen'>
      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1'>
        <h1 className='text-white text-3xl md:text-4xl lg:text-5xl p-10 ml-5'>{title}</h1>
      </div>

      <div className='flex justify-center'>
        <div className='bg-gray-700 m-12 md:m-10 lg:m-20 mt-11 md:mt-0 lg:mt-0 lg:mb-1 rounded-[20px] w-[80%] md:w-[80%] lg:w-[40%] h-auto place-items-center'>
          <form action='' className='p-10' onSubmit={handleSubmit}>
            
            <div className='mb-5 md:mb-3 lg:mb-3'>
              <label htmlFor='fullname' className='text-white text-lg md:text-2xl lg:text-2xl'>Fullname</label>
              <input
                id='fullname'
                name='fullname'
                type='fullname'
                autoComplete='fullname'
                placeholder='Enter fullname...'
                value={fullname}
                onChange={handleFullnameChange}
                required
                className='mt-2 p-3 md:p-4 lg:p-3 w-full bg-gray-900 text-white text-base md:text-lg lg:text-1xl rounded-md outline-none' 
              />
            </div>

            <div className='mb-5 md:mb-3 lg:mb-3'>
              <label htmlFor='email' className='text-white text-lg md:text-2xl lg:text-2xl'>Email</label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                placeholder='Enter email...'
                value={email}
                onChange={handleEmailChange}
                required
                className='mt-2 p-3 md:p-4 lg:p-3 w-full bg-gray-900 text-white text-base md:text-lg lg:text-1xl rounded-md outline-none' 
              />
            </div>

            <div className='mb-5 md:mb-3 lg:mb-3'>
              <label htmlFor='username' className='text-white text-lg md:text-2xl lg:text-2xl'>Username</label>
              <input
                id='username'
                name='username'
                type='username'
                autoComplete='username'
                placeholder='Enter username...'
                value={username}
                onChange={handleUsernameChange}
                required
                className='mt-2 p-3 md:p-4 lg:p-3 w-full bg-gray-900 text-white text-base md:text-lg lg:text-1xl rounded-md outline-none' 
              />
            </div>

            <div className='mb-5 md:mb-3 lg:mb-3'>
              <label htmlFor='department' className='text-white text-lg md:text-2xl lg:text-2xl'>Department</label>
              <select
                id='department'
                name='department'
                value={department}
                onChange={handleDepartmentChange}
                className='mt-2 p-3 md:p-4 lg:p-3 w-full bg-gray-900 text-white text-base md:text-lg lg:text-1xl rounded-md outline-none' 
              >
                <option value="">Select Department</option>
                <option value="bsit">BSIT</option>
                <option value="bsoa">BSOA</option>
                <option value="bsba">BSBA</option>
                <option value="bseduc">BSEDUC</option>
                <option value="bscrim">BSCRIM</option>
              </select>
            </div>

            <div className='mb-5 md:mb-10 lg:mb-10'>
              <label htmlFor='password' className='text-white text-lg md:text-2xl lg:text-2xl'>Password</label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='password'
                placeholder='Enter password...'
                value={password}
                onChange={handlePasswordChange}
                required
                className='mt-2 p-3 md:p-4 lg:p-3 w-full bg-gray-900 text-white text-base md:text-lg lg:text-1xl rounded-md outline-none' 
              />
            </div>

            <div className='mb-5'>
              <button className='text-white w-full bg-gray-950 p-3 md:p-4 lg:p-3 rounded-full text-lg md:text-2xl lg:text-2xl hover:bg-gray-800
              hover:shadow-md hover:shadow-black'>Sign up</button> 
            </div>

            <div>
              <p className='text-white text-center text-lg md:text-2xl lg:text-1xl whitespace-nowrap'>Already have an account? <span className='text-white text-lg md:text-2xl lg:text-1xl 
              hover:underline hover:font-bold hover:text-gray-950 whitespace-nowrap'><Link to="/user">Sign in</Link></span></p>
            </div>

          </form>

        </div>

      </div>
      
    </div>
  )
}

export default Signup;
