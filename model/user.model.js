const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    displayPhoto: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Ddefault%2Bavatar&psig=AOvVaw2uKp2A-T_FKLByIMNBYnvp&ust=1712849428677000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjiicn7t4UDFQAAAAAdAAAAABAE',
    }
}, { timestamps: true })


const User = mongoose.model('User', UserSchema)

module.exports = User