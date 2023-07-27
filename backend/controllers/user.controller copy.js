// server --> app --> API
// routes
//---------------------
// controller
// model
// db -> table
// module.exports = (app) => {}; ==> bulk/all exporting
// exports.<func> = () = > {} ==> tingitingi
const db = require('../models/index');
const User = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//create
exports.create = async (req, res) => {//http://localhost:8000/api/users/
  // res.send('POST request Received.')
  if (!req.body.userEmail || !req.body.userPassword) {
    res.status(400).send({
      message: `userEmail or Description cannot be empty.`,
      success: false,
      errorCode: `ERR9001`
    });
    return;
  }


  try {
    const existingUser = await users.findOne({ where: { userEmail } });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = {
      userEmail,
      userPassword: hashedPassword
    };

    const createdUser = await users.create(newUser);

    res.status(200).send({
      success: true,
      message: 'Data saved successfully',
      data: createdUser
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Saving of data failed. Error: ${error}`,
      errorCode: 'ERROR700'
    });
  }
};
// Login/Reg



// create object in memory
const { userEmail, userPassword } = req.body;
const users = {
  userEmail, userPassword
};

// save to db
User.create(users)
  .then(data => {
    res.status(200).send({
      success: true,
      message: 'User saved successfully.',
      data: data
    });
  })
  .catch(error => {
    res.status(500).send({
      success: false,
      message: `Saving of User data failed. Error: ${error}`,
      errorCode: `ERR8001`,
    })
  });



exports.loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    // Find the user by email
    const user = await users.findOne({ where: { userEmail } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid userPassword' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, userEmail: user.userEmail },
      config.secretKey
    );

    // Return the token as part of the response
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//get all
exports.findAll = (req, res) => {//http://localhost:8000/api/users/
  // res.send('Get ALL req received')
  // find and respond
  User.findAll()
    .then(data => {
      res.status(200).send({
        success: true,
        data: data
      });
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: `Cannot retrieve users records. Error: ${error}`,
        errorCode: `ERR8002`,
      })
    });
};
//get 1
exports.findOne = (req, res) => {//http://localhost:8000/api/users/{id}
  // res.send('Get ONE req received')
  // find and respond
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send({
          success: true,
          data: data
        });
      } else {
        res.status(400).send({
          success: false,
          message: `Cannot find users data with id = ${id}`,
          errorCode: `ERR7001`
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: `Cannot retrieve users record. Error: ${error}`,
        errorCode: `ERR8003`,
      })
    });

};
//update
exports.update = (req, res) => {//http://localhost:8000/api/users/{id}
  // res.send('Update ONE req received')
  // validate
  if (!req.body.userEmail || !req.body.userPassword) {
    res.status(400).send({
      message: `userEmail and/or Description cannot be empty during an update.`,
      success: false,
      errorCode: `ERR9002`
    });
    return;
  }

  // get id
  const id = req.params.id;

  // construct object
  const { userEmail, userPassword, } = req.body;
  const users = {
    userEmail, userPassword,
  };

  // save to db
  User.update(users, { where: { id: id } })
    .then(num => {
      if (num && num[0] && num >= 1) {
        res.status(200).send({
          success: true,
          message: 'User updated successfully.',
          data: {
            id: id,
            recordsAffected: num && num[0] ? num[0] : 1
          }
        });
      } else {
        res.status(400).send({
          success: false,
          message: `Cannot find users data with id = ${id}, update data ignored.`,
          errorCode: `ERR7002`
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: `Cannot perform update at the moment. Error: ${error}`,
        errorCode: `ERR8004`,
      })
    });
};
