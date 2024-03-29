import jwt from "jsonwebtoken"
import Config from "react-global-configuration"

export const login = ({token, isAdmin, username}) => {
    const loginPayload = {token, isAdmin, username}
    const jwtJson = jwt.sign(loginPayload, Config.get("jwt.secret"))

    localStorage.setItem(Config.get("jwt.itemName"), jwtJson)
}

export const logout = () => {
    localStorage.removeItem(Config.get("jwt.itemName"))
}

export const getLogin = () => {
    try {
        const userEncryptJWT = localStorage.getItem(Config.get("jwt.itemName"))
        const userJWT = jwt.verify(userEncryptJWT, Config.get("jwt.secret"))

        return (userJWT)
    } catch (error) {}
    return ({})
}