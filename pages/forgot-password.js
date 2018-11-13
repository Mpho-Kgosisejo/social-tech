import React from "react"
import { Segment, Divider, Header } from "semantic-ui-react";
import Router from "next/router"

import Layout from "../components/Layouts/Layout"
import ToHomeMessage from "../components/Messages/ToHomeMessage"
import {PlaceholderSmallParagraph, PlaceholderMediumParagraph} from "../components/utils/Placeholders"
import { NOT_AUTHORIZED_PAGE_ACCESS } from "../src/Types/MessageTypes";
import { MainMessage } from "../components/Messages/Message";
import ChangePassword from "../components/Layouts/Features/ChangePassword/ChangePassword"
import RequestChangePassword from "../components/Layouts/Features/ChangePassword/RequestChangePassword";

class ForgotPassword extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            isFinalStep: false,
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
            this.setState({loading: false, isFinalStep: true})
        }else{
            this.setState({loading: false, isFinalStep: false})
        }
    }

    render(){
        const {loading, feedback, isFinalStep} = this.state

        return (
            <Layout includeFooter={false} includeNav={false}>
                <Segment>
                    <Divider horizontal>
                        <Header>Forgot Password</Header>
                    </Divider>

                    {loading ? <PlaceholderMediumParagraph /> :
                        feedback.message ?
                            <MainMessage header={feedback.header} message={feedback.message} type={feedback.type} /> :
                            isFinalStep ? <ChangePassword /> : <RequestChangePassword />
                    }
                </Segment>
                <ToHomeMessage />
            </Layout>
        )
    }
}

export default ForgotPassword