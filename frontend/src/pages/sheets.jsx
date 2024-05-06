import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sheets = () => {
    const [questions, setQuestions] = useState([]);
    const [editableFields, setEditableFields] = useState({});

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/questions');
            if (response.data.success) {
                const { questions } = response.data;
                setQuestions(questions);
                // Initialize editableFields only when questions are fetched
                const initialEditableFields = {};
                questions.forEach(question => {
                    initialEditableFields[question._id] = false;
                });
                setEditableFields(initialEditableFields);
            } else {
                console.error('Failed to fetch questionnaire data');
            }
        } catch (error) {
            console.error('Error fetching questionnaire data:', error);
        }
    };    

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/questions/${id}`);
            setQuestions(prevQuestions => prevQuestions.filter(question => question._id !== id));
        } catch (error) {
            console.error('Error deleting question:', error);
            alert('Failed to delete question. Please try again.');
        }
    };

    const handleEdit = async (id, newQuestion) => {
        try {
            await axios.put(`http://localhost:4000/questions/${id}`, { question: newQuestion });
            setQuestions(prevQuestions => prevQuestions.map(question => {
                if (question._id === id) {
                    return { ...question, question: newQuestion };
                }
                return question;
            }));
            // Update editableFields after successful edit
            setEditableFields(prevState => ({
                ...prevState,
                [id]: newQuestion
            }));
        } catch (error) {
            console.error('Error updating question:', error);
            alert('Failed to update question. Please try again.');
        }
    };
    
    const toggleEdit = (id) => {
        setEditableFields(prevState => ({
            ...prevState,
            [id]: prevState[id] ? false : questions.find(question => question._id === id).question
        }));
    };

    const handleChange = (id, value) => {
        setEditableFields(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
        
    return (
        <div className='bg-gray-900 h-[100vh] md:h-[100vh] lg:h-auto w-full pb-0 md:pb-1 lg:pb-1'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2'>
                <div className='Title justify-start'>
                    <h1 className='text-white text-2xl md:text-3xl lg:text-4xl p-10 ml-2'>LearnTrack</h1>
                </div>

                <div className='flex justify-end'>
                    <h1 className='text-white text-2xl md:text-3xl lg:text-4xl p-10 md:p-10 lg:p-10 translate-x-14 md:translate-x-10 lg:translate-x-10 whitespace-nowrap'>Welcome, Admin</h1>
                    <Link to="/"><i className="fas fa-sign-out-alt text-white text-2xl md:text-4xl lg:text-4xl p-10 md:p-10 lg:p-10 pt-[47px] md:pt-[45px] lg:pt-[45px] whitespace-nowrap" title='Signout'></i></Link>
                </div>
            </div>

            <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 m-8 md:m-16 lg:m-16 place-items-center gap-x-10 md:gap-x-5 lg:gap-x-0 mt-[10%] md:mt-[5%] lg:mt-[2%] bg-gray-600 p-3 md:p-4 lg:p-5 rounded-[20px] mb-20 md:mb-4 lg:mb-5'>
                <Link to='/add' className='text-white text-1xl md:text-2xl lg:text-3xl bg-gray-700 w-[130%] md:w-[110%] lg:w-[120%] ml-[40%] md:ml-[10%] lg:ml-[20%] p-3 md:p-4 lg:p-5 rounded-[20px] whitespace-nowrap hover:bg-gray-800 text-center'>Create Records</Link>
                <button className='text-white text-1xl md:text-2xl lg:text-3xl bg-gray-800 w-[130%] md:w-[110%] lg:w-[120%] ml-[45%] md:ml-[25%] lg:ml-[70%] p-3 md:p-4 lg:p-5 rounded-[20px] whitespace-nowrap'>View Records</button>
                <Link to="/main" className='text-white text-center text-1xl md:text-2xl lg:text-3xl bg-gray-500 p-3 md:p-4 lg:p-5 rounded-[20px] w-[90%] md:w-[80%] lg:w-[50%] whitespace-nowrap hover:bg-gray-800 ml-[10%] md:ml-[10%] lg:ml-[50%]'>Go Back</Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-gray-800 m-8 md:m-16 lg:m-16 rounded-[20px] mt-[20%] md:mt-[10%] lg:mt-[3%]'>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-gray-600 m-10 rounded-[20px] overflow-x-auto">
                    <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3'>
                        <Link to='/view' className='text-white text-center text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 rounded-tl-[20px] bg-gray-700 hover:bg-gray-500'>Teacher's Data</Link>
                        <button className='text-white text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 bg-gray-900'>Questionnaires</button>
                        <Link to='/view2' className='text-white text-center text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 rounded-tr-[20px] bg-gray-700 hover:bg-gray-500'>Evaluation Results</Link>
                    </div>
                
                <div className='flex justify center'>

                    <table className="border-collapse border border-gray-600 m-3 md:m-5 lg:m-10 w-full">
                        <thead>
                            <tr className="bg-gray-600 text-white text-center">
                                <th className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl whitespace-nowrap">Questions</th>
                                <th className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question, index) => (
                                <tr key={index} className="bg-gray-600 text-white text-start">
                                    <td className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">
                                    {editableFields[question._id] ? (
                                        <input
                                            type="text"
                                            value={editableFields[question._id]}
                                            onChange={(e) => handleChange(question._id, e.target.value)}
                                            onBlur={() => handleEdit(question._id, editableFields[question._id])}
                                            className="bg-gray-700 text-white p-2 rounded w-full outline-none"
                                        />
                                    ) : (
                                        question.question
                                    )}
                                    </td>
                                    <td className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">
                                        <div className='flex justify-center gap-x-1 md:gap-x-3 lg:gap-x-5'>
                                            <button
                                                onClick={() => toggleEdit(question._id)}
                                                className="bg-gray-800 hover:bg-gray-900 hover:shadow-black hover:shadow-lg transition-transform duration-300 transform hover:scale-105
                                                text-white font-bold py-2 p-1 md:p-3 lg:p-5 rounded-[50px] w-32 md:w-36 lg:w-40"
                                            >
                                                {editableFields[question._id] ? 'Save' : 'Edit'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(question._id)}
                                                className="bg-gray-800 hover:bg-gray-900 hover:shadow-black hover:shadow-lg transition-transform duration-300 transform hover:scale-105
                                                text-white font-bold py-2 p-1 md:p-3 lg:p-5 rounded-[50px] w-32 md:w-36 lg:w-40"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

                </div>
            </div>
        </div>
    );
}

export default Sheets;
