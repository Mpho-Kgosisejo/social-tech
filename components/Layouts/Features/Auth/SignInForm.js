import {Form, Button, Icon, Grid, Input, Label} from "semantic-ui-react"
import validator from "validator"

import {InLineError} from "../../../Messages/InLineMessage"
import * as MessageTypes from "../../../../src/Types/MessageTypes"
import {MainMessage} from "../../../Messages/Message"
import api from "../../../../src/providers/APIRequest"
import {login} from "../../../../src/providers/LoginSession"
import { isEmptyObj } from "../../../../src/utils/Objs";

class SignInForm extends React.Component{
    constructor(){
        super()

        this.state = {
            user: {
                login: "",
                password: ""
            },
            loading: false,
            errors: {},
            feedback: {
                type: "info",
                header: "",
                message: ""
            }
        }
    }

    onChange = (e) => this.setState({
        user: {
            ...this.state.user,
            [e.target.name]: e.target.value
        }
    })

    onSubmit = (e) => {
        e.preventDefault()
        const errors = this.validate(this.state.user)
        this.setState({
            ...this.state.errors,
            errors
        })

        if (Object.keys(errors).length === 0){
            this.doSignIn()
        }
    }

    resetInputs = (resetAll = true) => {
        if (resetAll){
            this.setState({
                user: {
                    login: "",
                    password: ""
                },
                loading: false
            })
        }else{
            this.setState({
                user: {
                    ...this.state.user,
                    password: ""
                },
                loading: false
            })
        }
    }

    doSignIn = async () => {
        const loginType = (!validator.isEmail(this.state.user.login)) ? "username" : "email"

        this.setState({loading: true})
        const res = await api.user.signin({
            login: {
                key: loginType,
                value: this.state.user.login
            },
            password: this.state.user.password,
        })

        if (res.status === 200){
            this.setState({
                feedback: {
                    type: "success",
                    header: MessageTypes.SIGNIN_SUCCESS,
                    message: MessageTypes.SUCCESSFULLY_LOGGED_IN
                }
            })

            login(res.data.data)
            this.resetInputs()
            //location.reload(true)
        }
        else if (res.status === 401){
            this.setState({
                feedback: {
                    type: "error",
                    // header: MessageTypes.INCORRECT_CREDENTIALS,
                    message: res.data.error.message || MessageTypes.INCORRECT_LOGIN_OR_PASSWORD
                }
            })
            this.resetInputs(false)
        }else{
            this.setState({
                feedback: {
                    type: "error",
                    header: MessageTypes.UNEXPECTED_ERROR,
                    message: MessageTypes.TRY_AGAIN_LATER
                }
            })
            this.resetInputs(false)
        }
    }

    validate = (user) => {
        const errors = {}

        if (!user.login){
            errors.login = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        if (!user.password){
            errors.password = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        return (errors)
    }

    render(){
        const {user, loading, errors, feedback} = this.state

        return (
            <React.Fragment>
                <Grid columns="equal">
                    <Grid.Column></Grid.Column>
                    <Grid.Column mobile={16} tablet={10} computer={8}>
                        {feedback.message && <MainMessage type={feedback.type} header={feedback.header} message={feedback.message} />}
                        
                        <Form onSubmit={this.onSubmit} loading={loading}>
                            <Form.Field error={!isEmptyObj(errors.login)}>
                                <label>Login:</label>
                                <input value={user.login} onChange={this.onChange} name="login" placeholder="Username or email" />
                                {errors.login && <InLineError message={errors.login}/>}
                            </Form.Field>
                            <Form.Field error={!isEmptyObj(errors.password)}>
                                <label>Password:</label>
                                <Input value={user.password} onChange={this.onChange} name="password" type="password" placeholder="Password"/>
                                {errors.password && <InLineError message={errors.password}/>}
                            </Form.Field>

                            <Button animated fluid type="submit" loading={loading}>
                                <Button.Content visible>Sign In</Button.Content>
                                <Button.Content hidden>
                                    <Icon name="sign in"/>
                                </Button.Content>
                            </Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid>
            </React.Fragment>
        )
    }
}

export default SignInForm