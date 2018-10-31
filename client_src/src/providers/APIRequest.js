import axios from "axios"

const API_ENDPOINT = "http://localhost:3000/api"

const API = {
    user: {
        signin: (credentials) => {
            return (
                axios.post(`${API_ENDPOINT}/Users/login`, {
                    [credentials.login.key]: credentials.login.value,
                    password: credentials.password
                })
                .then(res => {
                    return (res)
                    // console.log(`[api.res()] =>`, res)
                })
                .catch(function (err) {
                    return (err.response)
                    // console.log(`[api.err()] =>`, err.response)
                })
            )
        },
        signup: (user) => (
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

export default API


