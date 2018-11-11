import { Header, Segment, Divider, Message, Icon } from "semantic-ui-react";
import Link from "next/link"

import Layout from "../components/Layouts/Layout"
import {isEmptyObj } from "../src/utils/Objs";
import {MainMessage} from "../components/Messages/Message"
import api from "../src/providers/APIRequest"
import { CONFIRMATION_EMAIL_ERROR, CONFIRMATION_EMAIL_SUCCESS, UNEXPECTED_ERROR, CONFIRMATION_EMAIL_UNEXPECTED_ERROR } from "../src/Types/MessageTypes";
import { PlaceholderMediumParagraph } from "../components/utils/Placeholders";

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
        const {query} = this.props.router

        if (!isEmptyObj(query)){
            if (query.hasOwnProperty("token") && query["token"].length > 0){
                if (query.hasOwnProperty("type")){
                    if (query["type"] === "email"){
                        this.processEmailConfirmation(query.token)
                        return
                    }
                }
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
                    message: UNEXPECTED_ERROR
                }
            })
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
                    
                    {loading ? <PlaceholderMediumParagraph /> :
                        feedback.message &&
                        <React.Fragment>
                            <MainMessage type={feedback.type} header={feedback.header} message={feedback.message} />

                            <Message icon>
                                <Icon name="world"/>
                                <Message.Content>
                                    Go to -> <Link href="/" ><a>Home Page</a></Link>
                                </Message.Content>
                            </Message>
                        </React.Fragment>
                    }
                </Segment>
            </Layout>
        )
    }
}

export default Confirmation