import React from 'react'
import App, { Container } from 'next/app'
import {Segment, Dimmer, Loader} from "semantic-ui-react"

import ContextAPI from "../src/config/ContextAPI"
import {reducer} from "../src/reducers/Reducer"
import {getLogin} from "../src/providers/LoginSession"

import mock from "../src/providers/data/mock"

export default class MyApp extends App {
    constructor(props){
        super(props)

        this.state = {
            test: "Hello NextJS!",
            root_loading: true,
            loggedIn: false,
            dispatch: (action) => this.setState(state => reducer(state, action))
        }
    }

    componentDidMount(){
        const login = getLogin()

        if (process.browser){
            this.setState({
                ...this.state,
                root_loading: false,
                loggedIn: (Object.keys(login).length > 0),
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
        const {root_loading} = this.state

        return (
            <Container>
                <ContextAPI.Provider value={{state: this.state}}>
                    <Segment
                        className="appsegment"
                        style={{position: "static",
                        border: "0px", paddingRight: "0px",
                        paddingLetf: "0px",
                        boxShadow: "0px 0px #fff",
                        borderRadius: "0px"}}
                    >
                        <Dimmer active={root_loading} inverted>
                            <Loader size="large">Loading page...</Loader>
                        </Dimmer>

                        <Component {...pageProps} login={this.state.login} lol={{}} />
                    </Segment>
                </ContextAPI.Provider>
            </Container>
        )
    }
}