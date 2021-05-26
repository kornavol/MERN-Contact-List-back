const router = require("express").Router();
const contactsC = require("../controller/contacts");
const testMid = require("../middleware/test");
const logMid = require("../middleware/log");
const authMid = require('../middleware/auth')

router.get("/all",  contactsC.getAll);

// router.post("/new", testMid.test, contactsC.newContact);
router.post("/new", logMid.logger, contactsC.newContact);

router.delete("/delete/:contactId", logMid.logger, contactsC.deleteContact);
router.post("/update", logMid.logger, contactsC.updateContact);

module.exports = router;
