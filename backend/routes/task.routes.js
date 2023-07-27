const { isAuth } = require('../middlewares/auth/auth.middleware');
const { upload } = require('../middlewares/multer/upload.middleware');

// task.routes.js
module.exports = (app) => {
  const tasks = require('../controllers/task.controller');

  let router = require('express').Router();

  // create new task
  router.post('/', tasks.create);

  // retrieve all tasks
  router.get('/', tasks.findAll);

  // retrive all available priorities
  router.get('/priorities', tasks.getAllPriorities);

  // retrive one task via id
  router.get('/:id', tasks.findOne);

  // update one task
  router.put('/:id', tasks.update);

  // delete all tasks
  router.delete('/', isAuth, tasks.deleteAll);

  // delete one task via id
  router.delete('/:id', isAuth, tasks.deleteOne);

  // upload an avatar image
  router.post('/:id/avatar', upload.single('avatar'), tasks.updateAvatar);

  // use the router
  app.use('/api/tasks', router);

};