exports.isAuth = (req, res, next) => { // Header ===> Basic fYasldfjasdofsdifas ====> admin:adminpass
  if (!req.headers.authorization) {
    res.status(401).send({
      success: false,
      message: `You need to supply valid credentials to access this resource.`,
      errorCode: `ERR5000`
    });
  }
  
  const auth = req.headers.authorization.split(' ')[1];
  const decodedAuth = new Buffer(auth, 'base64').toString();
  const uname = decodedAuth.split(':')[0];
  const upass = decodedAuth.split(':')[1];

  // uname = admin
  // upass = adminpass
  if (uname === 'admin' && upass === 'adminpass') {
    next();
  } else {
    res.status(401).send({
      success: false,
      message: `Access denied for the username and password combination.`,
      errorCode: `ERR5001`
    });
  }
}