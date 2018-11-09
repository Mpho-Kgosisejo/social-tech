import jwt from "jsonwebtoken"

import appConfig from "../config/AppConfig"

export const login = (data) => {
    const loginPayload = {
        token: data.id,
        isAdmin: true
    }
    const jwtJson = jwt.sign(loginPayload, appConfig.jwt.secret)

    localStorage.setItem(appConfig.jwt.itemName, jwtJson)
}

export const logout = () => {
    localStorage.removeItem(appConfig.jwt.itemName)
}

export const getLogin = () => {
    try {
        const userEncryptJWT = localStorage.getItem(appConfig.jwt.itemName)
        const userJWT = jwt.verify(userEncryptJWT, appConfig.jwt.secret)

        return (userJWT)
    } catch (error) {}
    return ({})
}