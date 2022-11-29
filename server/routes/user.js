const express = require("express");
const {createUser, saveUser, findUser, userEdit, updateUser} = require('../Controllers/UserController');
const router = express.Router();

router.get('/createuser', createUser);
router.get('/find-user', findUser);
router.get('/user-edit/:id', userEdit);
router.put('/update-user/:id', updateUser);
router.post('/saveUser', saveUser);

module.exports = router;