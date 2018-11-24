import React from 'react'
import {Form} from 'semantic-ui-react'


class AccountPersonalDetails extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="account-personal-details">
                    <Form>
                        <Form.Field>
                            <label>First name:</label>
                            <input />
                        </Form.Field>
                        <Form.Field>
                            <label>Last name:</label>
                            <input />
                        </Form.Field>
                        <Form.Field>
                            <label>Username:</label>
                            <input />
                        </Form.Field>
                        <Form.Field>
                            <label>Email address:</label>
                            <input />
                        </Form.Field>
                        <Form.Field>
                            <label>Phone:</label>
                            <input />
                        </Form.Field>
                        <Form.Field>
                            <label>Occupation:</label>
                            <input />
                        </Form.Field>
                        <Form.Field>
                            <label>Bio:</label>
                            <textarea />
                        </Form.Field>

                    </Form>
                </div>
            </React.Fragment>
        )
    }
}

export default AccountPersonalDetails