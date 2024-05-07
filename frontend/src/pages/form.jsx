import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            // Fetch teachers and questions
            const [teachersResponse, questionsResponse] = await Promise.all([
                axios.get('http://localhost:4000/teachers'),
                axios.get('http://localhost:4000/questions')
            ]);
            if (teachersResponse.data.success && questionsResponse.data.success) {
                setTeachers(teachersResponse.data.data);
                const questionData = questionsResponse.data.questions.map(questionObj => questionObj.question);
                setQuestions(questionData);
                setAnswers(Array(questionData.length).fill(''));
            } else {
                console.error('Failed to fetch data');
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
            const selectedTeacherId = e.target.teacherName.value;
            const selectedTeacher = teachers.find(teacher => teacher._id === selectedTeacherId);
            if (selectedTeacher && selectedTeacher.fullname) {
                const questionsAndAnswers = questions.map((question, index) => ({
                    question: question,
                    answer: answers[index]
                }));
                const response = await axios.post('http://localhost:4000/submit', {
                    teacherName: selectedTeacher.fullname,
                    questionsAndAnswers: questionsAndAnswers,
                });
                if (response.data.success) {
                    setShowModal(true); // Show modal on successful submission
                } else {
                    window.alert('Failed to submit answers. Please try again.');
                }
            } else {
                console.error('Selected teacher or fullname is undefined');
                window.alert('Failed to submit answers. Please select a valid teacher.');
            }
        } catch (error) {
            console.error('Error submitting answers:', error);
            window.alert('Failed to submit answers. Please try again.');
        }
    };
            
    return (
        <div className='bg-gray-900 h-[100vh] w-full overflow-y-hidden'>
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

            <div className='flex justify-center h-[80vh] mt-[-3%] md:mt-[-2%] lg:mt-[-1.5%]'>
                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 overflow-y-scroll overflow-x-hidden bg-gray-700 m-0 p-3 md:p-4 lg:p-3 w-[81%] md:w-[85%] lg:w-[95%] rounded-[20px] place-items-center mb-10'>

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

                        {showModal && (
                                        <div className="fixed inset-0 flex items-center justify-center z-50">
                                            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                                            <div className="relative bg-gray-700 rounded-[20px] p-6 md:p-8 lg:p-10 lg:mt-[-4%]">
                                                <h1 className='text-white text-lg md:text-2xl lg:text-3xl mb-5'>Teacher Evaluation Form</h1>
                                                <hr className='mb-4 md:mb-6 lg:mb-8'></hr>
                                                <h2 className="text-white text-1xl md:text-lg lg:text-2xl mb-6 md:mb-8 lg:mb-10">Your response has been saved successfully</h2>
                                                <div className="flex justify-center gap-x-10">
                                                    <button onClick={() => setShowModal(false)} className="bg-gray-800 hover:shadow-lg hover:shadow-black
                                                     hover:bg-gray-900 transition-transform duration-300 transform hover:scale-105 text-white text-center font-bold 
                                                    p-3 md:p-4 lg:p-5 rounded-[50px] w-[50%]">
                                                        Submit a new form
                                                    </button>
                                                    <Link to="/evaluate" className="bg-gray-800 hover:shadow-lg hover:shadow-black hover:bg-gray-900
                                                     transition-transform duration-300 transform hover:scale-105 text-white text-center font-bold 
                                                    p-3 md:p-4 lg:p-5 rounded-[50px] w-[50%]">
                                                        Go Back
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}

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

