import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TUser, TUserFormData } from '../types/User';

type UserDeleteModalProps = {
  show: boolean;
  currentUser: TUser | null;
  handleHideDeleteModal: () => void;
  handleDeleteUser: () => void;
};

const UserDeleteModal: React.FC<UserDeleteModalProps> = ({
  show, 
  currentUser, 
  handleHideDeleteModal, 
  handleDeleteUser, 
}) => {
  return (
    <div className={`modal show ${show ? 'd-block' : 'd-none'}`} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
            <button type="button" className="btn-close" onClick={handleHideDeleteModal}></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete {currentUser?.name}?
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleHideDeleteModal}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDeleteUser}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteModal;
