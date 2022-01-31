const express = require ("express");
const router = express.Router();
const usersCtrl = require("../../controllers/usersController");

// Get list of users (for testing)
router.route('/userlist').get(usersCtrl.getUsers);

// Login
//router.route('/login').post(usersCtrl.postLogin);

// Create account


module.exports = router;