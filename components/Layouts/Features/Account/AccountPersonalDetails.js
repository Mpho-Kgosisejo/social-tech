import React from 'react'
import {Form, Button, Divider} from 'semantic-ui-react'


class AccountPersonalDetails extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="account-personal-details">
                    <Form>
                        <Form.Field>
                            <label>First name:</label>
                            <input value="Thato" readOnly/>
                        </Form.Field>
                        <Form.Field>
                            <label>Last name:</label>
                            <input value="Mekwa" readOnly/>
                        </Form.Field>
                        <Form.Field>
                            <label>Username:</label>
                            <input value="tmekwa" readOnly/>
                        </Form.Field>
                        <Form.Field>
                            <label>Email address:</label>
                            <input value="tmekwa@gmail.com" readOnly/>
                        </Form.Field>
                        <Form.Field>
                            <label>Phone:</label>
                            <input value="0123456789" readOnly/>
                        </Form.Field>
                        <Form.Field>
                            <label>Occupation:</label>
                            <input value="Student" readOnly/>
                        </Form.Field>
                        <Form.Field>
                            <label>Bio:</label>
                            <textarea value="Pickle Rick oooooooooo motherfuckers im alive and im coming to your school bitch argh and we going to make more seasons bitch in your face wrinkled scrotum bitch from Mars im coming for you hahahahahahah nine for seasons bitch yea nine more and im get that sauce" readOnly/>
                        </Form.Field>
                        <Divider />
                        <Form.Field>
                            <label>Password:</label>
                            <input value="************" readOnly/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}

export default AccountPersonalDetails