const User = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const validUser = await User.findOne({ email })
        if (!validUser) return res.status(401).json({ msg: 'Wrong Credentials' })
        const isMatch = await bcrypt.compareSync(password, validUser.password)
        if (!isMatch) return res.status(401).json({ msg: 'Wrong Credentials' })
        const token = await jwt.sign({ id: validUser._id }, process.env.JWT_KEY)
        res.cookie('token', token, {
            httpOnly: true
        })
        res.status(200).json({ email: validUser.email })
    } catch (error) {
        console.log(error);
    }
}
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const newUser = await User.create({ email, password: hashedPassword })
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login,
    register
} 