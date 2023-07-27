
module.exports = (app) => {
    const users = require('../controllers/user.controller');
  
    let router = require('express').Router();
  
    router.post('/', users.createUser);
    router.post('/login', users.loginUser);
  
    router.get('/', users.getUsers); // New route for getting all users
    router.delete('/:id', users.deleteUser); // New route for deleting a user
    router.put('/:id', users.editUser); // New route for editing a user
  
    app.use('/api/users', router);
  };
  

    // router.post('/',authMiddleware,users.create);

    // router.get('/', users.findAll)
    // router.get('/:id',users.findOne )

    // router.put('/:id', users.update)

    // router.delete('/',users.deleteAll )
    // router.delete('/:id', users.deleteOne)