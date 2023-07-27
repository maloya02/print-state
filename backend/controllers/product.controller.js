// server --> app --> API
// routes
//---------------------
// controller
// model
// db -> table
// module.exports = (app) => {}; ==> bulk/all exporting
// exports.<func> = () = > {} ==> tingitingi
const db = require('../models/index');
const Product = db.products;
const multer = require('multer')
const path = require('path')

//image multer

exports.addProducts = async (req, res) => {

  let info = {
    productName: req.body.productName ? req.body.productName : 'No productName',
    price: req.body.price ? req.body.price : "No Price",
    productImage: req.file ? req.file.filename : 'Images not found', // Check if req.file exists
    productDescription: req.body.productDescription ? req.body.productDescription : 'No Descriptions',
    productCategory: req.body.productCategory ? req.body.productCategory : 'No Category',
  };



  const product = await Product.create(info)

  res.status(200).send(product)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const mimeType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))


    if (mimeType && extname) {
      return cb(null, true)
    }
    cb('Give proper files formate to upload')
  }
}).single('productImage');


// upload productImage

exports.updateProducts = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(400).send({
        success: false,
        message: "Error uploading the productImage",
        errorCode: "ERR8007",
      });
    }

    // File uploaded successfully
    const productImageUrl = `images/${req.file.filename}`;
    const id = req.params.id;

    Product.update({ productImage: productImageUrl }, { where: { id: id } })
      .then((num) => {
        if (num && num[0] && num[0] >= 1) {
          res.status(200).send({
            success: true,
            message: "productImage updated successfully",
            data: {
              id: id,
              recordsAffected: num[0],
            },
          });
        } else {
          res.status(400).send({
            success: false,
            message: `Cannot find Products data with id = ${id}, update data ignored`,
            errorCode: "ERR7002",
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: `Cannot perform update at the moment. Error: ${error}`,
          errorCode: "ERR8004",
        });
      });
  });
};

//create
exports.create = (req, res) => {
  // Check if the required fields are provided in the request body
  if (!req.body.productName || !req.body.productDescription || !req.body.price || !req.file || !req.body.productCategory) {
    res.status(400).send({
      message: "productName, productDescription, price, productImage, and productCategory are required fields.",
      success: false,
      errorCode: "ERR9001",
    });
    return;
  }

  // create object in memory
  const { productName, productDescription, price, productCategory } = req.body;
  const product = {
    productName,
    productDescription,
    price,
    productImage: `images/${req.file.filename}`,
    productCategory,
  };

  // save to db
  Product.create(product)
    .then((data) => {
      res.status(200).send({
        success: true,
        message: "Product saved successfully.",
        data: data,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: `Saving of Product data failed. Error: ${error}`,
        errorCode: "ERR8001",
      });
    });
};

//get all
exports.findAll = (req, res) => {//http://localhost:8000/api/products/
  // res.send('Get ALL req received')
  // find and respond
  Product.findAll()
    .then(data => {
      res.status(200).send({
        success: true,
        data: data
      });
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: `Cannot retrieve products records. Error: ${error}`,
        errorCode: `ERR8002`,
      })
    });
};
//get 1
exports.findOne = (req, res) => {//http://localhost:8000/api/products/{id}
  // res.send('Get ONE req received')
  // find and respond
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send({
          success: true,
          data: data
        });
      } else {
        res.status(400).send({
          success: false,
          message: `Cannot find products data with id = ${id}`,
          errorCode: `ERR7001`
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: `Cannot retrieve products record. Error: ${error}`,
        errorCode: `ERR8003`,
      })
    });

};
//update
exports.update = (req, res) => {//http://localhost:8000/api/products/{id}
  // res.send('Update ONE req received')
  // validate
  if (!req.body.productName || !req.body.productDescription) {
    res.status(400).send({
      message: `productName and/or Description cannot be empty during an update.`,
      success: false,
      errorCode: `ERR9002`
    });
    return;
  }

  // get id
  const id = req.params.id;

  // construct object
  const { productName, productDescription, price, productImage, productCategory } = req.body;
  const products = {
    productName, productDescription, price, productImage, productCategory
  };

  // save to db
  Product.update(products, { where: { id: id } })
    .then(num => {
      if (num && num[0] && num >= 1) {
        res.status(200).send({
          success: true,
          message: 'Product updated successfully.',
          data: {
            id: id,
            recordsAffected: num && num[0] ? num[0] : 1
          }
        });
      } else {
        res.status(400).send({
          success: false,
          message: `Cannot find products data with id = ${id}, update data ignored.`,
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
//delete all
exports.deleteAll = (req, res) => {//http://localhost:8000/api/products/
  Product.destroy({ where: {}, trucate: true })
    .then(nums => {
      res.status(200).send({
        success: true,
        message: `${nums} products${nums > 1 ? 's' : ''} deleted successfully.`,
        data: {
          recordsAffected: nums
        }
      });
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: `Cannot perform date all at the moment. Error: ${error}`,
        errorCode: `ERR8005`,
      })
    });
};
//delete 1
exports.deleteOne = (req, res) => {//http://localhost:8000/api/products/{id}
  // get id
  const id = req.params.id;

  // save to db and respond
  Product.destroy({ where: { id: id } })
    .then(num => {
      if (num >= 1) {
        res.status(200).send({
          success: true,
          message: 'Product deleted successfully.',
          data: {
            id: id,
            recordsAffected: num
          }
        });
      } else {
        res.status(400).send({
          success: false,
          message: `Cannot delete products data with id = ${id}, delete request ignored.`,
          errorCode: `ERR7003`
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: `Cannot perform deletion at the moment. Error: ${error}`,
        errorCode: `ERR8006`,
      })
    });
};