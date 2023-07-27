// tutorial.routes.js
module.exports = (app) => {

    const tutorials = require('../controllers/tutorial.controller');

    let router = require('express').Router()
    router.post('/',tutorials.create);
    //Get all, Get 1
    router.get('/', tutorials.findAll)
    router.get('/:id',tutorials.findOne)
    //PUT
    router.put('/:id', tutorials.update)
    //Delete
    router.delete('/',tutorials.deleteAll )
    router.delete('/:id', tutorials.deleteOne)

    app.use('/api/tutorials', router)
}


// entity ---> model
// MVC-R = Model,   View, Controler, Routes
// Model - Db Table
// View- Pages (SPA)
// Controller - Business Logic
// Routes - Address/Endpoint 

// resource group --> RESTful --> CRUD
  // 1. create
  // 2. read
  // 3. update
  // 4. delete

  // HTTP VERBS
  // post *Create
  // get *Read (getOne, getAll)
  // put *Update (put|patch)
  // delete *Deletehtt