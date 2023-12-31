// server --> app --> API
// routes
//---------------------
// controller
// model
// db -> table
// module.exports = (app) => {}; ==> bulk/all exporting
// exports.<func> = () = > {} ==> tingitingi
const db = require('../models/index');
const Tutorial = db.tutorials;

//create
exports.create = (req, res) => {//http://localhost:8000/api/tutorials/
    // res.send('POST request Received.')
    if(!req.body.title || !req.body.description) {
        res.status(400).send({
          message: `Title or Description cannot be empty.`,
          success: false,
          errorCode: `ERR9001`
        });
        return;
      }
    
      // create object in memory
      const {title, description, published} = req.body;
      const tutorial = {
        title, description, published
      };
    
      // save to db
      Tutorial.create(tutorial)
        .then(data => {
          res.status(200).send({
            success: true,
            message: 'Tutorial saved successfully.',
            data: data
          });
        })
        .catch(error => {
          res.status(500).send({
            success: false,
            message: `Saving of Tutorial data failed. Error: ${error}`,
            errorCode: `ERR8001`,
          })
        });
    
    };
//get all
exports.findAll = (req, res) => {//http://localhost:8000/api/tutorials/
    // res.send('Get ALL req received')
   // find and respond
  Tutorial.findAll()
  .then(data => {
    res.status(200).send({
      success: true,
      data: data
    });
  })
  .catch(error => {
    res.status(500).send({
      success: false,
      message: `Cannot retrieve tutorial records. Error: ${error}`,
      errorCode: `ERR8002`,
    })
  });
};
//get 1
exports.findOne = (req, res) => {//http://localhost:8000/api/tutorials/{id}
    // res.send('Get ONE req received')
   // find and respond
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send({
          success: true,
          data: data
        });
      } else {
        res.status(400).send({
          success: false,
          message: `Cannot find tutorial data with id = ${id}`,
          errorCode: `ERR7001`
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: `Cannot retrieve tutorial record. Error: ${error}`,
        errorCode: `ERR8003`,
      })
    });

};
//update
exports.update = (req, res) => {//http://localhost:8000/api/tutorials/{id}
    // res.send('Update ONE req received')
   // validate
  if(!req.body.title || !req.body.description) {
    res.status(400).send({
      message: `Title and/or Description cannot be empty during an update.`,
      success: false,
      errorCode: `ERR9002`
    });
    return;
  }

  // get id
  const id = req.params.id;

  // construct object
  const {title, description, published} = req.body;
  const tutorial = {
    title, description, published
  }; 

  // save to db
  Tutorial.update(tutorial, {where: {id: id}})
    .then(num => {
      if (num && num[0] && num >= 1) {
        res.status(200).send({
          success: true,
          message: 'Tutorial updated successfully.',
          data: {
            id: id,
            recordsAffected: num && num[0] ? num[0] : 1
          }
        });
      } else {
        res.status(400).send({
          success: false,
          message: `Cannot find tutorial data with id = ${id}, update data ignored.`,
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
exports.deleteAll = (req, res) => {//http://localhost:8000/api/tutorials/
    Tutorial.destroy({where: {}, trucate: true})
    .then(nums => {
      res.status(200).send({
        success: true,
        message: `${nums} tutorial${nums > 1 ? 's' : ''} deleted successfully.`,
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
exports.deleteOne = (req, res) => {//http://localhost:8000/api/tutorials/{id}
   // get id
  const id = req.params.id;

  // save to db and respond
  Tutorial.destroy({ where: {id : id}})
    .then(num => {
      if (num >= 1) {
        res.status(200).send({
          success: true,
          message: 'Tutorial deleted successfully.',
          data: {
            id: id,
            recordsAffected: num
          }
        });
      } else {
        res.status(400).send({
          success: false,
          message: `Cannot delete tutorial data with id = ${id}, delete request ignored.`,
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