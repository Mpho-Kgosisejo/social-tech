import axios from "axios"
import Config from "react-global-configuration"

import mock from "./data/mock"

const API = {
    user: {
        /**
         * "signin" is used to authenticate the user.
         * 
         * Returns API response of endpoint: [POST, /auth]
         * @param credentials [Object => {login: {key: [String => "username/email"], value: [String]}, password: [String]}]
         */
        signin: (credentials) => {
            if (Config.get("api.isMock")){
                return (mock.login().then(res => res))
            }
            return (
                axios.post(`${Config.get("api.endpoint")}/auth`, {
                    login: credentials.login,
                    password: credentials.password
                })
                .then(res => res)
                .catch(err => err.response)
            )
        },

        /**
         * "signup" is used to register the user.
         * 
         * Returns API response of endpoint => [POST, /user]
         * @param user
         */
        signup: (user) => {
            if (Config.get("api.isMock")){
                return (mock.signup().then(res => res))
            }
            return (
                axios.post(`${Config.get("api.endpoint")}/user`, {
                    username: user.username,
                    email: user.email,
                    password: user.password
                })
                .then(res => res)
                .catch(err => err.response)
            )
        },

        /**
         * "confirmEmail" is used to confirm user's email after they have registered.
         * 
         * Returns API response of endpoint => [POST, /auth/confirmation]
         * @param token [String]
         */
        confirmEmail: (token) => {
            if (Config.get("api.isMock")){
                return (mock.confirmEmail().then(res => res))
            }
            return (
                axios.post(`${Config.get("api.endpoint")}/auth/confirmation`, {
                    token
                })
                .then(res => res)
                .catch(err => err.response)
            )
        },

        /**
         * "requestPasswordChange" is used to request "password cahange", sending a link (via email) to the user so they able to change and also confim if user (of email) exists.
         * 
         * Returns API response of endpoint => [POST, /auth/reset-password] (Sends user a link via email)
         * @param email [String]
         */
        requestPasswordChange: (email) => {
            if (Config.get("api.isMock")){
                return (mock.requestPasswordChange().then(res => res))
            }
            return (
                axios.post(`${Config.get("api.endpoint")}/auth/reset-password`, {email})
                .then(res => res)
                .catch(err => err.response)
            )
        },

        /**
         * "changePassword" is used to change/reset user's password.
         * 
         * Returns API response of endpoint => [POST, /auth/change-password]
         * @param object [Object] => {token: [String, "token given to user via email"], password: [String, "user's new password"]}
         */
        changePassword: ({token, password}) => {
            if (Config.get("api.isMock")){
                return (mock.changePassword().then(res => res))
            }
            return (
                axios.post(`${Config.get("api.endpoint")}/auth/change-password`, {
                    token,
                    password
                })
                .then(res => res)
                .catch(err => err.response)
            )
        }
    },
    menu: {
        menu_items : () => {
            if (Config.get("api.isMock")){
                return(mock.menu().then(res => res))
            }
            return (
                axios.get(`${Config.get("api.endpoint")}/menus`)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        menu_product : (productID) => {
            if (Config.get("api.isMock")){
                return(mock.menu().then(res => res))
            }
            return (
                axios.get(`${Config.get("api.endpoint")}/menus/${productID}`)
            )
        }
    },
    web:{
        about: () => {
            // if (Config.get("api.isMock")){
                return (mock.about().then(res => res))
            // }
        },
    },
    gallery: {
        getInstaImgs: () => {
            if (Config.get("api.isMock")){
                return (mock.instaGallery().then(res => res))
            }
            return (
                axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${Config.get("api.instaToken")}`)
                .then(res => res)
                .catch(err => err.response)
            )
        }
    }
}

export default API