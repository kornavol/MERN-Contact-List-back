const contacts = require("../model/contacts");
const logModel = require("../model/logs");
const chalk = require("chalk");


exports.newContact = async (req, res) => {
  const newContact = new contacts(req.body);

  /* async/await approach instead ... */
  await newContact.save((err, docs) => {
    console.log(err);
    if (err) {
      res.send(err.errors);
    } else {
      res.send(docs);

      /* create new recording to log 
      !!! NOT WORKING WITHOUT CALL-BACK FUNCTION. Even if this func. is not neccessary
      */
      logModel.findByIdAndUpdate(req.logId, { postData: JSON.stringify(docs) }, (err, doc) => console.log(err, doc))
    }
  });
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

      logModel.findByIdAndUpdate(req.logId, { preData: JSON.stringify(doc) }, (err, doc) => { });

      res.send({
        status: "success",
        message: `${doc.fullName} is deleted from your contact list.`,
        data: doc._id,
      });
    }
  });
};

exports.updateContact = async (req, res) => {
  console.log(req.body);
  const contact = { ...req.body }

  contacts.findByIdAndUpdate(contact._id, contact, { upsert: true, runValidators: true }, (err, doc) => {
    if (err) {
      console.log(err);
      res.send({ status: 'failed', message: err });
    } else {
      console.log(doc);
      logs.findByIdAndUpdate(req.logId, { preData: JSON.stringify(doc), postData: JSON.stringify(contact) }, (err) => { });
      res.send(({ status: 'success', message: 'Contact updated successfully' }));
    }
  });
}