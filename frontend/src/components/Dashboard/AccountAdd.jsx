import React, { useState, useRef } from 'react';
import { MDBInput, MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button } from 'react-bootstrap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const AccountAdd = () => {
    const [newUser, setNewUser] = useState({
        id: '',
        userEmail: '',
        userPassword: '',
        userType: '',
    });

    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setNewUser((prevUser) => ({
            ...prevUser,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddUser = async () => {
        const user = { ...newUser, id: uuidv4() };

        if (!user.userEmail || !user.userPassword || !user.userType) {
            setError('Please fill in all required fields.');
            return;
        }

        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log('User added to the database successfully.');
                // Optionally, you can fetch the updated list of users from the database here.
                // fetchUsers(); // Uncomment this line if you have a fetchUsers function to update the user list from the database.

                // Reset the input fields
                setNewUser({
                    id: '',
                    userEmail: '',
                    userPassword: '',
                    userType: '',
                });

                // Refresh the page
                window.location.reload();
            } else {
                console.log('Failed to add user to the database.');
            }
        } catch (error) {
            console.log('An error occurred while adding user to the database:', error);
        }
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <>
    
        <Button onClick={handleClickOpen} className="custom-button float-end">
          Add User
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
          <MDBContainer className="d-flex justify-content-center ">
            <div>
                <h2 className='py-3'>Add User</h2>
                <MDBInput
                    label='User Email'
                    id='userEmail'
                    name='userEmail'
                    type='email'
                    value={newUser.userEmail}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <MDBInput
                    label='User Password'
                    id='userPassword'
                    name='userPassword'
                    type='password'
                    value={newUser.userPassword}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <MDBInput
                    label='User Type'
                    id='userType'
                    name='userType'
                    type='text'
                    value={newUser.userType}
                    onChange={handleInputChange}
                    required
                />
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
               
            </div>
        </MDBContainer>
      </DialogContent>
          <DialogActions>
            <Button className="custom-button" onClick={handleAddUser}>Save</Button>
            <Button className="custom-button2" onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </>

       
    );
};

export default AccountAdd;
