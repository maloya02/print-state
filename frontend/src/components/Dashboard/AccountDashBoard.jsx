import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Modal, Button } from 'react-bootstrap';
import EditProductModal from './EditProductModal';
import { MDBIcon } from 'mdbreact';
import AccountAdd from './AccountAdd';


const AccountDashBoard = () => {
  const [apiUsers, setApiUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [editModalData, setEditModalData] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users');
      const data = await response.json();
      console.log('Fetched users:', data); // Add this line to check the fetched data
      setApiUsers(data.users); // Assuming the response contains an object with 'users' property as the array of users
    } catch (error) {
      console.log('An error occurred while fetching users:', error);
    }
  };


  const handleDeleteUser = async (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const confirmDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${selectedUserId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('User deleted successfully.');
        setApiUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUserId));
      } else {
        console.log('Failed to delete user.');
      }
    } catch (error) {
      console.log('An error occurred while deleting user:', error);
    }

    setShowModal(false);
    // Refresh the user list after deletion
    fetchUsers();
  };

  const handleEditUser = async (userId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log('User updated successfully.');
        // After successful update, refresh the user list
        fetchUsers();
      } else {
        console.log('Failed to update user.');
      }
    } catch (error) {
      console.log('An error occurred while updating user:', error);
    }
  };

  const handleEditIconClick = (userId) => {
    // Find the selected user in apiUsers array
    const selectedUser = apiUsers.find((user) => user.id === userId);

    if (selectedUser) {
      // Set the selected user data to editModalData state
      setEditModalData(selectedUser);
      // Show the modal
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (editModalData) {
      // Make the PUT request when editModalData is not null
      handleEditUser(editModalData.id, editModalData.updatedData)
        .then(() => {
          // Close the modal after saving
          setShowModal(false);
          // Clear the modal data
          setEditModalData(null);
        })
        .catch((error) => {
          console.log('An error occurred while updating user:', error);
        });
    }
  }, [editModalData]);

  const handleSaveUser = async (updatedData) => {
    // Update the user data
    await handleEditUser(editModalData.id, updatedData);
    // Close the modal after saving
    setShowModal(false);
    // Clear the modal data
    setEditModalData(null);
  };

  const handleCancelEdit = () => {
    // Clear the modal data and close the modal
    setEditModalData(null);
    setShowModal(false);
  };

  const data = {
    columns: [
      {
        label: 'User Email',
        field: 'userEmail',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'User Password',
        field: 'userPassword',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Edit',
        field: 'edit',
        sort: 'disabled',
        width: 50,
        content: (row) => (
          <MDBIcon
            far
            icon="edit"
            onClick={() => handleEditUser(row.id, { userEmail: 'updatedemail@example.com', userPassword: 'updatedpassword' })}
            style={{ cursor: 'pointer' }}
          />
        ),
      },
      {
        label: 'Delete',
        field: 'delete',
        sort: 'disabled',
        width: 50,
        content: (row) => (
          <DeleteOutlineIcon far icon="trash-alt" onClick={() => handleDeleteUser(row.id)} style={{ cursor: 'pointer' }} />
        ),
      },
    ],
    rows: apiUsers.map((user) => ({
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      id: user.id,
      edit: <Button className='custom-button' onClick={() => handleEditUser(user.id, { userEmail: 'updatedemail@example.com', userPassword: 'updatedpassword' })} >Edit </Button>,
      delete: <Button className='custom-button2' onClick={() => handleDeleteUser(user.id)} >Delete </Button>,
    }))
  };

  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <AccountAdd/>
        <MDBDataTable
          responsive  // Set responsive to true for better handling on smaller screens
          striped
          bordered
          small
          data={data}
          // Optionally, you can set custom styles for the MDBDataTable component to make it fit your needs
          style={{
            width: '100%', // Set a specific width if needed
            overflowX: 'hidden', // Hide horizontal scrollbar
          }}
        />
      </div>

      {/* Modal for confirmation */}
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button className='custom-button' onClick={confirmDeleteUser}>
            Yes
          </Button>
          <Button className='custom-button2' onClick={() => setShowModal(false)}>
            No
          </Button>
        
        </Modal.Footer>
      </Modal>

      {/* Modal for editing */}
      {editModalData && (
        <EditProductModal show={showModal} productData={editModalData} onSave={handleSaveUser} onCancel={handleCancelEdit} />
      )}
    </div>
  );
};

export default AccountDashBoard;
