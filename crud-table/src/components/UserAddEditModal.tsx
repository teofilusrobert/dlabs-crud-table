import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TUser, TUserFormData } from '../types/User';

type UserAddEditModalProps = {
  show: boolean;
  currentUser: TUser | null;
  handleHideModal: () => void;
  formData: TUserFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailError: string | null;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddOrEditUser: () => void;
};

const UserAddEditModal: React.FC<UserAddEditModalProps> = ({
  show, 
  currentUser, 
  handleHideModal, 
  formData, 
  handleInputChange, 
  emailError,
  handleCheckboxChange,
  handleAddOrEditUser,
}) => {
  const [nameEmptyError, setNameEmptyError] = useState<string | null>(null);
  const [emailEmptyError, setEmailEmptyError] = useState<string | null>(null);
  const [ageEmptyError, setAgeEmptyError] = useState<string | null>(null);

  const handleSubmit = () => {
    let messages = "";
    if (!formData.name) {
      setNameEmptyError('Name is required!')
      messages += 'Name is required! ';
    } else {
      setNameEmptyError('');
    }
    if (!formData.email) {
      setEmailEmptyError('Email is required!')
      messages += 'Email is required! ';
    } else {
      setEmailEmptyError('');
    }
    if (!formData.age) {
      setAgeEmptyError('Age is required!')
      messages += 'Age is required! ';
    }else {
      setAgeEmptyError('');
    }
    if (emailError) {
      messages += emailError;
    }
    if (!!messages) return alert(messages);
    handleAddOrEditUser();
  }

  return (
    <div className={`modal show ${show ? 'd-block' : 'd-none'}`} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{currentUser ? 'Edit User' : 'Add User'}</h5>
            <button type="button" className="btn-close" onClick={handleHideModal}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {nameEmptyError && <small className="text-danger">{nameEmptyError}</small>}
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {emailError && <small className="text-danger">{emailError}</small>}
                {!emailError && emailEmptyError && <small className="text-danger">{emailEmptyError}</small>}
              </div>
              <div className="mb-3">
                <label>Age</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
                {ageEmptyError && <small className="text-danger">{ageEmptyError}</small>}
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={formData.isActive}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label">Active Member</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleHideModal}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {currentUser ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddEditModal;
