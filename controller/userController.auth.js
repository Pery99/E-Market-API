const User = require("../model/user.model");
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const validUser = await User.findOne({ email })
        if (!validUser) return res.status(401).json({ msg: 'Wrong Credentials' })
        const isMatch = bcrypt.compareSync(password, validUser.password)
        if (!isMatch) return res.status(401).json({ msg: 'Wrong Credentials' })
        res.status(200).json({ msg: 'Logged in' })
    } catch (error) {

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