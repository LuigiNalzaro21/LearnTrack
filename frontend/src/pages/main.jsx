import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Main = () => {
    const [teacherCount, setTeacherCount] = useState(0);
    const [evaluatedTeacherCount, setEvaluatedTeacherCount] = useState(0);
    const [studentCount, setStudentCount] = useState(0);
    const [participatingStudentsCount, setParticipatingStudentsCount] = useState(0);

    useEffect(() => {
        fetchTeacherCount();
        fetchStudentCount();
        fetchEvaluationData();
    }, []);

    const fetchTeacherCount = async () => {
        try {
            const response = await axios.get('http://localhost:4000/teachers/count');
            setTeacherCount(response.data.count);
        } catch (error) {
            console.error('Error fetching teacher count:', error);
        }
    };

    const fetchStudentCount = async () => {
        try {
            const response = await axios.get('http://localhost:4000/students/count');
            setStudentCount(response.data.count);
        } catch (error) {
            console.error('Error fetching student count:', error);
        }
    };

    const fetchEvaluationData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/evaluations');
            const evaluations = response.data.evaluations;
            const evaluatedTeachers = evaluations.map(evaluation => evaluation.fullname);
            const uniqueEvaluatedTeachers = [...new Set(evaluatedTeachers)]; // Remove duplicates
            setEvaluatedTeacherCount(uniqueEvaluatedTeachers.length);

            // Count the number of participating students
            let totalParticipatingStudents = 0;
            evaluations.forEach(evaluation => {
                totalParticipatingStudents += evaluation.questionsAndAnswers.length;
            });
            setParticipatingStudentsCount(totalParticipatingStudents);
        } catch (error) {
            console.error('Error fetching evaluation data:', error);
        }
    };

  return (
    <div className='bg-gray-900 h-[110vh] md:h-[148vh] lg:h-[100vh] w-full'>
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

      <div className='buttons grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 place-items-center mt-2'>
        <button className='text-white text-1xl md:text-2xl lg:text-3xl bg-gray-950 shadow-black shadow-lg
         transition-transform duration-300 transform scale-105 p-4 md:p-6 lg:p-8 w-[70%] md:w-[60%] lg:w-[55%] rounded-[10px]
         translate-x-[5%] md:translate-x-[20%] lg:translate-x-[25%]'>Dashboard<i className="fas fa-chart-bar text-white text-1xl md:text-2xl lg:text-3xl ml-5 md:ml-5 lg:ml-5
         whitespace-nowrap" title='Dashboard'></i></button>
          <Link to="/add" className='text-white text-1xl md:text-2xl lg:text-3xl bg-gray-700 hover:bg-gray-950 hover:shadow-black hover:shadow-lg text-center
          transition-transform duration-300 transform hover:scale-105 p-4 md:p-6 lg:p-8 w-[70%] md:w-[60%] lg:w-[55%] rounded-[10px]
         translate-x-[-5%] md:translate-x-[-20%] lg:translate-x-[-25%]'>Teacher<i className="fas fa-chalkboard-teacher text-white text-1xl md:text-2xl lg:text-3xl ml-5 md:ml-5 lg:ml-5
         whitespace-nowrap text-balance" title='Evaluate'></i></Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 place-items-center gap-y-6 md:gap-y-16 lg:gap-y-20 mt-12 md:mt-14 lg:mt-12'>

        <div className='bg-gray-800 p-12 md:p-16 lg:p-20 rounded-[10px] w-[70%] h-auto hover:bg-gray-950 hover:shadow-black hover:shadow-lg cursor-pointer
         transition-transform duration-300 transform hover:scale-105 translate-x-0 md:translate-x-0 lg:translate-x-[2%]'>
          <h1 className='text-white text-1xl md:text-2xl lg:text-2xl text-center whitespace-nowrap text-balance mb-5'>No. of Teachers</h1>
          <h2 className='text-white text-1xl md:text-2xl lg:text-3xl text-center whitespace-nowrap'>{teacherCount}</h2>
        </div>

        <div className='bg-gray-800 p-12 md:p-16 lg:p-20 rounded-[10px] w-[70%] h-auto hover:bg-gray-950 hover:shadow-black hover:shadow-lg cursor-pointer
         transition-transform duration-300 transform hover:scale-105 translate-x-0 md:translate-x-0 lg:translate-x-[-2%]'>
          <h1 className='text-white text-1xl md:text-2xl lg:text-2xl text-center whitespace-nowrap text-balance mb-5'>No. of Evaluated Teachers</h1>
          <h2 className='text-white text-1xl md:text-2xl lg:text-3xl text-center whitespace-nowrap'>{evaluatedTeacherCount}</h2>
        </div>

        <div className='bg-gray-800 p-12 md:p-16 lg:p-20 rounded-[10px] w-[70%] h-auto hover:bg-gray-950 hover:shadow-black hover:shadow-lg cursor-pointer
         transition-transform duration-300 transform hover:scale-105 translate-x-0 md:translate-x-0 lg:translate-x-[2%]'>
          <h1 className='text-white text-1xl md:text-2xl lg:text-2xl text-center whitespace-nowrap text-balance mb-5'>No. of Students</h1>
          <h2 className='text-white text-1xl md:text-2xl lg:text-3xl text-center whitespace-nowrap'>{studentCount}</h2>
        </div>

        <div className='bg-gray-800 p-12 md:p-16 lg:p-20 rounded-[10px] w-[70%] h-auto hover:bg-gray-950 hover:shadow-black hover:shadow-lg cursor-pointer
         transition-transform duration-300 transform hover:scale-105 translate-x-0 md:translate-x-0 lg:translate-x-[-2%]'>
          <h1 className='text-white text-1xl md:text-2xl lg:text-2xl text-center whitespace-nowrap text-balance mb-5'>No. of students who participated</h1>
          <h2 className='text-white text-1xl md:text-2xl lg:text-3xl text-center whitespace-nowrap'>{evaluatedTeacherCount}</h2>
        </div>
        
      </div>

    </div>
  );
}

export default Main;
