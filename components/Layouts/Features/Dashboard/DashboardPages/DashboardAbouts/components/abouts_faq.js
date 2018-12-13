import React from 'react'
import { Container, Form, TextArea, Button, Tab, Input, Rating, Header } from 'semantic-ui-react'
import ContextAPI from "../../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes"
import validator from 'validator'

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

    validate = () => {
        const {question, answer} = this.state.aboutFaq
        const errors = {}

        if (validator.isEmpty(question, {
            ignore_whitespace: true
        })) {
            errors.question = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (validator.isEmpty(answer, {
            ignore_whitespace: true
        })) {
            errors.answer = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        return (errors)
    }

    onclickSubmit = () => {
        const errors = this.validate()
        console.log(errors)
        if(isEmptyObj(errors)){

            console.log(errors)
            this.setState({
                errors: {}
            })
        }
        else{
            this.setState({
                errors: errors
            })
        }

    }

    render() {
        const { aboutFaq, 
                errors } = this.state
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
                            <Button className="form-button-submit" size='large' primary type='submit' onClick={this.onclickSubmit} >Submit</Button>
                        </Form>
                        <pre>{JSON.stringify(this.state.aboutFaq, null, 2)}</pre>
                    </Tab.Pane>
                </div>
            </div>
        )

    }
}
export default AboutFaqs