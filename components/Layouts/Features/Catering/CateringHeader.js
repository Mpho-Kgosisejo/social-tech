import { Header, Container, Button, Modal, Icon, Form, Input } from "semantic-ui-react";
import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import validator from "validator"

import CateringBody from "./CateringBody"
import Layout from "../../Layout"
import IndexBannerHeader from "../Index/IndexBannerHeader";
import ContextAPI from "../../../../src/config/ContextAPI";
import GooglePlaceSearch from "../../../utils/GooglePlaceSearch"
import { isEmptyObj } from '../../../../src/utils/Objs';
import { InLineError } from "../../../Messages/InLineMessage"
import API from '../../../../src/providers/APIRequest';
import * as MessageTypes from "../../../../src/Types/MessageTypes"
import { MainMessage } from "../../../Messages/Message";

class CateringHeader extends React.Component {
    constructor() {
        super()
        this.state = {
            client: {
                name: "",
                phone: "",
                email: "",
                event: "",
                startDate: "",
                number: "",
                location: ""

            },

            open: false,
            loading: false,

            errors: {},
            feedback: {
                type: "info",
                header: "",
                message: "Catering event added successfully"
            }

        }
        this.handleChange = this.handleChange.bind(this);
    }

    dispatchLocation= (location) => {
        this.setState({client: {
            ...this.state.client,
            location: location
        }})
    }

    handleChange(date) {
        this.setState({
            client: {
                ...this.state.client,
                startDate: date.toString()
            }
        });
    }

    onChange = (e) => this.setState({
        ...this.state,
        client: {
            ...this.state.client,
            [e.target.name]: e.target.value
        }
    })

    onSubmit = (e) => {
        e.preventDefault()
        const errors = this.validate(this.state.client)
        this.setState({
            errors
        })

        if (Object.keys(errors).length === 0){
            this.doCater()
        }
    }

    resetInputs = () => this.setState({
        client: {
            name: "",
            phone: "",
            email: "",
            event: "",
            startDate: "",
            number: "",
            location: ""
        },
        loading: false
    })

    validate = (client) => {
        const errors = {}
        
        if (!client.name) {
            errors.name = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (!client.phone) {
            errors.phone = MessageTypes.FIELD_CANT_BE_EMPTY
        } else if (!validator.isMobilePhone(client.phone, "en-ZA")) {
            errors.phone = MessageTypes.INVALID_MOBILE_NUMBER
        }

        if (!client.email) {
            errors.email = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (!client.event) {
            errors.event = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (!client.startDate) {
            errors.startDate = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (!client.location) {
            errors.location = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (!client.number) {
            errors.number = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        return (errors)
    }

    doCater = async () => {
        this.setState({loading: true})
        const res = await API.catering.add(this.state.client)
        
        if (res.status === 200){
            this.setState({
                feedback: {
                    type: "success",
                    header: "",
                    message: "Catering event added successfully"
                },
                client: {
                    name: "",
                    phone: "",
                    email: "",
                    event: "",
                    startDate: "",
                    number: "",
                    location: ""
                },
                loading: false
            })
        }else{
            this.setState({
                feedback: {
                    type: "error",
                    header: "",
                    message: "Something went wrong adding catering event, please try again"
                },
                loading: false
            })
        }
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
    
    render() {
        const { open, client, loading, errors, feedback } = this.state
        return (

                <ContextAPI.Consumer>
                    {({ state }) => (
                        <React.Fragment>
                            <Container>
                                <Modal trigger={<div className="request-catering">
                                    <Button animated="fade" fluid basic>
                                        <Button.Content visible>Request a quick catering... </Button.Content>
                                        <Button.Content hidden>in 5 minutes</Button.Content>
                                    </Button></div>} closeIcon>
                                    <Modal.Header>Lets contact you now!</Modal.Header>
                                    <Form loading={loading}>
                                        <Modal.Content>
                                            <Modal.Description className="form-fields">
                                                {feedback.message && <MainMessage type={feedback.type} header={feedback.header} message={feedback.message}/>}
                                                
                                                {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}

                                                <Form.Group widths='equal'>
                                                    <Form.Field>
                                                        <label>Name:*</label>
                                                        <Input value={client.name} name="name" onChange={this.onChange} />
                                                        {errors.name && <InLineError message={errors.name} />}
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Contact number:*</label>
                                                        <Input value={client.phone} icon="phone" iconPosition='left' name="phone" onChange={this.onChange} />
                                                        {errors.phone && <InLineError message={errors.phone} />}

                                                    </Form.Field>
                                                </Form.Group>
                                                <Form.Group widths='equal'>
                                                    <Form.Field>
                                                        <label>Email address:*</label>
                                                        <Input value={client.email} name="email"  onChange={this.onChange}/>
                                                        {errors.email && <InLineError message={errors.email} />}
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Date of event:*</label>
                                                        <DatePicker
                                                            customInput={<Input />}
                                                            showTimeSelect
                                                            minDate={new Date()}
                                                            timeFormat="HH:mm"
                                                            timeIntervals={15}
                                                            selected={this.state.startDate}
                                                            onChange={this.handleChange}
                                                            value={this.state.client.startDate}
                                                        />
                                                        {errors.startDate && <InLineError message={errors.startDate} />}
                                                        {/* <Input name="dateOfEvent" /> */}
                                                    </Form.Field>
                                                </Form.Group>
                                                <Form.Group widths='equal'>
                                                    <Form.Field>
                                                        <label>Number of people:*</label>
                                                        <Input value={client.number} name="number" onChange={this.onChange}/>
                                                        {errors.number && <InLineError message={errors.number} />}
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Type of event:*</label>
                                                        <Input value={client.event} name="event" onChange={this.onChange}/>
                                                        {errors.event && <InLineError message={errors.event} />}
                                                        </Form.Field>
                                                </Form.Group>
                                                <Form widths="equal">
                                                    <Form.Field>
                                                        <label>Location of event:*</label>
                                                        {/* <Input name="timeOfEvent" /> */}
                                                        <GooglePlaceSearch value={client.location} onChange={this.onChange} dispatchAddress={this.dispatchLocation} name="location" />
                                                        {errors.location && <InLineError message={errors.location} />}
                                                    </Form.Field>
                                                </Form>
                                            </Modal.Description>
                                        </Modal.Content>
                                            <Modal.Actions className="catering-actions">
                                                <Button animated fluid type='submit' onClick={this.onSubmit} loading={loading}>
                                                    <Button.Content visible>Submit</Button.Content>
                                                    <Button.Content hidden><Icon name="checkmark"/></Button.Content>
                                                </Button>
                                            </Modal.Actions>
                                    </Form>
                                </Modal>

                                <div className="catering-title text-align center">
                                    <Header as="h2">{state.catering.event_title}</Header>
                                    <p>{state.catering.desc}</p>
                                </div>
                                <IndexBannerHeader desc="Awesome quotes for our catering service" header="We cater for you" image="https://demos.hogash.com/phaeton-restaurant-html/images/bestservice.jpg" />
                                <CateringBody />

                            </Container>
                        </React.Fragment>
                    )}
                </ContextAPI.Consumer>
            
        )

    }
}
export default CateringHeader