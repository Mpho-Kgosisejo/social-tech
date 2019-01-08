import React from 'react'
import App, { Container } from 'next/app'
import Config from "react-global-configuration"

import devConfig from "../src/config/devConfig"
import prodConfig from "../src/config/prodConfig"
import ContextAPI from "../src/config/ContextAPI"
import {reducer} from "../src/reducers/Reducer"
import {getLogin, populateUserDetails, logout} from "../src/providers/LoginSession"
import * as CartHandler from "../src/providers/CartHandler"
import api from "../src/providers/APIRequest"

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
            router: {
                asPath: props.router.asPath,
                route: props.router.route,
                query: props.router.query
            },
            account:{
                personal_details: {}
            },
            dispatch: (action) => this.setState(state => reducer(state, action))
        }
    }

    loadData = async ({login}) => {
        const res = await api.user.isValidToken(login.isAdmin)
        
        if (res.status === 200){
            populateUserDetails((personal_details) => {
                this.setState({
                    ...this.state,
                    root_loading: false,
                    login,
                    account: {
                        ...this.state.account,
                        personal_details
                    }
                })
            })
        }else{
            logout(this.state.dispatch)

            this.setState({
                ...this.state,
                root_loading: false,
                alertPortal: {
                    open: true,
                    type: "error",
                    message: "Invalid token used. Please signin again."
                }
            })
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
            if (Object.keys(login).length > 0){
               this.loadData({login})
            }
            else {
                this.setState({
                    ...this.state,
                    root_loading: false,
                    login: {}
                })
            }
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
                    <Component {...pageProps} {...this.props} state={this.state} dispatch={this.state.dispatch} />
                </ContextAPI.Provider>
            </Container>
        )
    }
}