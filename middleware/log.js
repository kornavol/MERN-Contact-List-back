const logModel = require("../model/logs");

exports.logger = (req, res, next) => {
  const logs = new logModel({
    dataTime: Date.now(),
    path: req.originalUrl,
  });

  logs.save((err, docs) => {
    console.log(err);
    if (err) {
      res.status(500).send({ status: "failed", messag: err.errors });
    } else {
      req.body.logId = docs._id;
      next();
    }
  });
};
