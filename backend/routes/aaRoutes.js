const express = require("express");
const router = express.Router();


const getMessage = (req, res) => {
    res.send('route test');
    console.log('route test');
  };

router.route("/hello/test").get(getMessage)

module.exports = router;