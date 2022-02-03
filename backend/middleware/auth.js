const config = require('config');
const jwt = require('jsonwebtoken');
const secret = config.get('jwtSecret');

// Auth middleware that checks if user is currently signed in / authorized
function auth(req, res, next) {

    try{
        const token = req.cookies.token;

        // Verify token
        if(!token) return res.status(401).json({ msg: 'Unauthorized' });

        const verified = jwt.verify(token, secret)

        // Create request property
        req.user = verified.user;

        next();
    } catch(e) {
        console.error(e);
        res.status(401).json({ msg: 'Unauthorized' });
    }
}

module.exports = auth;