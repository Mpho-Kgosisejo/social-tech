import axios from "axios"
import mock from "./data/mock"

const IS_MOCK = true
const API_ENDPOINT = "http://localhost:3000/api"

const API = {
    user: {
        signin: (credentials) => {
            if (IS_MOCK){
                return (mock.login().then(res => res))
            }
            return (
                axios.post(`${API_ENDPOINT}/Users/login`, {
                    [credentials.login.key]: credentials.login.value,
                    password: credentials.password
                })
                .then(res => res)
                .catch(err => err)
            )
        },
        signup: (user) => {
            if (IS_MOCK){
                return (mock.signup().then(res => res))
            }
            return (
                axios.post(`${API_ENDPOINT}/Users`, {
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
    }
}

export default API


