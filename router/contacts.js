const router = require("express").Router();
const contactsC = require("../controller/contacts");
const testMid = require("../middleware/test");
const logMid = require("../middleware/log");

// router.post("/new", testMid.test, contactsC.newContact);
router.get("/all", contactsC.getAll);

router.post("/new", contactsC.newContact);
router.delete("/:contactId", contactsC.deleteContact);
router.post("/update", logMid.logger, contactsC.updateContact);

module.exports = router;
