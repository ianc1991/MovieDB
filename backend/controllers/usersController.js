const Users = require("../models/Users");

const getUsers = async (req, res) => {
    const users = await Users.find();
    if(!users) return res.status(204).json({'message': 'No users found.'});
    return res.json(users);
}

// const postLogin = async (req, res) => {
//     //stuff
// }

module.exports = {
    getUsers,
}