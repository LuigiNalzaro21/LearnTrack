import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const [teachers, setTeachers] = useState([]);
  const [editableFields, setEditableFields] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/teachers');
      setTeachers(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/teachers/${id}`);
      setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher._id !== id));
    } catch (error) {
      console.error('Error deleting teacher:', error);
      alert('Failed to delete teacher. Please try again.');
    }
  };

  const handleEdit = (id, field, value) => {
    setEditableFields(prevState => ({
      ...prevState,
      [id]: { ...prevState[id], [field]: value }
    }));
  };

  return (
    <div className='bg-gray-900 h-[100vh] md:h-[100vh] lg:h-auto w-full pb-0 md:pb-1 lg:pb-1'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
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

      <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 m-8 md:m-16 lg:m-16 place-items-center gap-x-10 md:gap-x-5 lg:gap-x-0 mt-[10%] md:mt-[5%] lg:mt-[2%]
        bg-gray-600 p-3 md:p-4 lg:p-5 rounded-[20px] mb-20 md:mb-4 lg:mb-5'>

        <Link to='/add' className='text-white text-1xl md:text-2xl lg:text-3xl bg-gray-700 w-[130%] md:w-[110%] lg:w-[120%] ml-[40%] md:ml-[10%] lg:ml-[20%] p-3 md:p-4 lg:p-5
          rounded-[20px] whitespace-nowrap
          hover:bg-gray-800 text-center'>Create Records</Link>
        <button className='text-white text-1xl md:text-2xl lg:text-3xl bg-gray-800 w-[130%] md:w-[110%] lg:w-[120%] ml-[45%] md:ml-[25%] lg:ml-[70%] p-3 md:p-4 lg:p-5
          rounded-[20px] whitespace-nowrap'>View Records</button>
        <Link to="/main" className='text-white text-center text-1xl md:text-2xl lg:text-3xl bg-gray-500 p-3 md:p-4 lg:p-5 rounded-[20px] w-[90%] md:w-[80%] lg:w-[50%] whitespace-nowrap 
          hover:bg-gray-800 ml-[10%] md:ml-[10%] lg:ml-[50%]'>Go Back</Link>

      </div>

      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-gray-800 m-8 md:m-16 lg:m-16 rounded-[20px] mt-[20%] md:mt-[10%] lg:mt-[3%]'>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 bg-gray-600 m-10 rounded-[20px] overflow-x-auto">

          <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3'>
            <button className='text-white text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 rounded-tl-[20px] bg-gray-900'>Teacher's Data</button>
            <Link to='/sheets' className='text-white text-center text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 bg-gray-700 hover:bg-gray-500'>Questionnaires</Link>
            <Link to='/view2' className='text-white text-center text-1xl md:text-2xl lg:text-3xl p-3 md:p-4 lg:p-5 rounded-tr-[20px] bg-gray-700 hover:bg-gray-500'>Evaluation Results</Link>
          </div>

          <table className="border-collapse border border-gray-600 m-3 md:m-5 lg:m-10">
            <thead>
              <tr className="bg-gray-600 text-white">
                <th className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl whitespace-nowrap">Full Name</th>
                <th className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">Age</th>
                <th className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">Gender</th>
                <th className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">Status</th>
                <th className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">Position</th>
                <th className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">Department</th>
                <th className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">Actions</th>
              </tr>
            </thead>
            <tbody>
            {teachers.map((teacher) => (
                <tr key={teacher._id} className="bg-gray-600 text-white text-center">
                    <td className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">
                    {editableFields[teacher._id] ? (
                        <input
                        type="text"
                        value={editableFields[teacher._id].fullname || teacher.fullname}
                        onChange={(e) => handleEdit(teacher._id, 'fullname', e.target.value)}
                        style={{ color: 'white', width: '80%', borderRadius: '10px', padding: '10px', outline: 'none', backgroundColor: '#111827' }}
                        />
                    ) : (
                        teacher.fullname
                    )}
                    </td>
                    <td className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">
                    {editableFields[teacher._id] ? (
                        <input
                        type="number"
                        value={editableFields[teacher._id].age || teacher.age}
                        onChange={(e) => handleEdit(teacher._id, 'age', e.target.value)}
                        style={{ color: 'white', width: '70%', borderRadius: '10px', padding: '10px', outline: 'none', backgroundColor: '#111827' }}
                        />
                    ) : (
                        teacher.age
                    )}
                    </td>
                    <td className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">
                    {editableFields[teacher._id] ? (
                        <select
                        value={editableFields[teacher._id].gender || teacher.gender}
                        onChange={(e) => handleEdit(teacher._id, 'gender', e.target.value)}
                        style={{ color: 'white', borderRadius: '10px', padding: '10px', outline: 'none', backgroundColor: '#111827' }}
                        >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                        </select>
                    ) : (
                        teacher.gender
                    )}
                    </td>
                    <td className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">
                    {editableFields[teacher._id] ? (
                        <select
                        value={editableFields[teacher._id].status || teacher.status}
                        onChange={(e) => handleEdit(teacher._id, 'status', e.target.value)}
                        style={{ color: 'white', borderRadius: '10px', padding: '10px', outline: 'none', backgroundColor: '#111827' }}
                        >
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widow">Widow</option>
                        </select>
                    ) : (
                        teacher.status
                    )}
                    </td>
                    <td className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">
                    {editableFields[teacher._id] ? (
                        <select
                        value={editableFields[teacher._id].position || teacher.position}
                        onChange={(e) => handleEdit(teacher._id, 'position', e.target.value)}
                        style={{ color: 'white', borderRadius: '10px', padding: '10px', outline: 'none', backgroundColor: '#111827' }}
                        >
                        <option value="Department Head">Department Head</option>
                        <option value="Professor">Professor</option>
                        <option value="Intern">Intern</option>
                        </select>
                    ) : (
                        teacher.position
                    )}
                    </td>
                    <td className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">
                    {editableFields[teacher._id] ? (
                        <select
                        value={editableFields[teacher._id].department || teacher.department}
                        onChange={(e) => handleEdit(teacher._id, 'department', e.target.value)}
                        style={{ color: 'white', borderRadius: '10px', padding: '10px', outline: 'none', backgroundColor: '#111827' }}
                        >
                        <option value="BSIT">BSIT</option>
                        <option value="BSOA">BSOA</option>
                        <option value="BSBA">BSBA</option>
                        <option value="BSEDUC">BSEDUC</option>
                        <option value="BSCRIM">BSCRIM</option>
                        </select>
                    ) : (
                        teacher.department
                    )}
                    </td>
                    <td className="border border-gray-600 p-1 md:p-3 lg:p-5 lg:text-2xl">
                    <div className='flex justify-center gap-x-1 md:gap-x-3 lg:gap-x-5'>
                        <button
                        onClick={() => {
                            if (editableFields[teacher._id]) {
                            // Send update request
                            axios.put(`http://localhost:4000/teachers/${teacher._id}`, editableFields[teacher._id])
                                .then(() => {
                                // Refresh the data after successful update
                                fetchData();
                                // Clear editable fields
                                setEditableFields({});
                                })
                                .catch((error) => {
                                console.error('Error updating teacher:', error);
                                alert('Failed to update teacher. Please try again.');
                                });
                            } else {
                            // Enable edit mode
                            setEditableFields(prevState => ({
                                ...prevState,
                                [teacher._id]: {
                                fullname: teacher.fullname,
                                age: teacher.age,
                                gender: teacher.gender,
                                status: teacher.status,
                                position: teacher.position,
                                department: teacher.department
                                }
                            }));
                            }
                        }}
                        className="bg-gray-800 hover:bg-gray-900 hover:shadow-black hover:shadow-lg transition-transform duration-300 transform hover:scale-105
                        text-white font-bold py-2 p-1 md:p-3 lg:p-5 rounded-[50px] w-32 md:w-36 lg:w-40"
                        >
                        {editableFields[teacher._id] ? 'Save' : 'Update'}
                        </button>
                        <button
                        onClick={() => handleDelete(teacher._id)}
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
  );
}

export default View;
