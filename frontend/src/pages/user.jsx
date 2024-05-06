import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const User = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email: email,
        password: password
      };
      const response = await axios.post('http://localhost:4000/signin', formData);
      console.log(response.data);
      if (response.data.success) {
        // Redirect to the evaluate page upon successful sign-in
        navigate('/evaluate');
      } else {
        // Handle sign-in error (e.g., display error message)
        console.log('Sign-in failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle sign-in error (e.g., display error message)
    }
  };  

  return (
    <div className='bg-gray-900 h-full md:h-[125vh] lg:h-[100vh] w-full'>

      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1'>
        <h1 className='text-white text-3xl md:text-4xl lg:text-5xl p-10 ml-5'>LearnTrack</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>

        <div className='grid justify-start lg:justify-end p-[10px] md:p-[10px] lg:p-[120px] pl-[60px] md:pl-[100px] lg:pl-[150px] lg:pt-[130px] lg:h-[50vh] mb-6 md:mb-8 lg:mb-0'>
          <p className='text-white text-3xl md:text-4xl lg:text-6xl whitespace-nowrap'>"In school, you're taught a</p>
          <p className='text-white text-3xl md:text-4xl lg:text-6xl whitespace-nowrap'>lesson and then given a</p>
          <p className='text-white text-3xl md:text-4xl lg:text-6xl whitespace-nowrap'>test. In life, you're given a</p>
          <p className='text-white text-3xl md:text-4xl lg:text-6xl whitespace-nowrap'>a test that teaches you a</p>
          <p className='text-white text-3xl md:text-4xl lg:text-6xl whitespace-nowrap'>lesson."</p>
          <h1 className='text-white text-3xl md:text-4xl lg:text-6xl font-bold pt-5 whitespace-nowrap'>- Tom Bodett</h1>
        </div>

        <div className='bg-gray-700 m-12 md:m-0 lg:m-0 translate-y-[-5%] md:translate-y-[5%] lg:translate-y-[-2.5%] rounded-[20px] w-[80%] h-auto md:justify-center lg:translate-x-0 lg:left-0 md:mx-auto'>

        <form className='p-10' onSubmit={handleSignIn}>

            <h1 className='text-white text-2xl md:text-3xl lg:text-4xl text-center font-bold whitespace-nowrap'>Sign in</h1>

          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid col-span-2 m-3 md:m-4 lg:m-5'>

            <Link to="/" className='text-white text-center text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 bg-gray-600 rounded-[50px] w-[110%] translate-x-[5%] z-0
             mt-3 md:mt-4 lg:mt-5 mb-3 md:mb-4 lg:mb-5 hover:bg-gray-900 rounded-tr-none rounded-br-none'>Admin</Link>

            <button className='text-white text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 bg-gray-800 mt-3 md:mt-4 lg:mt-5 mb-3 md:mb-4 lg:mb-5 rounded-[50px]
             translate-x-[-15%] w-[110%]'>User</button>

          </div>

            <div className='mb-5 md:mb-5'>
              <label htmlFor='email' className='text-white text-lg md:text-2xl lg:text-3xl'>Email</label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                placeholder='Enter email...'
                value={email} // Bind value to state
                onChange={handleEmailChange} // Add onChange event
                required
                className='mt-3 md:mt-4 lg:mt-5 p-3 md:p-4 lg:p-5 w-full bg-gray-900 text-white text-base md:text-lg lg:text-xl rounded-md outline-none'
              />
            </div>

            <div className='mb-10'>
              <label htmlFor='password' className='text-white text-lg md:text-2xl lg:text-3xl'>Password</label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='password'
                placeholder='Enter password...'
                value={password} // Bind value to state
                onChange={handlePasswordChange} // Add onChange event
                required
                className='mt-3 md:mt-4 lg:mt-5 p-3 md:p-4 lg:p-5 w-full bg-gray-900 text-white text-base md:text-lg lg:text-xl rounded-md outline-none'
              />
            </div>

            <div className='mb-5 md:mb-10'>
              <button type="submit" className='text-white w-full bg-gray-950 p-3 md:p-4 lg:p-5 rounded-full text-lg md:text-2xl lg:text-3xl hover:bg-gray-800 hover:shadow-md hover:shadow-black'>Sign in</button>
            </div>

            <div>
              <p className='text-white text-center text-lg md:text-2xl lg:text-2xl whitespace-nowrap'>Don’t have an account? <span className='text-white text-lg md:text-2xl lg:text-2xl hover:underline hover:font-bold hover:text-gray-950 whitespace-nowrap'><Link to="/signup">Sign up.</Link></span></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;

