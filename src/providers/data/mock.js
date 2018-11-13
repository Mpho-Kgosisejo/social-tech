import axios from "axios"
import login_s from "./json/login_success.json"
import login_f from "./json/login_fail.json"
import signup_s from"./json/signup_success.json"
import signup_f from"./json/signup_fail.json"
import menu_s from "./json/MenuLoad_success.json"
import menu_f from "./json/MenuLoad_failure.json"
import confirmemail_s from "./json/confirmemail_success.json"
import confirmemail_f from "./json/confirmemail_fail.json"
import changepassword_s from "./json/change_password_success.json"
import changepassword_f from "./json/change_password_fail.json"

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
    confirmEmail: () => loadMock(confirmemail_s),
    changePassword: () => loadMock(changepassword_s),
}