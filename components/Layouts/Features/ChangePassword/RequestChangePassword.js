import React from "react"
import {Grid, Form, Button} from "semantic-ui-react"
import validator from "validator"

import {MainMessage} from "../../../Messages/Message"
import { FIELD_CANT_BE_EMPTY, INVALID_EMAIL, UNEXPECTED_ERROR } from "../../../../src/Types/MessageTypes";
import { InLineError } from "../../../Messages/InLineMessage";
import api from "../../../../src/providers/APIRequest";

class RequestChangePassword extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            loading: false,
            email: "",
            feedback: {
                type: "",
                header: "",
                message: ""
            },
            errors: {}
        }
    }

    resetPassword = async () => {
        this.setState({loading: true})
        const {email} = this.state
        const res = await api.user.requestPasswordChange(email)

        console.log(res)
        if (res.status === 200){
            this.setState({
                email: "",
                loading: false,
                feedback: {
                    type: "success",
                    header: "",
                    message: res.data.message
                }
            })
            return
        }
        this.setState({
            email: "",
            loading: false,
            feedback: {
                type: "error",
                header: "",
                message: res.error.message || UNEXPECTED_ERROR
            }
        })
    }

    onSubmitForm = (e) => {
        e.preventDefault()
        const errors = this.validate()
        this.setState({errors})

        if (Object.keys(errors).length === 0){
            this.resetPassword()
        }
    }

    validate = () => {
        const errors = {}
        const email = this.state.email

        if (!email){
            errors.email = FIELD_CANT_BE_EMPTY
        }else{
            if (!validator.isEmail(email)){
                errors.email = INVALID_EMAIL
            }
        }
        return (errors)
    }

    onChangeValue = (e) => this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })

    render(){
        const {loading, feedback, errors, email} = this.state

        return (
            <Grid columns="equal">
                <Grid.Row>
                    <Grid.Column />
                    <Grid.Column mobile={16} tablet={10} computer={8}>
                        {feedback.message.length > 0 && <MainMessage {...feedback} />}
                        
                        <Form onSubmit={this.onSubmitForm} loading={loading}>
                            <Form.Field>
                                <label>Email</label>
                                <input placeholder="Enter Email" name="email" value={email} onChange={this.onChangeValue} type="text" />
                                {errors.email && <InLineError message={errors.email} />}
                            </Form.Field>
                            <Button type="submit" fluid loading={loading}>Change email</Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column />
                </Grid.Row>
            </Grid>
        )
    }
}

export default RequestChangePassword