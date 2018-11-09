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
                axios.post(`${Config.get("api.endpoint")}/Users/login`, {
                    [credentials.login.key]: credentials.login.value,
                    password: credentials.password
                })
                .then(res => res)
                .catch(err => err)
            )
        },
        signup: (user) => {
            if (Config.get("api.isMock")){
                return (mock.signup().then(res => res))
            }
            return (
                axios.post(`${Config.get("api.endpoint")}/Users`, {
                    realm: "", // research what this does...
                    username: user.username,
                    email: user.email,
                    emailVerified: false,
                    password: user.password
                })
                .then(res => res)
                .catch(err => err.response)
            )
        }
    },
    web:
    {
        about: () => {
            if (Config.get("api.isMock")){
                return (mock.about().then(res => res))
            }
        }
    }
}

export default API


