import axios from "axios"
import login_s from "./json/login_success.json"
import login_f from "./json/login_fail.json"
import signup_s from"./json/signup_success.json"
import signup_f from"./json/signup_fail.json"
import about_us_s from "./json/about_us_success.json"

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
    about: () => loadMock(about_us_s)
}