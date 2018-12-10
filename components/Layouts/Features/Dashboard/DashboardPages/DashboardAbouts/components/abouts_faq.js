import React from 'react'
import { Container, Form, TextArea, Button, Tab, Input, Rating, Header } from 'semantic-ui-react'
// import ContextAPI from "../../../../../../src/config/ContextAPI";
// import { isEmptyObj } from "../../../../../../src/utils/Objs"
// import { InLineError } from '../../../../../Messages/InLineMessage'
// import * as MessageTypes from "../../../../../../src/Types/ColorsTypes"

class AboutFaqs extends React.Component {

    render() {
        return (

            <div>
                <div className="dashboard-page-container">
                    <div className="form-upload-header">
                        <h3>Upload About FAQs</h3>
                    </div>
                    <Tab.Pane attached={false}>
                        <Form>
                            <Form.Field>
                                Question<Input placeholder='Add a question eg. Who is the owner of fresh eats?...' action={<Button className="form-button-submit">Add</Button>}></Input>
                            </Form.Field>
                            <Form.Field>
                                <Form.TextArea label='Answer' placeholder='eg. Mpumi is the owner...' />
                            </Form.Field>
                            <Button className="form-button-submit" size='large' primary type='submit'>Submit</Button>
                        </Form>
                    </Tab.Pane>
                </div>
            </div>
        )

    }
}
export default AboutFaqs