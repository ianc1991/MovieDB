const express = require ("express");
const router = express.Router();
const usersCtrl = require("../../controllers/usersController");


// Get list of users (for testing)
router.route('/userlist').get(usersCtrl.getUsers);

// Register user
router.route('/register').post(usersCtrl.postRegister);

// Login user
router.route('/login').post(usersCtrl.login);

// Log out
router.route('/logout').get(usersCtrl.logout);

// Check if logged in
router.route('/loggedIn').get(usersCtrl.loggedIn);

module.exports = router;