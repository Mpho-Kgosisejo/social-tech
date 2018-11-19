import React from 'react'
import App, { Container } from 'next/app'
import Config from "react-global-configuration"
import devConfig from "../src/config/devConfig"
import prodConfig from "../src/config/prodConfig"

import ContextAPI from "../src/config/ContextAPI"
import {reducer} from "../src/reducers/Reducer"
import {getLogin} from "../src/providers/LoginSession"

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

        if (process.browser){
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
        // console.log("_app.getInitialProps():", pageProps)
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