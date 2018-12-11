import React from 'react'
import { Container, Form, TextArea, Button, Tab, Input, Rating, Header } from 'semantic-ui-react'
import ContextAPI from "../../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../../src/Types/ColorsTypes"

class AboutFaqs extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            aboutFaq: {
                question: "",
                answer: ""
            },
            errors: {}
        }
    }

    onChange = (e) => this.setState({
        aboutFaq: {
            ...this.state.aboutFaq,
            [e.target.name]: e.target.value
        }
    })

    render() {
        const { aboutFaq, errors } = this.state
        return (

            <div>
                <div className="dashboard-page-container">
                    <div className="form-upload-header">
                        <h3>Upload About FAQs</h3>
                    </div>
                    <Tab.Pane attached={false}>
                        <Form>
                            <Form.Field error={!isEmptyObj(errors.question)}>
                                Question<Input placeholder='Add a question eg. Who is the owner of fresh eats?...' name="question" value={aboutFaq.question} onChange={this.onChange}></Input>
                                {errors.question && <InLineError message={errors.question} />}
                            </Form.Field>
                            <Form.Field error={!isEmptyObj(errors.answer)}>
                                <Form.TextArea label='Answer' name="answer" value={aboutFaq.answer} placeholder='eg. Mpumi is the owner...' onChange={this.onChange}/>
                                {errors.answer && <InLineError message={errors.answer} />}
                            </Form.Field>
                            <Button className="form-button-submit" size='large' primary type='submit'>Submit</Button>
                        </Form>
                        <pre>{JSON.stringify(this.state.aboutFaq, null, 2)}</pre>
                    </Tab.Pane>
                </div>
            </div>
        )

    }
}
export default AboutFaqs