const User = require("../models/Users");
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Get all users (for testing)
const getUsers = async (req, res) => {
    const users = await User.find();
    if(!users) return res.status(204).json({'message': 'No users found.'});
    return res.json(users);
}

// Log user in
const login = async (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email }) // Since varibale matches database field name, only need to state it once as opposed to 'email: email'
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exist' });

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 }, // token expires after 1hr
                        // Callback
                        (err, token) => {
                            if(err) throw err;
                            res.cookie("token", token, {
                                httpOnly: true,
                                secure: true,
                                sameSite: "strict",
                            })
                            .send();
                        }
                    )
                })
            
        })
}

// Register user
const postRegister = async (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if(!email || !password || !name) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email }) // Since varibale matches database name, only need to state it once as opposed to 'email: 'email''
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exists' });

            const newUser = new User({
                name,
                email,
                password
            });

            // Create salt &  hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 }, // token expires after 1hr
                                // Callback
                                (err, token) => {
                                    if(err) throw err;
                                    res.cookie("token", token, {
                                        httpOnly: true,
                                        secure: true,
                                        sameSite: "strict",
                                    })
                                    .send();
                                }
                            )

                        })
                })
            })
        })
}

// Check if user is logged in
const loggedIn = (req, res) => {
    try{
        const token = req.cookies.token;
        // Verify token
        if(!token) return res.json(false);
        jwt.verify(token, config.get('jwtSecret'));

        res.send(true);
    } catch(e) {
        res.json(false);
    }
}

// Log user out
const logout = async (req, res) => {
    // The empty string "" tries to clear the cookie. 
    // If that fails, setting the expiration date to the past is a fallback
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "strict",
    })
    .send();
}

module.exports = {
    getUsers,
    postRegister,
    login,
    logout,
    loggedIn
}