import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const [title, setTitle] = useState("Add Instructor Page");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const formDataObject = Object.fromEntries(formData.entries());
            await axios.post('http://localhost:4000/add', formDataObject);
            alert('Instructor added successfully!');
            handleReset();
        } catch (error) {
            console.error('Error adding instructor:', error);
            alert('Failed to add instructor. Please try again.');
        }
    };
    
    const handleReset = () => {
        document.getElementById("fullname").value = "";
        document.getElementById("age").value = "";
        document.getElementById("gender").selectedIndex = 0;
        document.getElementById("position").selectedIndex = 0;
        document.getElementById("status").value = "";
        document.getElementById("department").selectedIndex = 0;
    };    

    return (
        <div className='bg-gray-900 h-[100vh] md:h-[100vh] lg:h-[100vh] w-full'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2'>
                <div className='Title justify-start'>
                    <h1 className='text-white text-2xl md:text-3xl lg:text-4xl p-10 ml-2'>LearnTrack</h1>
                </div>

                <div className='flex justify-end'>
                    <h1 className='text-white text-2xl md:text-3xl lg:text-4xl p-10 md:p-10 lg:p-10 translate-x-14 md:translate-x-10 lg:translate-x-10 whitespace-nowrap'>Welcome, Admin</h1>
                    <Link to="/"><i className="fas fa-sign-out-alt text-white text-2xl md:text-4xl lg:text-4xl p-10 md:p-10 lg:p-10 pt-[47px] md:pt-[45px] lg:pt-[45px] 
                    whitespace-nowrap hover:text-gray-500" title='Signout'></i></Link>
                </div>
            </div>

            <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 m-8 md:m-16 lg:m-16 place-items-center gap-x-10 md:gap-x-5 lg:gap-x-0 mt-[1%] md:mt-[2%] lg:mt-0
             bg-gray-600 p-3 md:p-4 lg:p-5 rounded-[20px] mb-20 md:mb-4 lg:mb-10'>

                <button className='text-white text-1xl md:text-2xl lg:text-3xl bg-gray-800 w-[130%] md:w-[110%] lg:w-[120%] ml-[40%] md:ml-[10%] lg:ml-[20%] p-3 md:p-4 lg:p-5
                 rounded-[20px] whitespace-nowrap
                hover:bg-gray-800 text-center'>Create Records</button>
                <Link to="/view" className='text-white text-center text-1xl md:text-2xl lg:text-3xl bg-gray-700 hover:bg-gray-800 w-[130%] md:w-[110%] lg:w-[120%] ml-[45%] md:ml-[25%] lg:ml-[70%] p-3 md:p-4 lg:p-5
                 rounded-[20px] whitespace-nowrap'>View Records</Link>
                <Link to="/main" className='text-white text-center text-1xl md:text-2xl lg:text-3xl bg-gray-500 p-3 md:p-4 lg:p-5 rounded-[20px] w-[90%] md:w-[80%] lg:w-[50%] whitespace-nowrap 
                hover:bg-gray-800 ml-[10%] md:ml-[10%] lg:ml-[50%]'>Go Back</Link>

            </div>

        {/* Form for adding instructor */}
        <div className='flex justify-center bg-gray-800 m-8 md:m-16 lg:m-16 rounded-[20px] h-[74vh] md:h-[67vh] lg:h-[67vh] mt-[-10%] md:mt-[5%] lg:mt-0'>
                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-gray-600 m-10 w-[81%] md:w-[85%] lg:w-[95%] rounded-[20px] place-items-center overflow-y-scroll'>

                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 w-[100%]'>
                    <button className='text-white text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 rounded-tl-[20px] bg-gray-900'>Add Instructor</button>
                    <Link to='/questions' className='text-white text-center text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 rounded-tr-[20px] bg-gray-700 hover:bg-gray-500'>Add Questionnaire</Link>
                </div>

                    <form onSubmit={handleSubmit} className='p-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:gap-x-14'>

                        <div className="mb-4">
                            <label htmlFor="fullname" className="text-white text-1xl md:text-2xl lg:text-3xl">Full Name</label>
                            <input type="text" id="fullname" name="fullname" className="bg-gray-900 rounded-lg p-3 md:p-4 lg:p-5 text-1xl md:text-2xl lg:text-3xl mt-3 md:mt-4 lg:mt-5 
                            text-white w-[100%] md:w-[100%] lg:w-full outline-none" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="age" className="text-white text-1xl md:text-2xl lg:text-3xl">Age</label>
                            <input type="number" id="age" name="age" className="bg-gray-900 rounded-lg p-3 md:p-4 lg:p-5 text-1xl md:text-2xl lg:text-3xl mt-3 md:mt-4 lg:mt-5 
                            text-white w-[100%] md:w-[100%] lg:w-full outline-none" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="gender" className="text-white text-1xl md:text-2xl lg:text-3xl">Gender</label>
                            <select id="gender" name="gender" className="bg-gray-900 rounded-lg p-3 md:p-4 lg:p-5 text-1xl md:text-2xl lg:text-3xl mt-3 md:mt-4 lg:mt-5 
                            text-white w-[100%] md:w-[100%] lg:w-full outline-none">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="position" className="text-white text-1xl md:text-2xl lg:text-3xl">Position</label>
                            <select id="position" name="position" className="bg-gray-900 rounded-lg p-3 md:p-4 lg:p-5 text-1xl md:text-2xl lg:text-3xl mt-3 md:mt-4 lg:mt-5 
                            text-white w-[100%] md:w-[100%] lg:w-full outline-none">
                                <option value="Department Head">Department Head</option>
                                <option value="Professor">Professor</option>
                                <option value="Intern">Intern</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="status" className="text-white text-1xl md:text-2xl lg:text-3xl">Status</label>
                            <select id="status" name="status" className="bg-gray-900 rounded-lg p-3 md:p-4 lg:p-5 text-1xl md:text-2xl lg:text-3xl mt-3 md:mt-4 lg:mt-5 
                            text-white w-[100%] md:w-[100%] lg:w-full outline-none">
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>

                        <div className="mb-12 md:mb-16 lg:mb-20">
                            <label htmlFor="department" className="text-white text-1xl md:text-2xl lg:text-3xl">Department</label>
                            <select id="department" name="department" className="bg-gray-900 rounded-lg p-3 md:p-4 lg:p-5 text-1xl md:text-2xl lg:text-3xl mt-3 md:mt-4 lg:mt-5 
                            text-white w-[100%] md:w-[100%] lg:w-full outline-none">
                            <option value="">Select Department</option>
                            <option value="BSIT">BSIT</option>
                            <option value="BSOA">BSOA</option>
                            <option value="BSBA">BSBA</option>
                            <option value="BSEDUC">BSEDUC</option>
                            <option value="BSCRIM">BSCRIM</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 lg:translate-x-[53%]">
                            <button type="submit" className="text-white bg-gray-800 hover:shadow-lg hover:shadow-black hover:bg-gray-950 transition-transform duration-300 transform hover:scale-105 
                            rounded-[50px] p-3 md:p-4 lg:p-5 text-1xl md:text-2xl lg:text-3xl w-[90%] md:w-[90%] lg:w-[100%]
                            md:translate-x-[-1%] lg:translate-x-[-10%]">Save</button>
                            <button type="button" onClick={handleReset} className="text-white bg-gray-800 hover:shadow-lg hover:shadow-black hover:bg-gray-950 transition-transform duration-300 transform hover:scale-105 
                            rounded-[50px] p-3 md:p-4 lg:p-5 text-1xl md:text-2xl lg:text-3xl w-[90%] md:w-[90%] lg:w-[100%]
                            md:translate-x-[1%] lg:translate-x-[10%]">Reset</button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
}

export default Add;
