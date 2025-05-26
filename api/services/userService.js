const userRepo = require("../repositories/userRepo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (userId, userRole) => {
    return jwt.sign(
        {
            id: userId,
            role: userRole
        }, 
        process.env.JWT_SECRET
    );
}

exports.register = async ({email, password}) => {
    const savedUser = await userRepo.createUser({email, password});
    return savedUser._id;
}

exports.login = async ({email, password}) => {
    const user = await userRepo.findByEmail(email);
    if (!user) {
        throw new Error("Cannot find user");
    }

    try {
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error("Not allowed");
        } else {
            return generateToken(user._id, user.role);
        }
    } catch (err) {
        throw err;
    }
}