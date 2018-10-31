import jwt from "jsonwebtoken"

import appConfig from "../config/AppConfig"

export const login = (data) => {
    // localStorage.freshEatJWT = {}
    const loginPayload = {
        token: data.id
    }
    const jwtJson = jwt.sign(loginPayload, appConfig.jwt.secret)

    localStorage.setItem(appConfig.jwt.itemName, jwtJson)
}

export const logout = () => {
    localStorage.removeItem(appConfig.jwt.itemName)
}