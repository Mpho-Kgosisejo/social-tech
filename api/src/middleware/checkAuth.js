import jwt from "jsonwebtoken"

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

        if (isAdmin){
            if (decoded.isAdmin){
                next()
            }else{
                response(res, " (NOT ADMIN)")         
            }
        }else{
            next()
        }
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