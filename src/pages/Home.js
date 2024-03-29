import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatDateTime } from "../utils/Helpers";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/all', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        console.log(response.data[0].roles[0].name)
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  // const deleteUser = async (id) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:8080/api/users/users/delete/${id}`);
  //     console.log(response);
  //     setUsers(users.filter((user) => user.id !== id));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const deleteUser = async (id) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:8080/api/users/users/delete/${id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //         windows: 'true',
  //       },
  //     });
  //     console.log(response.data)
  //     setUsers(response.data);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // }

  const deleteUser = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("accessToken " +accessToken);
    try {
      const response = await axios.delete(`http://localhost:8080/api/users/users/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          windows: 'true',
        },
      });
      console.log(response.data);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };
  


  if (error) {
    return <div>{`Error: ${error} `}</div>;
  }

  return (
    <div className='container'>
        <h3>To Delete A User You Must Be An Admin</h3>
      <div className='py-4'>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope='col'>S.N</th>
              <th scope='col'>Full Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Username</th>
              <th scope='col'>Joined On</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope='row'>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{formatDateTime(user.createdAt)}</td>
                <td>
                  <Link className='btn btn-primary mx-2' to={`/viewuser/${user.id}`}>
                    View
                  </Link>
                  <Link className='btn btn-outline-primary mx-2' to={`/edituser/${user.id}`}>
                    Edit
                  </Link>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}





