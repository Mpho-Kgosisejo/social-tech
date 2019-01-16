import React from 'react'
import { Modal, Form, TextArea, Button, Tab, Input, List, Header, Segment, Icon, Popup } from 'semantic-ui-react'
import ContextAPI from "../../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes"
import validator from 'validator'
import api from '../../../../../../../src/providers/APIRequest';

class AboutFaqs extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            aboutFaq: {
                question: "",
                answer: ""
            },
            errors: {},
            faqList : [],
            isEditingFAQ : false,
            editID : "",
            editBody : {},
            editErrors : {},
            isDeletingFAQ : false,
            DeleteBody : {}
        }
    }

    getFaqs = async () => {
        const res = await api.web.getFaqs()

        this.setState({
            faqList : res.data.faqs
        })
    }

    componentDidMount ()
    {
        this.getFaqs()
    }

    onChange = (e) => {
        if (e.target.name == "questionEdit")
        {
            this.setState({
                editBody: {
                    ...this.state.editBody,
                    question : e.target.value
                }
            })
        }
        else if (e.target.name == "answerEdit")
        {
            this.setState({
                editBody: {
                    ...this.state.editBody,
                    answer : e.target.value
                }
            })
        }
        else {
            this.setState({
                aboutFaq: {
                    ...this.state.aboutFaq,
                    [e.target.name]: e.target.value
                }
            })
        }
    }

    enterExitDeleteMode = async (delBody) => {
        if (this.state.isDeletingFAQ)
            this.setState({ isDeletingFAQ : false})
        else
            this.setState({ isDeletingFAQ : true, DeleteBody : delBody })
    }

    enterCloseEditMode = async (edBody) => {
        if (this.state.isEditingFAQ)
        {
            const errors = this.validateEdit()

            if (isEmptyObj(errors))
            {
                const res = await api.web.updateFAQ(this.state.editBody)
                this.setState({
                    editErrors: {},
                    isEditingFAQ : false,
                    faqList : res.data.faqs
                })
            }
            else {
                this.setState({
                    editErrors: errors
                })
            }
        }
        else
            this.setState({ isEditingFAQ : true, editID : edBody._id, editBody : edBody })
    }

    validateEdit = () => {

        const errors = {}

        if (validator.isEmpty(this.state.editBody.question, {
            ignore_whitespace: true
        })) {
            errors.Editquestion = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (validator.isEmpty(this.state.editBody.answer, {
            ignore_whitespace: true
        })) {
            errors.EditAnswer = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        return (errors)

    }

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

    onclickSubmit = async () => {
        const errors = this.validate()
        if(isEmptyObj(errors)){
            const res = await api.web.uploadFAQ(this.state.aboutFaq)
            this.setState({
                errors: {},
                faqList : res.data.faqs
            })
        }
        else{
            this.setState({
                errors: errors
            })
        }
    }

    confirmFAQdeletion = async () => {
        const res = await api.web.deleteFAQ(this.state.DeleteBody)
        this.setState({
            DeleteBody : {},
            faqList : res.data.faqs,
            isDeletingFAQ : false
        })
    }

    render() {
        const { aboutFaq, errors, faqList, isEditingFAQ, editID, editBody, editErrors, isDeletingFAQ } = this.state

        return (
            <div>
                <div className="dashboard-page-container">
                    <div className="form-upload-header">
                        <h3>Upload FAQs</h3>
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
                    </Tab.Pane>

                    <div className="form-upload-header">
                        <h3>Edit or Delete FAQs</h3>
                    </div>

                    <Segment>
                            <List divided relaxed>
                                {faqList.map(FAQ => (
                                    <List.Item id={FAQ.answer}>
                                        {/* <List.Icon name='question' size='large' verticalAlign='middle' /> */}
                                        <List.Content>
                                            { (isEditingFAQ && editID === FAQ._id ) ? 
                                                <Form>
                                                    <Form.Field error={!isEmptyObj(editErrors.Editquestion)}>
                                                        <Input name='questionEdit' onChange={this.onChange} value={editBody.question} fluid placeholder='Question'/>
                                                        {editErrors.Editquestion && <InLineError message={editErrors.Editquestion} />}
                                                    </Form.Field>
                                                    <Form.Field error={!isEmptyObj(editErrors.EditAnswer)}>
                                                        <TextArea name='answerEdit' onChange={this.onChange} value={editBody.answer} placeholder='Answer' />
                                                        {editErrors.EditAnswer && <InLineError message={editErrors.EditAnswer} />}
                                                    </Form.Field>
                                                </Form> : 
                                                <div>
                                                    <List.Header as='a'>Q : {FAQ.question}</List.Header>
                                                    <List.Description as='a'> A : {FAQ.answer}</List.Description> 
                                                </div>
                                            }

                                        </List.Content>
                                        <List.Content floated='right'>
                                            <Popup trigger={<Icon onClick={() => this.enterCloseEditMode(FAQ)}  name={isEditingFAQ && editID === FAQ._id ? 'check' : 'edit'}/>} content={isEditingFAQ && editID === FAQ._id ? 'save' : 'edit'} />
                                            <Popup trigger={<Icon onClick={() => this.enterExitDeleteMode(FAQ)} name='delete'/>} content='delete'/>
                                        </List.Content>
                                    </List.Item>
                                ))}
                            </List>
                        </Segment>
                        {/* <pre>{JSON.stringify(this.state.aboutFaq, null, 2)}</pre> */}
                        {/* modal will be called when the delete faq icon is called */}
                        <Modal open={isDeletingFAQ} basic size='small'>
                            <Header content='Warning! This Action is irriversible'/>
                            <Modal.Content>
                                <p>
                                    Are you sure you want to delete this Frequently asked question? Press No to cancel the operation and Yes to continue.
                                </p>
                            </Modal.Content>
                            <Modal.Actions>
                            <Button onClick={() => this.enterExitDeleteMode()} basic color='red' inverted>
                                <Icon name='remove' /> No
                            </Button>
                            <Button onClick={() => this.confirmFAQdeletion()} color='green' inverted>
                                <Icon name='checkmark' /> Yes
                            </Button>
                            </Modal.Actions>
                        </Modal> 
                </div>
            </div>
        )

    }
}
export default AboutFaqs