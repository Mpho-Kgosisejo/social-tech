import {Form, Button, Icon, Container, Grid, Input} from "semantic-ui-react"
import validator from "validator"

import {FIELD_CANT_BE_EMPTY, INVALID_EMAIL, valueMustBeInLength, PASSWORD_MISMATCH} from "../../../../src/Types/MessageTypes"
import {InLineError, InLineWarning} from "../../../Messages/InLineMessage"
import {MainMessage} from "../../../Messages/Message"

class SignUpForm extends React.Component{
    constructor(){
        super()

        this.state = {
            user: {
                username: "",
                email: "",
                password: "",
                confirmpassword: ""
            },
            errors: {},
            loading: false,
            feedback: {
                type: "info",
                header: "",
                message: ""
            }
        }
    }

    onChange = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })

        if (e.target.name === "confirmpassword"){
            if (e.target.value !== this.state.user.password){
                this.setState({
                    errors: {
                        ...this.state.errors,
                        confirmpassword: PASSWORD_MISMATCH
                    }
                })
            }else{
                this.setState({
                    errors: {
                        ...this.state.errors,
                        confirmpassword: ""
                    }
                })
            }
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        const errors = this.validate(this.state.user)
        this.setState({
            ...this.state.errors,
            errors
        })
        
        if (Object.keys(errors).length === 0){
            this.setState({loading: true})
            setTimeout(() => {

                this.setState({
                    feedback: {
                        type: "success",
                        header: "Demo",
                        message: "Demo task done..."
                    }
                })
                this.resetInputs()
            }, 5000)
        }
    }

    resetInputs = () => this.setState({
        user: {
            username: "",
            email: "",
            password: "",
            confirmpassword: ""
        },
        loading: false
    })
    
    validate = (user) => {
        const password_len = 6
        const errors = {}

        //Validate Username...
        if (!user.username){
            errors.username = FIELD_CANT_BE_EMPTY
        }
        //Validate Email...  
        if (!user.email){
            errors.email = FIELD_CANT_BE_EMPTY
        }else if (!validator.isEmail(user.email)){
            errors.email = INVALID_EMAIL
        }
        //Validate password...
        if (!user.password){
            errors.password = FIELD_CANT_BE_EMPTY
        }else{
            if (user.password.length < password_len){
                errors.password = valueMustBeInLength(password_len)
            }else{
                if (user.password !== user.confirmpassword){
                    // errors.password = PASSWORD_MISMATCH
                    errors.confirmpassword = PASSWORD_MISMATCH
                }else{

                }
            }
        }
        if (!user.confirmpassword && user.password){
            errors.confirmpassword = FIELD_CANT_BE_EMPTY
        }
        return (errors)
    }

    render(){
        const {user, errors, feedback, loading} = this.state

        return (
            <React.Fragment>
                <Grid columns="equal">
                    <Grid.Column></Grid.Column>
                    <Grid.Column mobile={16} tablet={10} computer={8}>
                        {feedback.message && <MainMessage type={feedback.type} header={feedback.header} message={feedback.message} />}
                        
                        <Form onSubmit={this.onSubmit} loading={loading}>
                            <Form.Field>
                                <label>Username:</label>
                                <input value={user.username} onChange={this.onChange} name="username" placeholder="Username" />
                                {errors.username && <InLineError message={errors.username}/>}
                            </Form.Field>
                            <Form.Field>
                                <label>Email:</label>
                                <Input iconPosition="left" value={user.email} onChange={this.onChange} name="email" placeholder="Email">
                                    <Icon name="at"/>
                                    <input />
                                </Input>
                                {errors.email && <InLineError message={errors.email}/>}
                            </Form.Field>

                            <Form.Field>
                                <label>Password:</label>
                                <input value={user.password} onChange={this.onChange} name="password" placeholder="Password" type="password" />
                                {errors.password && <InLineError message={errors.password}/>}
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm Password:</label>
                                <input value={user.confirmpassword} onChange={this.onChange} name="confirmpassword" placeholder="Confirm password" type="password" />
                                {errors.confirmpassword && <InLineError message={errors.confirmpassword}/>}
                            </Form.Field>

                            <Button animated fluid type="submit" loading={loading}>
                                <Button.Content visible>Sign Up</Button.Content>
                                <Button.Content hidden>
                                    <Icon name="signup"/>
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

export default SignUpForm