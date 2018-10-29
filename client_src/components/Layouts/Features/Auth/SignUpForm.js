import {Form, Button, Icon, Container, Grid} from "semantic-ui-react"

class SignUpForm extends React.Component{
    render(){
        return (
            <React.Fragment>
                <Grid columns="equal">
                    <Grid.Column></Grid.Column>
                    <Grid.Column mobile={16} tablet={10} computer={8}>
                        <Form>
                            <Form.Field>
                                <label>Username:</label>
                                <input placeholder="Username" />
                            </Form.Field>
                            <Form.Field>
                                <label>Email:</label>
                                <input placeholder="Email" />
                            </Form.Field>

                            <Form.Field>
                                <label>Password:</label>
                                <input placeholder="Password" />
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm Password:</label>
                                <input placeholder="Confirm password" />
                            </Form.Field>

                            <Button animated fluid type="submit">
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