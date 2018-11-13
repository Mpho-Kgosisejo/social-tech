import React from "react"
import { Segment, Divider, Header } from "semantic-ui-react";
import Router from "next/router"

import Layout from "../components/Layouts/Layout"
import ToHomeMessage from "../components/Messages/ToHomeMessage"
import {PlaceholderSmallParagraph, PlaceholderMediumParagraph} from "../components/utils/Placeholders"
import { NOT_AUTHORIZED_PAGE_ACCESS } from "../src/Types/MessageTypes";
import { MainMessage } from "../components/Messages/Message";
import ForgotPasswordComponent from "../components/Layouts/Features/ChangePassword/Forgotpassword"

class ForgotPassword extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            loading: true,
            feedback: {
                type: "error",
                header: "",
                message: ""
            }
        }
    }

    componentDidMount(){
        const {token} = this.props.router.query
        const error_mssg = `${NOT_AUTHORIZED_PAGE_ACCESS}: forgot-password`
        
        if (token){
            this.setState({loading: false})
        }else{
            this.setState({
                feedback: {
                    ...this.state.feedback,
                    message: error_mssg
                },
                loading: false
            })
            setTimeout(() => {
                this.props.dispatch({type: "ALERT_PORTAL", payload: {open: true, type: "error", header: "", message: error_mssg}})
            }, 50)
            Router.replace({pathname: "/"})
        }
    }

    render(){
        const {loading, feedback} = this.state

        return (
            <Layout includeFooter={false} includeNav={false}>
                <Segment>
                    <Divider horizontal>
                        <Header>Forgot Password</Header>
                    </Divider>

                    {loading ? <PlaceholderMediumParagraph /> :
                        feedback.message ?
                            <MainMessage header={feedback.header} message={feedback.message} type={feedback.type} /> :
                            <ForgotPasswordComponent />
                    }
                </Segment>
                <ToHomeMessage />
            </Layout>
        )
    }
}

export default ForgotPassword