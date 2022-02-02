const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    //const token = req.header('x-auth-token');
    console.log(req.cookie)

    // Check for token
    if(!token) res.status(401).json({ msg: 'No token, auth denied'}); // 401 = unauthrized

    try{
        //Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Add user from payload
        req.user = decoded;
        next();
    } catch(e) {
        console.error(err);
        res.status(401).json({ msg: 'Unauthorized' });
    }
    
}

module.exports = auth;