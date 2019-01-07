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
         * @param user [Object: {username: [String], email: [String], password: [String]}]
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
        get_single_product : (id) => {
            return (
                axios.get(`${Config.get("api.endpoint")}/products/${id}`)
            )
        },
        upload_product : (uploadBody) => {
            const fileData = new FormData()
            fileData.append('name', uploadBody.name)
            fileData.append('description', uploadBody.description)
            fileData.append('price', uploadBody.price)
            fileData.append('available', uploadBody.available)
            fileData.append('ingredients', JSON.stringify(uploadBody.ingredients))
            fileData.append('menuCategoryId', uploadBody.menuCategoryId)
            fileData.append('productImage',uploadBody.image, uploadBody.image.name)
            return (
                axios.post(`${Config.get("api.endpoint")}/products`, fileData)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        update_product : (editBody, isImageEdited) => {
            
            if (isImageEdited)
            {
                const fileData = new FormData()
                fileData.append('name', editBody.name)
                fileData.append('_id', editBody._id)
                fileData.append('description', editBody.description)
                fileData.append('price', editBody.price)
                fileData.append('available', editBody.available)
                fileData.append('ingredients', JSON.stringify(editBody.ingredients))
                fileData.append('menuCategoryId', editBody.menuCategoryId)
                fileData.append('productImage', editBody.image, editBody.image.name)
                fileData.append('oldImagePath', editBody.oldImagePath)
                return (
                    axios.patch(`${Config.get("api.endpoint")}/products`, fileData )
                    .then(res => res)
                    .catch(err => err.response)
                )
            }
            else 
            {
                // editBody.ingredients = JSON.stringify(editBody.ingredients)
                return (
                    axios.patch(`${Config.get("api.endpoint")}/products`, editBody)
                    .then(res => res)
                    .catch(err => err.response)
                )
            }

            
        },
        delete_product : (deleteBody) => {
            return (
                axios.delete(`${Config.get("api.endpoint")}/products`, { data : deleteBody})
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
            if (Config.get("api.isMock")){
                return (mock.about().then(res => res))
            }
            return (
                axios.get(`${Config.get("api.endpoint")}/abouts`)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        getAboutContactDetails : () => {
            return (
                axios.get(`${Config.get("api.endpoint")}/contact-us`)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        updateAboutContactDetails : (body) => {
            const new_bus_hours = body.time_one.concat(" - ", body.time_two, " , ", body.day_one, " - ", body.day_two)
            const newBody = {
                ...body,
                business_hours : new_bus_hours
            }
            return (
                axios.post(`${Config.get("api.endpoint")}/contact-us`, newBody)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        uploadFAQ : (body) => {
            return (
                axios.post(`${Config.get("api.endpoint")}/faqs`, body)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        getFaqs : () => {
            return (
                axios.get(`${Config.get("api.endpoint")}/faqs`)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        updateFAQ : (body) => {
            return (
                axios.patch(`${Config.get("api.endpoint")}/faqs`, body)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        deleteFAQ : (body) => {
            return (
                axios.delete(`${Config.get("api.endpoint")}/faqs`, { data : body})
                .then(res => res)
                .catch(err => err.response)
            )
        }, 
        getChefs : () => {
            return (
                axios.get(`${Config.get("api.endpoint")}/chefs`)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        uploadChef : (body, rating) => {
            const fileData = new FormData()

            fileData.append('name', body.name)
            fileData.append('hierarchy', body.hierarchy)
            fileData.append('description', body.description)
            fileData.append('rating', rating)            
            fileData.append('image',body.image, body.image.name)
            return (
                axios.post(`${Config.get("api.endpoint")}/chefs`, fileData)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        updateChef : (editBody, isImageEdited) => {
                if (isImageEdited)
                {
                    const fileData = new FormData()
                    fileData.append('name', editBody.name)
                    fileData.append('_id', editBody._id)
                    fileData.append('background', editBody.background)
                    fileData.append('speciality', editBody.speciality)
                    fileData.append('rating', editBody.rating)
                    fileData.append('image_url', editBody.image_url, editBody.image_url.name)
                    fileData.append('oldImagePath', editBody.oldImagePath)
                    return (
                        axios.patch(`${Config.get("api.endpoint")}/chefs`, fileData )
                        .then(res => res)
                        .catch(err => err.response)
                    )
                }
                else 
                {
                    return (
                        axios.patch(`${Config.get("api.endpoint")}/chefs`, editBody)
                        .then(res => res)
                        .catch(err => err.response)
                    )
                }
    
                
            
        },
        deleteChef : (deleteBody) => {
            return (
                axios.delete(`${Config.get("api.endpoint")}/chefs`, { data : deleteBody})
                .then(res => res)
                .catch(err => err.response)
            )
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
    orders : {
        get_orders : () => {
            return (
                axios.get(`${Config.get("api.endpoint")}/order`)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        get_single_order : (id) => {
            return (
                axios.get(`${Config.get("api.endpoint")}/order/${id}`)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        add_order : (body) => {
            return (
                axios.post(`${Config.get("api.endpoint")}/order`, body)
                .then(res => res)
                .catch(err => err.response)
            )
        },
        update_order : (body) => {
            return (
                axios.patch(`${Config.get("api.endpoint")}/order`, body)
                .then(res => res)
                .catch(err => err.response)
            ) 
        },
        //NB : NOT FULLY FUNCTIONAL YET.
        get_user_orders : (uid) => {
            return (
                axios.get(`${Config.get("api.endpoint")}/order/${uid}`)
            )
        }
    },
    dashboard_Index : {
        get_users : () => {
            return (
                axios.get(`${Config.get("api.endpoint")}/user/all`)
                .then(res => res)
                .catch(err => err.response)
            )
        }, 
        make_or_revoke_admin : (user) => {
            return (
                axios.patch(`${Config.get("api.endpoint")}/user/handle-admin-rights`,{ _id : user._id, admin : user.admin })
                .then (res => res)
                .catch(err => err.response)
            )
        },
        delete_user : (user) => {
            return (
                axios.delete(`${Config.get("api.endpoint")}/user/delete-user`, { data : { _id : user._id, image : user.image}})
                .then(res => res)
                .catch(err => err.response)
            )
        }
    },
    dashboard_orders: {
        get_orders : () => {
            if (Config.get("api.isMock")){
                return (mock.dashboard_orders().then(res => res))
            }
        }
    }
}

export default API