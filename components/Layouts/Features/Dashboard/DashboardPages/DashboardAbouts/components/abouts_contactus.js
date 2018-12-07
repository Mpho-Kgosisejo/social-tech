import React from 'react'
import { Container, Form, TextArea, Button, Tab, Input, Rating, Header } from 'semantic-ui-react'
import ContextAPI from "../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../src/Types/ColorsTypes"

class AboutContactUs extends React.Component {

    render() {
        return (
            <div>
                <div className="dashboard-page-container">
                    <div className="form-upload-header">
                        <h3>Upload Contact Us</h3>
                    </div>
                    <Tab.Pane attached={false}>
                        <Form>
                            <Form.Field>
                                Description <Input name="description" placeholder='Any reason why people should contact you' />
                            </Form.Field>
                            <Form.Group unstackable widths={3}>
                                <Form.Input label='Address 1' placeholder='address' />
                                <Form.Input label='Address 2' placeholder='address' />
                                <Form.Input label="Address 3" placeholder='address' />
                            </Form.Group>
                            <Form.Field>
                                City <Input name="city" placeholder='city' />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input label='Email' placeholder='joe@schmoe.com' />
                            </Form.Field>
                            <Form.Group unstackable widths={4}>
                                <Form.Input label='Tel' placeholder='landline' />
                                <Form.Input label='Phone' placeholder='cell phone' />
                                <Form.Input label="Fax" placeholder='fax number' />
                                <Form.Input label="Chefs Phone" placeholder='chefs phone' />
                            </Form.Group>
                            <Form.Group unstackable widths={2}>Business Hours
                  <Form.Input label='' placeholder='Monday' />To
                  <Form.Input label='' placeholder='Friday' />
                                <Form.Input type="time" placeholder='Search...' />To
                  <Form.Input type="time" placeholder='Search...' />
                                <Form.Input label='' placeholder='Except public holidays' />
                            </Form.Group>
                            <Button className="form-button-submit" size='large' primary type='submit'>Submit</Button>
                        </Form>
                    </Tab.Pane>
                </div>
            </div>
        )


    }

}
export default AboutContactUs