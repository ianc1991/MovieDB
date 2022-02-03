const express = require ("express");
const router = express.Router();
const usersCtrl = require("../../controllers/usersController");


// Get list of users (for testing)
router.route('/userlist').get(usersCtrl.getUsers);

// Register user
router.route('/register').post(usersCtrl.postRegister);

// Authorize user for login
router.route('/login').post(usersCtrl.authUser);

// Log out
router.route('/logout').get(usersCtrl.logout);

module.exports = router;