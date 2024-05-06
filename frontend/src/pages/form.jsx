import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            // Fetch teachers
            const teachersResponse = await axios.get('http://localhost:4000/teachers');
            if (teachersResponse.data.success) {
                // Assuming the server sends an array of objects with 'fullname' property
                setTeachers(teachersResponse.data.data); // Make sure to access the 'data' property
            } else {
                console.error('Failed to fetch teachers data');
            }
    
            // Fetch questions
            const questionsResponse = await axios.get('http://localhost:4000/questions');
            if (questionsResponse.data.success) {
                const questionData = questionsResponse.data.questions.map(questionObj => questionObj.question);
                setQuestions(questionData);
                setAnswers(Array(questionData.length).fill(''));
            } else {
                console.error('Failed to fetch questionnaire data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        
    const handleAnswerChange = (index, value) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[index] = value;
            return newAnswers;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const selectedTeacherId = e.target.teacherName.value; // Assuming you're storing the teacher's ID in the dropdown value
            
            // Find the selected teacher object from the teachers array
            const selectedTeacher = teachers.find(teacher => teacher._id === selectedTeacherId);
            
            // Ensure that the selectedTeacher is not undefined and contains the full name
            if (selectedTeacher && selectedTeacher.fullname) {
                // Create an array to store questions and answers
                const questionsAndAnswers = questions.map((question, index) => ({
                    question: question,
                    answer: answers[index]
                }));
    
                // Make a POST request to submit evaluation data
                const response = await axios.post('http://localhost:4000/submit', {
                    teacherName: selectedTeacher.fullname, // Send the full name of the teacher
                    questionsAndAnswers: questionsAndAnswers,
                });
    
                // Check if the submission was successful
                if (response.data.success) {
                    // Display success message
                    window.alert('Answers submitted successfully');
                } else {
                    // Display error message if submission failed
                    window.alert('Failed to submit answers. Please try again.');
                }
            } else {
                // Handle case where selectedTeacher or its fullname is undefined
                console.error('Selected teacher or fullname is undefined');
                window.alert('Failed to submit answers. Please select a valid teacher.');
            }
        } catch (error) {
            console.error('Error submitting answers:', error);
            // Display error message if an error occurs during submission
            window.alert('Failed to submit answers. Please try again.');
        }
    };
            
    return (
        <div className='bg-gray-900 h-full md:h-full lg:h-auto w-full pb-[87.6%] md:pb-[43.6%] lg:pb-[17.1%]'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
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

            <h1 className='text-white text-1xl md:text-2xl lg:text-3xl font-bold m-12 mt-2'>Teacher Evaluation Form</h1>

            <div className='flex justify-center mt-8'>
                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-gray-700 m-0 p-3 md:p-4 lg:p-3 w-[81%] md:w-[85%] lg:w-[95%] rounded-[20px] place-items-center mb-10'>

                    <form onSubmit={handleSubmit} className='p-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:gap-x-14 place-items-center'>

                    <div className="mb-20 justify-center lg:translate-x-[-104%] lg:mt-10">
                        <label htmlFor="teacherName" className="text-white text-1xl md:text-2xl lg:text-3xl">Teacher's Name</label>
                        <select id="teacherName" name="teacherName" className="bg-gray-800 rounded-lg p-3 md:p-4 lg:p-5 text-1xl md:text-2xl lg:text-3xl mt-3 md:mt-4 lg:mt-5
                         text-white w-[100%] md:w-[100%] lg:w-[307%] outline-none">
                            <option value="">Select Teacher</option>
                            {teachers && teachers.map((teacher) => (
                                <option key={teacher._id} value={teacher._id}>{teacher.fullname}</option>
                            ))}
                        </select>
                    </div>

                        {/* Render questions dynamically */}
                        {questions.map((question, index) => (
                            <div key={index} className="mb-8 w-full">
                                <label htmlFor={`answer-${index}`} className="text-white text-1xl md:text-2xl lg:text-3xl">{question}</label>
                                <input
                                    type="text"
                                    id={`answer-${index}`}
                                    name={`answer-${index}`}
                                    value={answers[index]}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className="bg-gray-800 rounded-lg p-3 md:p-4 lg:p-5 text-1xl md:text-2xl lg:text-3xl mt-3 md:mt-4 lg:mt-5 text-white w-full outline-none"
                                />
                            </div>
                        ))}

                        <div className="mb-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 place-items-center lg:place-items-center mt-[3%] md:mt-[4%] lg:mt-[5%]">
                            <Link to="/evaluate" className="text-white text-center bg-gray-600 hover:shadow-lg hover:shadow-black hover:bg-gray-900 transition-transform duration-300 transform hover:scale-105 
                            rounded-[50px] p-3 md:p-4 lg:p-5 text-1xl md:text-2xl lg:text-3xl w-[120%] md:w-[150%] lg:w-[170%] translate-x-[-25%]
                            md:translate-x-[-25%] lg:translate-x-[-40%] whitespace-nowrap">Go Back</Link>
                            <button type="submit" className="text-white bg-gray-600 hover:shadow-lg hover:shadow-black hover:bg-gray-900 transition-transform duration-300 transform hover:scale-105 
                            rounded-[50px] p-3 md:p-4 lg:p-5 text-1xl md:text-2xl lg:text-3xl w-[120%] md:w-[150%] lg:w-[170%] translate-x-[25%]
                            md:translate-x-[25%] lg:translate-x-[40%]">Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Form;
