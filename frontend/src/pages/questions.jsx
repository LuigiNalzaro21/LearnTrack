import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Questions = () => {
    const [dynamicForms, setDynamicForms] = useState([]);

    const addQuestion = () => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'flex justify-center mb-5';
        const formId = Date.now(); // Unique ID for each form
        questionDiv.innerHTML = `
            <div class='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-gray-400 m-10 md:m-16 lg:m-5 w-[90%] rounded-[10px] mt-0 md:mt-0 lg:mt-0'>
                <form action="" class="p-3 md:p-5 lg:p-6" id="${formId}">

                <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                    <label for="untitled" class="block text-1xl md:text-lg lg:text-2xl font-medium text-gray-700">Untitled Question</label>

                <div class="flex justify-end">
                    <button class="delete-btn  bg-gray-800 w-[70%] md:w-[70%] lg:w-[30%] p-1 md:p-2 lg:p-3 rounded-[10px]
                    hover:bg-gray-900 hover:shadow-md hover:shadow-gray-900 transition-transform duration-300 transform hover:scale-105
                    text-white text-1xl md:text-lg lg:text-2xl hover:font-bold">Delete</button>
                </div>

                </div>

                    <input type="text" id="untitled" name="untitled" placeholder='Untitled question' class="mt-1 p-0 md:p-1 lg:p-2 outline-none w-full bg-gray-400 text-md md:text-1xl lg:text-lg text-gray-700 font-bold border-b-4 border-gray-700"/>
                </form>
            </div>
        `;
        document.getElementById('questions-container').appendChild(questionDiv);
    
        // Add event listener to delete button
        const deleteBtn = questionDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => handleDeleteForm(formId));
    };

    const handleDeleteForm = (formId) => {
        // Remove the form with the specified ID from the DOM
        const formToRemove = document.getElementById(formId);
        if (formToRemove) {
            formToRemove.parentElement.remove();
        }
    
        // Remove the form from the dynamicForms state
        setDynamicForms(prevForms => prevForms.filter(form => form.id !== formId));
    };    

    const handleInputChange = (formId, fieldName, value) => {
        setDynamicForms(prevForms =>
            prevForms.map(form => {
                if (form.id === formId) {
                    return {
                        ...form,
                        values: {
                            ...form.values,
                            [fieldName]: value
                        }
                    };
                }
                return form;
            })
        );
    };

    const handleReset = () => {
        // Check if there are dynamically added elements to reset
        const questionsContainer = document.getElementById('questions-container');
        
        // If the container doesn't exist or it has no children, notify the user
        if (!questionsContainer || questionsContainer.children.length === 0) {
            alert("There are no forms to reset.");
            return;
        }
    
        // Remove dynamically added elements from the DOM except the untitled form
        Array.from(questionsContainer.children).forEach(div => {
            // Check if the form inside the div is not the untitled form
            const form = div.querySelector('form');
            if (form && !form.classList.contains('fixed-form') && !form.querySelector('label').textContent.includes('Untitled Form')) {
                div.remove();
            }
        });
        
        // Reset the dynamicForms state to an empty array
        setDynamicForms([]);
    };
    
    const handleSubmit = async () => {
        // Check if there are any dynamically added forms
        const questionsContainer = document.getElementById('questions-container');
        if (!questionsContainer || questionsContainer.children.length === 0) {
            // If there are no dynamically added forms, show an alert
            alert("Please add questions first.");
            return;
        }
    
        try {
            const questions = Array.from(document.querySelectorAll('input[name="untitled"]')).map(input => input.value);
            // Check if any question has been added
            if (questions.every(question => !question.trim())) {
                alert("Please add at least one question.");
                return;
            }
            // Make a POST request using Axios
            const response = await axios.post('http://localhost:4000/questions', {
                questions: questions, // Sending questions as an array
            });
            // Check if the request was successful
            if (response.data.success) {
                alert('Questionnaire added successfully!');
                // Optionally, you can clear the form after successful submission
                handleReset();
            } else {
                alert('Failed to add questionnaire. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add questionnaire. Please try again.');
        }
    };    
                       
return (
    <div className='bg-gray-900 h-auto md:h-auto lg:h-full w-full pb-[46%] md:pb-10 lg:pb-[10%]'>

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

        <div className='justify-center bg-gray-800 m-8 md:m-16 lg:m-16 rounded-[20px] mt-[-10%] md:mt-[5%] lg:mt-0 p-1'>
            <div id='questions-container' className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-gray-600 m-10 w-[81%] md:w-[85%] lg:w-[95%] rounded-[20px] rounded-bl-none rounded-br-none'>

                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 w-[100%]'>
                    <Link to='/add' className='text-white text-center text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 rounded-tl-[20px] bg-gray-700 hover:bg-gray-500'>Add Instructor</Link>
                    <button to='/questions' className='text-white text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 rounded-tr-[20px] bg-gray-900'>Add Questionnaire</button>
                </div>

                <div className='flex justify-end mr-[4%] md:mr-[8%] lg:mr-[4%] mt-3 md:mt-3 lg:mt-5'>
                    <button onClick={addQuestion} className='m-3 md:m-4 lg:m-5 p-3 mr-7 md:p-4 lg:p-5 bg-gray-700 text-white text-1xl md:text-lg lg:text-2xl rounded-[10px]
                    hover:bg-gray-800 hover:shadow-md hover:shadow-gray-900'>Add Question</button>
                </div>

            </div>

            {/* Submit and Reset buttons */}
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 place-items-center mb-3 md:mb-4 lg:mb-5 bg-gray-600 p-3 md:p-4 lg:p-5
                m-10 w-[81%] md:w-[85%] lg:w-[95%] translate-y-[-100%] md:translate-y-[-100%] lg:translate-y-[-50%] rounded-[20px] rounded-tl-none rounded-tr-none'>
                <button onClick={handleSubmit} className='text-white text-1xl md:text-lg lg:text-2xl translate-x-[15%] md:translate-x-[15%] lg:translate-x-[100%] bg-gray-800 w-[70%] md:w-[70%] lg:w-[30%] p-3 md:p-4 lg:p-5 rounded-[50px]
                hover:bg-gray-900 hover:shadow-md hover:shadow-gray-900 transition-transform duration-300 transform hover:scale-105'>Submit</button>
                <button onClick={handleReset} className='text-white text-1xl md:text-lg lg:text-2xl translate-x-[-15%] md:translate-x-[-15%] lg:translate-x-[-100%] bg-gray-800 w-[70%] md:w-[70%] lg:w-[30%] p-3 md:p-4 lg:p-5 rounded-[50px]
                hover:bg-gray-900 hover:shadow-md hover:shadow-gray-900 transition-transform duration-300 transform hover:scale-105'>Reset</button>
            </div>

        </div>

    </div>
)
}

export default Questions;
