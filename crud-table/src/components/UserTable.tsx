import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TUser, TUserFormData } from '../types/User';
import { validateEmail } from '../utils/validations';
import UserAddEditModal from './UserAddEditModal';
import UserDeleteModal from './UserDeleteModal';
import { initialUsers } from '../datas/users';
import Pagination from './Pagination';

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<TUser | null>(null);
  const [formData, setFormData] = useState<TUserFormData>({
    name: '',
    email: '',
    age: '',
    isActive: false,
  });
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<keyof TUser | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowModal = (user: TUser | null = null) => {
    setCurrentUser(user);
    setFormData({
      name: user ? user.name : '',
      email: user ? user.email : '',
      age: user ? user.age : '',
      isActive: user ? user.isActive : false,
    });
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleShowDeleteModal = (user: TUser) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentUser(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

  
    if (name === 'name') {
      if (!!value) setNameError(null);
    }

    if (name === 'email') {
      console.log(value)
      if (!validateEmail(value)) {
        setEmailError('Invalid email format');
      } else if (!!value) {
        setEmailError(null);
      } else {
        setEmailError(null);
      }
    }

    if (name === 'age') {
      if (!!value) setAgeError(null);
    }
  
    setFormData({
      ...formData,
      [name]: name === 'age' ? Number(value) || '' : value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isActive: e.target.checked });
  };

  const handleAddOrEditUser = () => {
    let messages = "";
    if (!formData.name) {
      setNameError('Name is required!')
      messages += 'Name is required! ';
    } else {
      setNameError('');
    }
    if (!formData.email) {
      setEmailError('Email is required!')
      messages += 'Email is required! ';
    } else {
      setEmailError('');
    }
    if (!formData.age) {
      setAgeError('Age is required!')
      messages += 'Age is required! ';
    }else {
      setAgeError('');
    }
    if (emailError) {
      messages += emailError;
    }
    if (!!messages) return alert(messages);

    if (currentUser) {
      // Update user
      const updatedUsers = users.map(user => (user.id === currentUser.id ? { ...user, ...formData, age: Number(formData.age) } : user));
      setUsers(updatedUsers);
      localStorage.setItem('dlabUsers', JSON.stringify(updatedUsers));
    } else {
      // Add new user
      const newUser: TUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
        isActive: formData.isActive,
      };
      setUsers([...users, newUser]);
      localStorage.setItem('dlabUsers', JSON.stringify([...users, newUser]));
    }
    handleHideModal();
  };

  const handleDeleteUser = () => {
    const updatedUsers = users.filter(user => user.id !== currentUser?.id);
    setUsers(updatedUsers);
    localStorage.setItem('dlabUsers', JSON.stringify(updatedUsers));
    handleHideDeleteModal();
  };

  const handleSort = (key: keyof TUser) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (key === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (key === 'age') {
        return a.age - b.age;
      }
      if (key === 'isActive') {
        return Number(b.isActive) - Number(a.isActive);
      }
      return 0;
    });
    setUsers(sortedUsers);
    setSortKey(key);
  };

  const handleFilter = (status: 'all' | 'active' | 'inactive') => {
    setFilterStatus(status);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      // Check if users are already in local storage
      const storedUsers = localStorage.getItem('dlabUsers');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        // Fetch from API if not in local storage
        try {
          // API bellow doesn't match with the requirement to fill name, email, and age
          // const response = await fetch('https://api.github.com/users');
          // const data: initialUsers[] = await response.json();
          setUsers(initialUsers);
          localStorage.setItem('dlabUsers', JSON.stringify(initialUsers));
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    if (filterStatus === 'active') return user.isActive;
    if (filterStatus === 'inactive') return !user.isActive;
    return true;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="container mt-4">
      <h1>User Data Table</h1>
      <div className='my-2'>
        <button className="btn btn-primary" onClick={() => handleSort('name')}>Sort by Name</button>
        <button className="btn btn-primary ms-2" onClick={() => handleSort('age')}>Sort by Age</button>
        <button className="btn btn-primary ms-2" onClick={() => handleSort('isActive')}>Sort by Membership Status</button>
      </div>
      
      <div className='my-2'>
        <label className='me-2'>Filter by Status:</label>
        <select onChange={(e) => handleFilter(e.target.value as 'all' | 'active' | 'inactive')}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button className="btn btn-primary mb-3 className='my-2'" onClick={() => handleShowModal()}>
        Add User
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Membership Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>{user.isActive ? 'Active' : 'Inactive'}</td>
            <td>
              <button className="btn btn-info me-2" onClick={() => handleShowModal(user)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleShowDeleteModal(user)}>
                Delete
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Add/Edit User Modal */}
      <UserAddEditModal 
        show={showModal}
        currentUser={currentUser}
        handleHideModal={handleHideModal}
        formData={formData}
        handleInputChange={handleInputChange}
        nameError={nameError}
        emailError={emailError}
        ageError={ageError}
        handleCheckboxChange={handleCheckboxChange}
        handleAddOrEditUser={handleAddOrEditUser}
      />

      {/* Delete Confirmation Modal */}
      <UserDeleteModal
        show={showDeleteModal}
        currentUser={currentUser}
        handleHideDeleteModal={handleHideDeleteModal}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default UserTable;
