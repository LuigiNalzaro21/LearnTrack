import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const View2 = () => {
    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
        fetchEvaluations();
    }, []);

    const fetchEvaluations = async () => {
        try {
            const response = await axios.get('http://localhost:4000/evaluations');
            if (response.data.success) {
                setEvaluations(response.data.evaluations);
            } else {
                console.error('Failed to fetch evaluations data');
            }
        } catch (error) {
            console.error('Error fetching evaluations:', error);
        }
    };

    return (
        <div className='bg-gray-900 h-[100vh] pb-5'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

            {/* Header */}
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

            <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 m-8 md:m-16 lg:m-16 place-items-center gap-x-10 md:gap-x-5 lg:gap-x-0 bg-gray-600 mt-[1%] md:mt-0 lg:mt-0
             p-3 md:p-4 lg:p-5 rounded-[20px] mb-20 md:mb-4 lg:mb-5'>

                <Link to='/add' className='text-white text-1xl md:text-2xl lg:text-3xl bg-gray-700 w-[130%] md:w-[110%] lg:w-[120%] ml-[40%] md:ml-[10%] lg:ml-[20%] p-3 md:p-4 lg:p-5
                 rounded-[20px] whitespace-nowrap hover:bg-gray-800 text-center'>Create Records</Link>
                <button className='text-white text-1xl md:text-2xl lg:text-3xl bg-gray-800 w-[130%] md:w-[110%] lg:w-[120%] ml-[45%] md:ml-[25%] lg:ml-[70%] p-3 md:p-4 lg:p-5
                 rounded-[20px] whitespace-nowrap'>View Records</button>
                <Link to="/main" className='text-white text-center text-1xl md:text-2xl lg:text-3xl bg-gray-500 p-3 md:p-4 lg:p-5 rounded-[20px] w-[90%] md:w-[80%] lg:w-[50%] whitespace-nowrap 
                hover:bg-gray-800 ml-[10%] md:ml-[10%] lg:ml-[50%]'>Go Back</Link>

            </div>

            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-gray-800 m-8 md:m-16 lg:m-16 rounded-[20px] mt-[15%] md:mt-[4%] lg:mt-[2%] h-[55vh] md:h-[70vh] lg:h-[67vh]'>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-gray-600 m-10 rounded-[20px] overflow-y-scroll">

                <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3'>
                    <Link to="/view" className='text-white text-center text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 rounded-tl-[20px] bg-gray-700 hover:bg-gray-500'>Teacher's Data</Link>
                    <Link to='/sheets' className='text-white text-center text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 bg-gray-700 hover:bg-gray-500'>Questionnaires</Link>
                    <button className='text-white text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 rounded-tr-[20px] bg-gray-900'>Evaluation Results</button>
                </div>
                    
                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 m-6 md:m-8 lg:m-10 place-items-center bg-gray-600 p-3 md:p-4 lg:p-5 rounded-[20px]'>
                    {evaluations.map((evaluation, index) => (
                        <div key={index} className='bg-gray-800 m-2 md:m-3 lg:m-4 p-2 md:p-3 lg:p-4 rounded-[20px] w-[100%] shadow-lg shadow-gray-950'>
                            <h2 className='text-white text-lg md:text-2xl lg:text-3xl font-bold mb-3'>Evaluation #{index + 1}</h2>
                            <p className='text-white text-lg md:text-2xl lg:text-3xl'>Teacher's Name: {evaluation.fullname}</p>
                            <h3 className='text-white text-1xl md:text-lg lg:text-2xl font-bold mt-10 mb-6'>Questions and Answers:</h3>
                            <ul className='text-white'>
                                {evaluation.questionsAndAnswers.map((qa, idx) => (
                                    <li key={idx}>
                                        <p className='mb-1 font-bold text-1xl md:text-lg lg:text-2xl'>{qa.question}</p>
                                        <p className='mb-6 text-lg'>{qa.answer}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                </div>

            </div>

        </div>
    );
}

export default View2;
