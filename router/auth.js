const router = require("express").Router();
const authC = require("../controller/auth");

router.post("/register", authC.registerPost);
router.post("/login", authC.loginPost);


module.exports = router;
