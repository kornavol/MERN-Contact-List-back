const router = require('express').Router();
const contactsC = require('../controller/contacts');

router.post('/new', contactsC.newContact);
router.get('/all', contactsC.getAll);
router.delete('/:contactId', contactsC.deleteContact);
router.post('/update', contactsC.updateContact);

module.exports = router;