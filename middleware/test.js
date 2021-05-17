exports.test = (req, res, next) => {
  console.log("middleware started \n", req.body, "middleware finished \n");

  // ... Some validation

  /* example how we can pass some dates in the  middleware. 
  f.e. validation as new parametr in object.
  In this case this key will not pass to mongo db becouse in Schema there isn't description regarding it 
  */
  req.body.isValid = true;

  if (req.body.isValid) {
    next(); // allow to exute the next avribbute. In common case it'll be responce
  } else {
    /* .status(status cod) syntax how we could send a status cod */
    res.status(401).send({ status: "failed", message: "Validation is failed" });
  }
};
