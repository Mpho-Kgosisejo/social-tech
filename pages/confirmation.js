import { Header, Segment, Divider } from "semantic-ui-react";

import Layout from "../components/Layouts/Layout"
import {isEmptyObj } from "../src/utils/Objs";
import {MainMessage} from "../components/Messages/Message"
import api from "../src/providers/APIRequest"
import { CONFIRMATION_EMAIL_ERROR, CONFIRMATION_EMAIL_SUCCESS } from "../src/Types/MessageTypes";

const ConfirmationComponent = () => (
    <>
        ConfirmationComponent
    </>
)

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
        console.log("processEmailConfirmation()", res.data)

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
            console.log("no empty or no token")
            this.setState({
                loading: false,
                feedback: {
                    ...this.state.feedback,
                    message: "d(-_-)b"
                }
            })
        }else{
            console.error("no queries - redirect")
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
                    
                    {loading ? "loading..." :
                        feedback.message ?
                            <MainMessage type={feedback.type} header={feedback.header} message={feedback.message} /> :
                            <ConfirmationComponent />
                    }
                </Segment>
            </Layout>
        )
    }
}

export default Confirmation