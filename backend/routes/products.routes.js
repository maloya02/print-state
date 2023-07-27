// // tutorial.routes.js
// module.exports = (app) => {

//   const products = require('../controllers/product.controller');
//   const authMiddleware = require('../middlewares/auth/user.auth');

//   let router = require('express').Router()

//   // productImage
//   const { upload } = require("../middlewares/multer/upload.middleware");

//   // post productImage
//   router.post("/productImage", upload.single("productImage"), products.updateProducts);


//   router.post("/addProducts", upload.single("productImage"), products.addProducts);

//   router.post('/', products.create);
//   //Get all, Get 1
//   router.get('/', products.findAll)
//   router.get('/:id', products.findOne)
//   //PUT
//   router.put('/:id', products.update)
//   //Delete
//   router.delete('/', products.deleteAll)
//   router.delete('/:id', products.deleteOne)

//   app.use('/api/products', router)
// }


module.exports = (app) => {
  const products = require('../controllers/product.controller');
  const authMiddleware = require('../middlewares/auth/user.auth');
  const { upload } = require("../middlewares/multer/upload.middleware");
  const router = require('express').Router();

  // Create a new product
  router.post('/', products.create);

  // Retrieve all products
  router.get('/', products.findAll);

  // Retrieve a single product by ID
  router.get('/:id', products.findOne);

  // Update a product by ID
  router.put('/:id', upload.single("productImage"),products.update);

  router.put('/addProducts/:id',upload.single("productImage"), products.update);

  // Delete all products (optional, use with caution)
  router.delete('/', products.deleteAll);

  // Delete a product by ID
  router.delete('/:id', products.deleteOne);

  // Add a new product (with image upload)
  router.post("/addProducts", upload.single("productImage"), products.addProducts);

  // Update product image (you can also use PATCH for partial updates)
  router.post("/productImage/:id", upload.single("productImage"), products.updateProducts);

  app.use('/api/products', router);
};



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