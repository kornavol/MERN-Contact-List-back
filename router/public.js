const router = require("express").Router();
const public = require("../controller/public");

router.post("/get-contact", public.getContact);



module.exports = router;
