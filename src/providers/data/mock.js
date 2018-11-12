import axios from "axios"
import login_s from "./json/login_success.json"
import login_f from "./json/login_fail.json"
import signup_s from"./json/signup_success.json"
import signup_f from"./json/signup_fail.json"
import foodmenu_s from "./json/FoodMenuLoad_success.json"
import foodmenu_f from "./json/FoodMenuLoad_failure.json"
import spicemenu_s from "./json/SpicesMenuLoad_success.json"
import spicemenu_f from "./json/SpicesMenuLoad_failure.json"

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
    foodmenu: () => loadMock(foodmenu_s),
    spicemenu: () => loadMock(spicemenu_s)
}