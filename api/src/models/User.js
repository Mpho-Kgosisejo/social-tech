import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pluginUniqueValidator from "mongoose-unique-validator"

const schema = new mongoose.Schema({
    firstname: {
        type: String,
        default: ""
    },
    lastname: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    emailConfirmed: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    confirmationToken: {
        type: String,
        default: ""
    }
}, {timestamps: true})

schema.methods.isValidPassword = function isValidPassword (password){
    return (bcrypt.compareSync(password, this.passwordHash))
}

schema.methods.setPassword = function setPassword(password){
    this.passwordHash = bcrypt.hashSync(password, 10)
}

schema.methods.setConfirmation = function setConfirmation(password){
    this.confirmationToken = this.generateJWT()
}

schema.methods.generateConfirmationUrl = function generateConfirmationUrl(){
    return (process.env.HOST + "/conformation/" + this.confirmationToken)
}

schema.methods.generateResetPasswordUrl = function generateResetPasswordUrl(){
    return (process.env.HOST + "/reset-password/" + this.generateResetPasswordToken())
}

schema.methods.generateResetPasswordToken = function generateResetPasswordToken(){
    return (jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    ))
}

schema.methods.generateJWT = function generateJWT(){
    return (jwt.sign({
        email: this.email,
        isAdmin: this.admin
    }, process.env.JWT_SECRET))
}

schema.methods.toAuthJSON = function toAuthJSON (){
    this.token = this.generateJWT()

    return ({
        isAdmin: this.admin,
        token: this.token
    })
}

schema.plugin(pluginUniqueValidator, {message: "value must be unique"})

export default mongoose.model("User", schema)