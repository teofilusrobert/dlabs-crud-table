import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TUser, TUserFormData } from '../types/User';

type UserAddEditModalProps = {
  show: boolean;
  currentUser: TUser | null;
  handleHideModal: () => void;
  formData: TUserFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameError: string | null;
  emailError: string | null;
  ageError: string | null;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddOrEditUser: () => void;
};

const UserAddEditModal: React.FC<UserAddEditModalProps> = ({
  show, 
  currentUser, 
  handleHideModal, 
  formData, 
  handleInputChange, 
  nameError,
  emailError,
  ageError,
  handleCheckboxChange,
  handleAddOrEditUser,
}) => {

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
                {nameError && <small className="text-danger">{nameError}</small>}
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
                {ageError && <small className="text-danger">{ageError}</small>}
              </div>
              <div className="form-check">
                <input
                  id="status"
                  type="checkbox"
                  className="form-check-input cursor"
                  checked={formData.isActive}
                  onChange={handleCheckboxChange}
                  role='button'
                />
                <label role='button' htmlFor="status" className="form-check-label cursor">Active Member</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleHideModal}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleAddOrEditUser}>
              {currentUser ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddEditModal;
