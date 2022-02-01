const express = require ("express");
const router = express.Router();
const usersCtrl = require("../../controllers/usersController");

// Get list of users (for testing)
router.route('/userlist').get(usersCtrl.getUsers);

// Register user
router.route('/login').post(usersCtrl.postRegister);

// Authorize user
router.route('/auth').post(usersCtrl.authUser)

module.exports = router;