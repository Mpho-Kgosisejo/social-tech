import React from "react"
import { Grid, Form, Button } from "semantic-ui-react";
import { MainMessage } from "../../../Messages/Message";
import { isEmptyObj } from "../../../../src/utils/Objs";
import { FIELD_CANT_BE_EMPTY, valueMustBeInLength, PASSWORD_MISMATCH, UNEXPECTED_ERROR } from "../../../../src/Types/MessageTypes";
import { InLineError } from "../../../Messages/InLineMessage";
import api from "../../../../src/providers/APIRequest";

class ForgotPassword extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            password: "",
            confirm_password: "",
            loading: false,
            feedback: {
                type: "error",
                header: "",
                message: ""
            },
            errors: {}
        }
        console.log(">>", props)
    }

    onSubmitForm = (e) => {
        e.preventDefault()
        const errors = this.validate()
        this.setState({errors})

        console.log(errors)
        if (Object.keys(errors).length === 0){
            this.proccessChangePassword()
        }
    }

    proccessChangePassword = async () => {
        this.setState({loading: true})
        const res = await api.user.changePassword({token: "", password: this.state.password})

        if (res.status === 200){
            console.log("OK")
            this.setState({
                ...this.state,
                password: "",
                confirm_password: "",
                feedback: {
                    type: "success",
                    header: "",
                    message: "Ok"
                },
                loading: false
            })
            return
        }
        this.setState({
            ...this.state,
            password: "",
            confirm_password: "",
            feedback: {
                type: "error",
                header: "",
                message: res.error.message || UNEXPECTED_ERROR
            },
            loading: false
        })
    }

    onChangeValue = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
        if (e.target.name === "confirm_password"){
            // this.valida.confirm_password = true}
        }
    }

    validate = () => {
        const errors = {}
        const mini_length = 6

        if (!this.state.password){
            errors.password = FIELD_CANT_BE_EMPTY
        }else{
            if (this.state.password.length < mini_length){
                errors.password = valueMustBeInLength(mini_length)
            }
        }
        if (!this.state.confirm_password){
            errors.confirm_password = FIELD_CANT_BE_EMPTY
        }else{
            if (this.state.confirm_password !== this.state.password){
                errors.confirm_password = PASSWORD_MISMATCH
            }
        }
        return (errors)
    }

    render(){
        const {password, confirm_password, feedback, loading, errors} = this.state

        return (
            <Grid columns="equal">
                <Grid.Row>
                    <Grid.Column />
                    <Grid.Column mobile={16} tablet={10} computer={8}>
                        <Form onSubmit={this.onSubmitForm} loading={loading}>
                            {feedback.message.length > 0 && <MainMessage {...feedback} />}
                            {feedback.message.length > 0 && "<MainMessage {...feedback} />"}

                            <Form.Field>
                                <label>New Password</label>
                                <input placeholder="Enter new password" name="password" value={password} onChange={this.onChangeValue} type="password" />
                                {errors.password && <InLineError message={errors.password} />}
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm Password</label>
                                <input placeholder="Confirm password" name="confirm_password" value={confirm_password} onChange={this.onChangeValue} type="password" />
                                {errors.confirm_password && <InLineError message={errors.confirm_password} />}
                            </Form.Field>
                            <Button type="submit" fluid loading={loading}>Change Password</Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column />
                </Grid.Row>
            </Grid>
        )
    }
}

export default ForgotPassword