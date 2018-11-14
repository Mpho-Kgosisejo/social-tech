import { Header, Segment, Divider} from "semantic-ui-react";

import Router from "next/router"

import Layout from "../components/Layouts/Layout"
import {isEmptyObj } from "../src/utils/Objs";
import api from "../src/providers/APIRequest"
import { CONFIRMATION_EMAIL_ERROR, CONFIRMATION_EMAIL_SUCCESS, CONFIRMATION_EMAIL_UNEXPECTED_ERROR, NOT_AUTHORIZED_PAGE_ACCESS } from "../src/Types/MessageTypes";
import { PlaceholderSmallParagraph } from "../components/utils/Placeholders";
import ToHomeMessage from "../components/Messages/ToHomeMessage"
import {MainMessage} from "../components/Messages/Message"

class Confirmation extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            loading: true,
            confirmationType: "Email",
            feedback: {
                type: "error",
                header: "",
                message: ""
            }
        }
    }

    processEmailConfirmation = async (token) => {
        const res = await api.user.confirmEmail(token)

        if (res.status === 200){
            this.setState({
                feedback: {
                    ...this.state.feedback,
                    type: "success",
                    message: CONFIRMATION_EMAIL_SUCCESS
                }
            })
        }else{
            this.setState({
                feedback: {
                    ...this.state.feedback,
                    message: res.data.error.message || CONFIRMATION_EMAIL_ERROR
                }
            })
        }
        this.setState({loading: false})
    }

    componentDidMount(){
        const {token, type} = this.props.router.query

        if (token && type){
            if (type === "email"){
                this.processEmailConfirmation(token)
                return
            }
            
            this.setState({
                loading: false,
                feedback: {
                    ...this.state.feedback,
                    message: CONFIRMATION_EMAIL_UNEXPECTED_ERROR
                }
            })
        }else{
            this.setState({
                loading: false,
                feedback: {
                    ...this.state.feedback,
                    message: NOT_AUTHORIZED_PAGE_ACCESS
                }
            })
            setTimeout(() => {
                this.props.dispatch({type: "ALERT_PORTAL", payload: {open: true, type: "error", header: "", message: `${NOT_AUTHORIZED_PAGE_ACCESS}: confirmation`}})
            }, 50)
            Router.replace({pathname: "/"})
        }
    }

    render(){
        const {loading, feedback, confirmationType} = this.state

        return (
            <Layout includeNav={false} includeFooter={false}>
                <Segment>
                    <Divider horizontal>
                        <Header size="huge">{`${confirmationType} Confirmation`}</Header>
                    </Divider>
                    
                    {loading ? <PlaceholderSmallParagraph /> :
                        feedback.message &&
                        <React.Fragment>
                            <MainMessage type={feedback.type} header={feedback.header} message={feedback.message} />
                        </React.Fragment>
                    }
                </Segment>
                <ToHomeMessage  />
            </Layout>
        )
    }
}

export default Confirmation