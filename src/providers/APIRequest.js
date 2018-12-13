import axios from "axios"
import Config from "react-global-configuration"

import mock from "./data/mock"

const API = {
    user: {
        signin: (credentials) => {
            if (Config.get("api.isMock")){
                return (mock.login().then(res => res))
            }
            return (
                axios.post(`${Config.get("api.endpoint")}/auth`, {
                    [credentials.login.key]: credentials.login.value,
                    password: credentials.password
                })
                .then(res => res)
                .catch(err => err.response)
            )
        },
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
        catering: () => {
            return (mock.catering().then(res => res))
        }
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
    },
    profile: {
        account: () => {
            if (Config.get("api.isMock")){
                return(mock.account().then(res => res))
            }
            return(
                axios.get(`${Config.get("api.endpoint")}/user`)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        account_update: (user) => {
            if (Config.get("api.isMock"))
            {
                return (mock.account().then(res => res_))
            }
            console.log(`${Config.get("api.endpoint")}/user`)
            return (
                axios.patch(`${Config.get("api.endpoint")}/user`,
                    {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        phone: user.phone,
                        address: user.address
                    }
                )
                .then(res => res)
                .catch(err => err.response)
            )
        },
        orders: () => {
            // if (Config.get("api.isMock")){
                return(mock.user_orders().then(res => res))
            // }
            // return(
            //     axios.get(`${Config.get("api.endpoint")}/orders`)
            //     .then(res => res)
            //     .catch(err => err.response)
            // )
        }
    }
}

export default API