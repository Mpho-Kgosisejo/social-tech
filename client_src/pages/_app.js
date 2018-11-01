import React from 'react'
import App, { Container } from 'next/app'

import ContextAPI from "../src/config/ContextAPI"
import {reducer} from "../src/reducers/Reducer"

export default class MyApp extends App {
    constructor(props){
        super(props)

        this.state = {
            test: "Hello world...",
            dispatch: (action) => this.setState(state => reducer(state, action))
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
                    <Component {...pageProps} />
                </ContextAPI.Provider>
            </Container>
        )
    }
}