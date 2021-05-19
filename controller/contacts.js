const contacts = require("../model/contacts");
const logModel = require("../model/logs");
const chalk = require("chalk");

function fillLog(
  logId,
  prevData,
  postedData = { message: " no previos version" }
) {
  /* QUESTION: Why second ONE not working  */
  delete postedData.logId;
  // delete postedData[logId];

  const preData = JSON.stringify({ ...prevData });
  const postData = JSON.stringify({ ...postedData });
  const dates = { preData, postData };

  logModel.findByIdAndUpdate(logId, dates, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(chalk.yellow('from log updater'), doc)
    }
  });
}

exports.newContact = async (req, res) => {
  const newContact = new contacts(req.body);

  /* async/await approach instead ... */
  await newContact.save((err, docs) => {
    console.log(err);
    if (err) {
      res.send(err.errors);
    } else {
      res.send(docs);
    }
  });

  /*  newContact.save().then((result,err) => {
        if (err) {
            res.send({status:'failed', message: err});
        }else {
            res.send(`${req.body.fullName} is registered on your contact list`);
        }
    }); */

  //res.send('success!');
};

exports.getAll = (req, res) => {
  contacts.find({}, (err, docs) => {
    if (err) {
      res.send(err);
    } else {
      res.send(docs);
    }
  });
};

exports.deleteContact = (req, res) => {
  const id = req.params.contactId;

  contacts.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.log(err);
      res.send({ status: "failed", message: err });
    } else if (doc === null) {
      res.send({ status: "failed", message: "There was no contact" });
    } else {
      /* second way to deep cloning */
      const prevVer = { ...doc.toObject() };

      // console.log(chalk.red('REQ'), req.body.logId)

      // console.log(chalk.yellow('DOC'), doc)

      fillLog(req.body.logId, prevVer);

      res.send({
        status: "success",
        message: `${doc.fullName} is deleted from your contact list.`,
        data: doc._id,
      });
    }
  });
};

exports.updateContact = async (req, res) => {
  const contact = { ...req.body };

  const updatedContact = await contacts.findById(contact._id);

  /* different approaches to clone an object */

  console.log(chalk.red("bevore updated"), updatedContact);

  // const prevVer = { ...updatedContact }
  // let prevVer = Object.assign({}, updatedContact)

  //const prevVer = { ...updatedContact.toObject() }

  let prevVer = JSON.parse(JSON.stringify(updatedContact));

  console.log(chalk.green("prevVer"), prevVer);

  Object.keys(contact).forEach((key) => (updatedContact[key] = contact[key]));

  updatedContact.save((err, doc) => {
    if (err) {
      console.log(err);
      res.send({ status: "failed", message: err });
    } else {
      //   console.log(chalk.blue("prevVer"), prevVer);

      fillLog(contact.logId, prevVer, contact);

      res.send({ status: "success", message: "Contact updated successfully" });
    }
  });
};
