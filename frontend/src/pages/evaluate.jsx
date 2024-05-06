import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Evaluate = () => {
    const [title, setTitle] = useState("Evaluation Page");
    const [selectedOptions, setSelectedOptions] = useState({
        understand1: '',
        understand2: '',
        understand3: ''
    });

    // Function to handle radio button change
    const handleRadioChange = (event) => {
        const { name, value } = event.target;
        setSelectedOptions(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to reset all selected radio buttons
    const handleReset = () => {
        setSelectedOptions({
            understand1: '',
            understand2: '',
            understand3: ''
        });
    };

    return (
        <div className='bg-gray-900 w-full'>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

            {/* Header */}
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2'>
                <div className='Title justify-start'>
                    <h1 className='text-white text-2xl md:text-3xl lg:text-4xl p-10 ml-2'>LearnTrack</h1>
                </div>

                <div className='flex justify-end'>
                    <h1 className='text-white text-2xl md:text-3xl lg:text-4xl p-10 md:p-10 lg:p-10 translate-x-14 md:translate-x-10 lg:translate-x-10 whitespace-nowrap'>Welcome, User</h1>
                    <Link to="/user"><i className="fas fa-sign-out-alt text-white text-2xl md:text-4xl lg:text-4xl p-10 md:p-10 lg:p-10 pt-[47px] md:pt-[45px] lg:pt-[45px] 
                    whitespace-nowrap hover:text-gray-500" title='Signout'></i></Link>
                </div>
            </div>

            <h1 className='text-white text-1xl md:text-2xl lg:text-3xl font-bold m-10'>Teacher Evaluation Form</h1>

            <p className='text-white text-1xl md:text-2xl lg:text-3xl m-10 mb-0'>Before proceeding with the evaluation, please read and agree to the following:</p>

            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1'>

                <div className='box 1 m-10 p-1 md:p-2 lg:p-1 bg-gray-600 rounded-[20px]'>

                    <p className='text-white text-balance whitespace-nowrap text-lg md:text-1xl lg:text-2xl m-10 text-justify'>1. Do you understand that the purpose of this evaluation
                     is to assess various aspects of the teacher's performance and conduct?</p>

                     <div className="flex flex-col items-start space-y-5 m-10">
                        <label className="flex items-center text-white text-lg md:text-1xl lg:text-2xl">
                            <input 
                                type="radio" 
                                name="understand1" 
                                value="yes" 
                                className="mr-2 size-4 md:size-6 lg:size-8" 
                                checked={selectedOptions.understand1 === 'yes'} 
                                onChange={handleRadioChange} 
                            />
                            Yes, I acknowledge the purpose of this evaluation.
                        </label>
                        <label className="flex items-center text-white text-lg md:text-1xl lg:text-2xl">
                            <input 
                                type="radio" 
                                name="understand1" 
                                value="no" 
                                className="mr-2 size-4 md:size-6 lg:size-8" 
                                checked={selectedOptions.understand1 === 'no'} 
                                onChange={handleRadioChange} 
                            />
                            No, I do not fully understand the purpose of this evaluation.
                        </label>
                    </div>
                    
                </div>

                <div className='box 1 m-10 p-1 md:p-2 lg:p-1 bg-gray-600 rounded-[20px] mt-0'>
                    
                    <p className='text-white text-balance whitespace-nowrap text-lg md:text-1xl lg:text-2xl m-10 text-justify'>2. Will you agree to provide honest and fair feedback
                     based on your observations and interactions with the student?</p>

                     <div className="flex flex-col items-start space-y-5 m-10">
                        <label className="flex items-center text-white text-lg md:text-1xl lg:text-2xl">
                            <input 
                                type="radio" 
                                name="understand2" 
                                value="yes" 
                                className="mr-2 size-4 md:size-6 lg:size-8 whitespace-nowrap text-balance" 
                                checked={selectedOptions.understand2 === 'yes'} 
                                onChange={handleRadioChange} 
                            />
                            Yes, I agree to provide honest and fair feedback.
                        </label>
                        <label className="flex items-center text-white text-lg md:text-1xl lg:text-2xl">
                            <input 
                                type="radio" 
                                name="understand2" 
                                value="no" 
                                className="mr-2 size-4 md:size-6 lg:size-8 whitespace-nowrap text-balance" 
                                checked={selectedOptions.understand2 === 'no'} 
                                onChange={handleRadioChange} 
                            />
                            No, I am unable to provide honest and fair feedback at this time.
                        </label>
                    </div>
                    
                </div>

                <div className='box 1 m-10 p-1 md:p-2 lg:p-1 bg-gray-600 rounded-[20px] mt-0'>
                    
                    <p className='text-white text-balance whitespace-nowrap text-lg md:text-1xl lg:text-2xl m-10 text-justify'>3. Do you acknowledge that the information provided 
                    in this evaluation will be used for educational purposes only and will be kept confidential?</p>

                     <div className="flex flex-col items-start space-y-5 m-10">
                        <label className="flex items-center text-white text-lg md:text-1xl lg:text-2xl">
                            <input 
                                type="radio" 
                                name="understand3" 
                                value="yes" 
                                className="mr-2 size-4 md:size-6 lg:size-8 whitespace-nowrap text-balance" 
                                checked={selectedOptions.understand3 === 'yes'} 
                                onChange={handleRadioChange} 
                            />
                            Yes, I acknowledge that the information will be used for educational purposes and kept confidential.
                        </label>
                        <label className="flex items-center text-white text-lg md:text-1xl lg:text-2xl">
                            <input 
                                type="radio" 
                                name="understand3" 
                                value="no" 
                                className="mr-2 size-4 md:size-6 lg:size-8 whitespace-nowrap text-balance" 
                                checked={selectedOptions.understand3 === 'no'} 
                                onChange={handleRadioChange} 
                            />
                            No, I do not acknowledge that the information will be used for educational purposes and kept confidential.
                        </label>
                    </div>
                    
                </div>

                <div className='buttons grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 place-items-center mt-0 mb-10'>
                    <Link to="/form" className='text-white text-1xl md:text-2xl lg:text-3xl bg-gray-700 hover:bg-gray-950 hover:shadow-black hover:shadow-lg text-center
                    transition-transform duration-300 transform hover:scale-105 p-2 md:p-3 lg:p-5 w-[70%] md:w-[60%] lg:w-[55%] rounded-[10px]
                    translate-x-[5%] md:translate-x-[20%] lg:translate-x-[25%]'>Proceed</Link>
                    <button className='text-white text-1xl md:text-2xl lg:text-3xl bg-gray-700 hover:bg-gray-950 hover:shadow-black hover:shadow-lg text-center
                    transition-transform duration-300 transform hover:scale-105 p-2 md:p-3 lg:p-5 w-[70%] md:w-[60%] lg:w-[55%] rounded-[10px]
                    translate-x-[-5%] md:translate-x-[-20%] lg:translate-x-[-25%]' onClick={handleReset}>Reset</button>
                </div>

            </div>

        </div>
    );
}

export default Evaluate;
