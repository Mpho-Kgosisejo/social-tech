import {Form, Button, Icon, Grid} from "semantic-ui-react"

import InLineError from "../../../Messages/InLineError"
import * as MessageTypes from "../../../../src/Types/MessageTypes"

class SignInForm extends React.Component{
    constructor(){
        super()

        this.state = {
            user: {
                login: "",
                password: ""
            },
            loading: false,
            errors: {}
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
        const {user, loading, errors} = this.state

        return (
            <React.Fragment>
                <Grid columns="equal">
                    <Grid.Column></Grid.Column>
                    <Grid.Column mobile={16} tablet={10} computer={8}>
                        <Form onSubmit={this.onSubmit} loading={loading}>
                            <Form.Field>
                                <label>Login:</label>
                                <input value={user.login} onChange={this.onChange} name="login" placeholder="Username or email" />
                                {errors.login && <InLineError error={errors.login}/>}
                            </Form.Field>
                            <Form.Field>
                                <label>Password:</label>
                                <input value={user.password} onChange={this.onChange} name="password" type="password" placeholder="Password"/>
                                {errors.password && <InLineError error={errors.password}/>}
                            </Form.Field>

                            <Button animated fluid type="submit">
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