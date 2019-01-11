import axios from "axios"
import login_s from "./json/login_success.json"
import login_f from "./json/login_fail.json"
import signup_s from"./json/signup_success.json"
import signup_f from"./json/signup_fail.json"
import menu_s from "./json/MenuLoad_success.json"
import menu_f from "./json/MenuLoad_failure.json"
import about_s from "./json/about_us_success.json"
import about_f from "./json/about_us_fail.json"
import confirmemail_s from "./json/confirmemail_success.json"
import confirmemail_f from "./json/confirmemail_fail.json"
import changepassword_s from "./json/change_password_success.json"
import changepassword_f from "./json/change_password_fail.json"
import requestpasswordchange_s from "./json/request_password_change_success.json"
import requestpasswordchange_f from "./json/request_password_change_fail.json"
import insta_s from "./json/insta_success.json"
import catering_s from "./json/catering_success.json"
import catering_f from "./json/catering_fail.json"
import account_s from "./json/account_success"
import account_f from "./json/account_fail"
import user_orders_s from "./json/user_orders_success"
import index_s from "./json/index_success.json"
import index_f from "./json/index_fail.json"
import orders_s from "./json/dashboard_orders_success.json"

const WAIT_TIME = 1500

const loadMock = (data) => {
    var promise = new Promise((res, rej) => {
        setTimeout(() => {
            res(data)
        }, WAIT_TIME)
    })
    return promise
}

export default {
    login: () => loadMock(login_s),
    signup: () => loadMock(signup_s),
    menu : () => loadMock(menu_s),
    about: () => loadMock(about_s),
    confirmEmail: () => loadMock(confirmemail_s),
    changePassword: () => loadMock(changepassword_s),
    requestPasswordChange: () => loadMock(requestpasswordchange_s),
    instaGallery: () => loadMock(insta_s),
    catering: () => loadMock(catering_s),
    account: () => loadMock(account_s),
    user_orders: () => loadMock(user_orders_s),
    index: () => loadMock(index_s),
    dashboard_orders: () => loadMock(orders_s)
}