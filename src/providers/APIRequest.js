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
            )
        },
        menu_products : () => {
            if (Config.get("api.isMock")){
                return(mock.menu().then(res => res))
            }
            return (
                axios.get(`${Config.get("api.endpoint")}/products`)
            )
        },
        menu_categories : () => {
            if (Config.get("api.isMock")){
                return(mock.menu().then(res => res))
            }
            return (
                axios.get(`${Config.get("api.endpoint")}/menus/menu-categories`)
            )
        },
        upload_product : (uploadBody) => {
            const fileData = new FormData()
            fileData.append('name', uploadBody.name)
            fileData.append('description', uploadBody.description)
            fileData.append('price', uploadBody.price)
            fileData.append('available', uploadBody.available)
            fileData.append('ingredients', uploadBody.ingredients)
            fileData.append('menuCategoryId', uploadBody.menuCategoryId)
            fileData.append('productImage',uploadBody.image, uploadBody.image.name)
            return (
                axios.post(`${Config.get("api.endpoint")}/products`, fileData)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        upload_menu : (uploadBody) => {
            return (
                axios.post(`${Config.get("api.endpoint")}/menus`, uploadBody)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        delete_category : (deleteBody) => {
            return (
                axios.delete(`${Config.get("api.endpoint")}/menus`, { data : deleteBody})
                .then(res => res)
                .catch(err => err.response)
            )
        }, 
        update_category : (updateBody) => {
            return (
                axios.patch(`${Config.get("api.endpoint")}/menus`, { data : updateBody})
                .then(res => res)
                .catch(err => err.response)
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