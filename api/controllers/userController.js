const userService = require("../services/userService");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
    // check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const userId = await userService.register({email, password});
        res.status(201).json({_id: userId});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

exports.login = async (req, res) => {
    // check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const token = await userService.login({email, password});
        res.status(200).json({token});
    } catch (err) {
        res.status(401).json({message: err.message});
    }
}