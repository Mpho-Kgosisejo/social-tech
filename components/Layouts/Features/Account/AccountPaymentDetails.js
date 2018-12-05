import React from 'react'
import { Form, Radio, Icon, Divider, Dropdown, Input } from 'semantic-ui-react'
import { languageOptions } from 'common'

class AccountPaymentDetails extends React.Component {
    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Country:</label>
                    <Dropdown options={[]} search selection placeholder='South Africa' noResultsMessage={null} disabled/>
                </Form.Field>
                <Form.Field>
                    <label>Address:</label>
                    <input value="Thato" readOnly />
                </Form.Field>
                <Form.Field>
                    <label>City:</label>
                    <input value="Thato" readOnly />
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Field control={Input} label='Expiration date' placeholder='MM/YY' />
                    <Form.Field control={Input} label='CVV' placeholder='CVV' />
                </Form.Group>
                <Form.Field>
                    <label>Payment type:</label>
                    <Radio label='Credit Card' defaultChecked />
                </Form.Field>
                <Icon name="cc visa" size="big" />
                <Icon name="cc mastercard" size="big" />
                <Icon name="cc paypal" size="big" />
                <Icon name="cc amazon pay" size="big" />
                <Divider hidden/>
                <Form.Field>
                    <label>Card Number:</label>
                    <input value="Thato" readOnly />
                </Form.Field>
                <Form.Field>
                    <label>Name on Card:</label>
                    <input value="Thato" readOnly />
                </Form.Field>
            </Form>
        )
    }
}

export default AccountPaymentDetails