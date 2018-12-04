import jwt from "jsonwebtoken"
import UserModel from "../models/User"

const response = (res, extra_message = "") => {
    res.status(401).json({
        error: {
            message: `Unauthorised Request${extra_message}`
        }
    })
}

const checkAuth = (req, res, next, isAdmin) => {
    try {
        const token = req.headers.authorization.split(" ")[1] || ""
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const decodedToken = jwt.verify(decoded.token, process.env.JWT_SECRET)

        req.auth_data = decodedToken

        if (!decodedToken.key){
            response(res)
            return
        }
        UserModel.findOne({_id: decodedToken.key, email: decodedToken.email})
        .then(user => {
            if (user && (user._id == decodedToken.key)){
                if (isAdmin){
                    if (decodedToken.isAdmin){
                        next()
                        return
                    }
                    response(res, " (NOT ADMIN)")         
                    return
                }else{
                    next()
                    return
                }
            }
            response(res)
        })
        .catch(() => {
            response(res)
        })  
    } catch (error) {
       response(res)
    }
}

export const adminAuth = (req, res, next) => {
    checkAuth(req, res, next, true)
}

export const userAuth = (req, res, next) => {
    checkAuth(req, res, next, false)
}

export default (req, res, next) => {
    checkAuth(req, res, next, true)
} 