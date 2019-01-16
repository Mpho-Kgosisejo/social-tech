import jwt from "jsonwebtoken"
import Config from "react-global-configuration"
import axios from "axios"
import api from "./APIRequest";

const setAxiosAuthorization = token => axios.defaults.headers.authorization = `Bearer ${token}`

export const login = ({token, isAdmin, username, email, dispatch}) => {
    const jwtJson = jwt.sign({
        token, isAdmin, username, email
    }, Config.get("jwt.secret"))

    localStorage.setItem(Config.get("jwt.itemName"), jwtJson)
    setAxiosAuthorization(token)
    populateUserDetails((personal_details) => {
        dispatch({type: "ACCOUNT", payload: {personal_details}})
    })
}

export const logout = dispatch => {
    localStorage.removeItem(Config.get("jwt.itemName"))
    dispatch({type: "ACCOUNT", payload: {personal_details: {}}})
    dispatch({type: "LOGIN", payload: {}})
}

export const getLogin = () => {
    try {
        const userEncryptJWT = localStorage.getItem(Config.get("jwt.itemName"))
        const userJWT = jwt.verify(userEncryptJWT, Config.get("jwt.secret"))

        setAxiosAuthorization(userJWT.token)
        return (userJWT)
    } catch (error) {}
    return ({})
}

export const populateUserDetails = async callback => {
    const res = await api.profile.account()

    if (res.status === 200){
        callback(res.data.user)
    }else{
        callback({})
    }
}