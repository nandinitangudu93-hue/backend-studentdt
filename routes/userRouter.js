const express = require('express');
const router = express.Router();
const {Addstudent,deletestudent} = require('../controller/userController');



router.post("/student/add", Addstudent);

router.delete("/delete/:id",deletestudent);

module.exports = router;