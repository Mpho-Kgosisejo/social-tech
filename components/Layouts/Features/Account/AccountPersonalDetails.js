import React from 'react'
import { Form, Button, Divider } from 'semantic-ui-react'

import ContextAPI from "../../../../src/config/ContextAPI"

class AccountPersonalDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    render() {
        // const { isLoading } = this.state

        return (
            <ContextAPI.Consumer>
                {({ state }) =>
                <React.Fragment>
                    {/* <pre>{JSON.stringify(state.account.personal_details.first_name, "", 1)}</pre> */}
                    {/* { isLoading ? < pla} */}
                    <Form>
                        <Form.Field>
                            <label>First name:</label>
                            <input value={state.account.personal_details.first_name} readOnly />
                        </Form.Field>
                        <Form.Field>
                            <label>Last name:</label>
                            <input value={state.account.personal_details.last_name} readOnly />
                        </Form.Field>
                        <Form.Field>
                            <label>Username:</label>
                            <input value={state.account.personal_details.username} readOnly />
                        </Form.Field>
                        <Form.Field>
                            <label>Email address:</label>
                            <input value={state.account.personal_details.email_address}readOnly />
                        </Form.Field>
                        <Form.Field>
                            <label>Phone:</label>
                            <input value={state.account.personal_details.phone} readOnly />
                        </Form.Field>
                        <Form.Field>
                            <label>Delivery address:</label>
                            <input value={state.account.personal_details.delivery_address} readOnly />
                        </Form.Field>
                        <Divider />
                        <Form.Field>
                            <label>Password:</label>
                            <input value={state.account.personal_details.password} readOnly />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </React.Fragment>
                }
                     </ContextAPI.Consumer>
        )
    }
}

export default AccountPersonalDetails