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

        req.auth_data = decoded

        if (!decoded.key){
            response(res, " [1]")
            return
        }
        UserModel.findOne({_id: decoded.key, email: decoded.email})
        .then(user => {
            if (user && (user._id == decoded.key)){
                if (isAdmin){
                    if (decoded.isAdmin){
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
            response(res, " [2]")
        })
        .catch(() => {
            response(res, " [3]")
        })  
    } catch (error) {
       response(res, " [4]")
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