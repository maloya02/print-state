// const db = require('../models');
// const Comment = db.Comment;

const DEFAULT_USER = [
  {
    id: 1,
    username: 'admin',
    password: 'adminpass'
  }
];

// login a user
exports.login = (req, res) => {
  // validate
  if(!req.body.username || !req.body.password) {
    res.status(400).send({
      message: `Username or Password cannot be empty.`,
      success: false,
      errorCode: `ERR9001`
    });
    return;
  }

  const user = DEFAULT_USER.filter(user => user.username === req.body.username && user.password === req.body.password);

  if(user.length <= 0) {
    res.status(400).send({
      message: `Username or Password does not match.`,
      success: false,
      errorCode: `ERR9001`
    });
  } else {
    res.status(200).send({
      success: true,
      message: 'Successfully logged in',
      data: {
        success: true,
        timestamp: Date.now()
      }
    });
  }
  res.status(200).send({"status": 'success'})
}

// logout
exports.logout = (req, res) => {
  res.status(200).send({"status": 'success'})
}

// create and save a comment
exports.create = (req, res) => {
  // validate
  if(!req.body.author || !req.body.message) {
    res.status(400).send({
      message: `Author or Message cannot be empty.`,
      success: false,
      errorCode: `ERR9001`
    });
    return;
  }

  // create object in memory
  const {author, message, published} = req.body;
  const comment = {
    message
  };
  comment.author = author || comment.author;
  comment.published = (published == true || published == false) ? published : comment.published;

  // save to db
  Comment.create(comment)
    .then(data => {
      res.status(200).send({
        success: true,
        message: 'Comment saved successfully.',
        data: data
      });
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: `Saving of Comment data failed. Error: ${error}`,
        errorCode: `ERR8001`,
      })
    });

};

// retrieve all comments
exports.findAll = (req, res) => { 
  // find and respond
  Comment.findAll()
    .then(data => {
      res.status(200).send({
        success: true,
        data: data
      });
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: `Cannot retrieve comment records. Error: ${error}`,
        errorCode: `ERR8002`,
      })
    });
};

// retrieve a single comment 
exports.findOne = (req, res) => {
  // find and respond
  const id = req.params.id;

  Comment.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send({
          success: true,
          data: data
        });
      } else {
        res.status(400).send({
          success: false,
          message: `Cannot find comment data with id = ${id}`,
          errorCode: `ERR7001`
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        success: false,
        message: `Cannot retrieve comment record. Error: ${error}`,
        errorCode: `ERR8003`,
      })
    });

};

// update a comment
exports.update = (req, res) => { 
  // validate
  if(!req.body.author || !req.body.message) {
    res.status(400).send({
      message: `Author and/or Message cannot be empty during an update.`,
      success: false,
      errorCode: `ERR9002`
    });
    return;
  }

  // get id
  const id = req.params.id;

  // create object in memory
  const {author, message, published} = req.body;
  const comment = {
    message
  };
  comment.author = author || comment.author;
  comment.published = (published == true || published == false) ? published : comment.published;

  // save to db
  Comment.update(comment, {where: {id: id}})
    .then(num => {
      if (num && num[0] && num >= 1) {
        res.status(200).send({
          success: true,
          message: 'Comment updated successfully.',
          data: {
            id: id,
            recordsAffected: num && num[0] ? num[0] : 1
          }
        });
      } else {
        res.status(400).send({
          success: false,
          message: `Cannot find comment data with id = ${id}, update data ignored.`,
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

// delete all comments
exports.deleteAll = (req, res) => {
  Comment.destroy({where: {}, trucate: true})
    .then(nums => {
      res.status(200).send({
        success: true,
        message: `${nums} comment${nums > 1 ? 's' : ''} deleted successfully.`,
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

// delete a single comment
exports.deleteOne = (req, res) => {
  // get id
  const id = req.params.id;

  // save to db and respond
  Comment.destroy({ where: {id : id}})
    .then(num => {
      if (num >= 1) {
        res.status(200).send({
          success: true,
          message: 'Comment deleted successfully.',
          data: {
            id: id,
            recordsAffected: num
          }
        });
      } else {
        res.status(400).send({
          success: false,
          message: `Cannot delete comment data with id = ${id}, delete request ignored.`,
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