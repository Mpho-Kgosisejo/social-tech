import React from 'react'
import App, { Container } from 'next/app'
import Config from "react-global-configuration"
// import axios from "axios"

import devConfig from "../src/config/devConfig"
import prodConfig from "../src/config/prodConfig"
import ContextAPI from "../src/config/ContextAPI"
import {reducer} from "../src/reducers/Reducer"
import axios from 'axios'
import {getLogin} from "../src/providers/LoginSession"
import * as CartHandler from "../src/providers/CartHandler"

export default class MyApp extends App {
    constructor(props){
        super(props)
        
        this.state = {
            test: "Hello NextJS!",
            root_loading: true,
            alertPortal: {
                open: false,
                type: "",
                header: "",
                message: ""
            },
            about: {
                index: 0
            },
            login: {},
            isSidebarOpen: false,
            main_layout_calculations: {},
            active_page: "",
            menu: {
                index: 0,
                data: []
            },
            cart: {
                details: {
                    itemsCount: 0,
                    totalItemsCount: 0,
                    subTotal: 0,
                    total: 0,
                    tax: 0
                },
                delivery: {},
                items: []
            },
            account: {
                personal_details: {
                    address: "Maboneng Precinct, Fox Street, City and Suburban, Johannesburg, South Africa"
                }
            },
            dispatch: (action) => this.setState(state => reducer(state, action))
        }
    }

    UNSAFE_componentWillMount(){
        if (process.browser){
            if (window.location.hostname === "localhost"){
                Config.set(devConfig, {freeze: false})
                console.log(`Running => [ENV]: Development; [API.IS_MOCK]: ${Config.get("api.isMock")}`)
            }else{
                Config.set(prodConfig, {freeze: false})
            }
        }else{
            // Config.set(prodConfig)
        }
    }

    componentDidMount(){
        const login = getLogin()

        CartHandler.restore_cart({dispatch: this.state.dispatch})
        if (process.browser){
            axios.defaults.headers.authorization = `Bearer ${login.token}`
            
            this.setState({
                ...this.state,
                root_loading: false,
                login
            })
        }
    }

    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        // console.log("_app.getInitialProps():", Component)
        return ({pageProps})
    }

    render () {
        const { Component, pageProps } = this.props

        return (
            <Container>
                <ContextAPI.Provider value={{state: this.state}}>
                    <Component {...pageProps} {...this.props} dispatch={this.state.dispatch} />
                </ContextAPI.Provider>
            </Container>
        )
    }
}