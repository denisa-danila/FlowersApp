const User = require("../models/user");

exports.createUser = async ({email, password}) => {
    const user = new User({email, password});
    return await user.save();
}

exports.findByEmail = async (email) => {
    return await User.findOne({email});
}