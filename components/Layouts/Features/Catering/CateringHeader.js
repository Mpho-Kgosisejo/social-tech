import { Header, Container, Button, Modal, Icon, Form, Input } from "semantic-ui-react";
import PageHeader from "../../../utils/PageHeader";
import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker'

import CateringBody from "./CateringBody"
import Layout from "../../Layout"
import IndexBannerHeader from "../Index/IndexBannerHeader";
import ContextAPI from "../../../../src/config/ContextAPI";
import GooglePlaceSearch from "../../../utils/GooglePlaceSearch"
import { isEmptyObj } from '../../../../src/utils/Objs';
import { InLineError } from "../../../Messages/InLineMessage"
import API from '../../../../src/providers/APIRequest';
import * as MessageTypes from "../../../../src/Types/MessageTypes"

class CateringHeader extends React.Component {
    constructor() {
        super()
        this.state = {
            client: {
                name: "",
                phone: "",
                email: "",
                event: "",
                startDate: new Date(),
                startTime: "",
                number: "",
                location: ""

            },

            open: false,
            isLoading: false,

            errors: {},
            feedback: {
                type: "info",
                header: "",
                message: ""
            }

        }
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    onChange = (e) => this.setState({
        ...this.state,
        [e.target.name]: e.target.value
    })

    onSubmit = (e, dispatch) => {
        e.preventDefault()

        const errors = this.validate(this.state.client)
        this.state({
            ...this.state.errors,
            errors
        })
    }
    
    dispatchLocation= (location) => {
        this.setState({client: {
            ...this.state.client,
            location: location
        }})
    }

    validate = (client) => {
        const errors = {}

        if (!client.name) {
            errors.login = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (!client.phone) {
            errors.login = MessageTypes.FIELD_CANT_BE_EMPTY
        } else if (!validator.isMobilePhone(user.phone, "en-ZA")) {
            errors.phone = MessageTypes.INVALID_MOBILE_NUMBER
        }

        if (!client.email) {
            errors.login = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (!client.event) {
            errors.login = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (!client.startDate) {
            errors.login = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (!client.startTime) {
            errors.login = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (!client.location) {
            errors.login = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (!client.number) {
            errors.login = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        return (errors)
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
    
    render() {
        const { open, client, loading, errors, feedback } = this.state
        return (
            
            <Layout title="Catering" includeContainer={false}>
                <PageHeader
                    color="rgb(212, 195, 176)"
                    title="Catering services"
                    subtitle="We do catering services for small, medium and large coperates"
                />
                 {/* <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${"AIzaSyCrU9Rw7a253dKb-SMfEeCsGYgFVw9GehQ"}&libraries=places`}></script>  */}
                <ContextAPI.Consumer>
                    {({ state }) => (
                        <React.Fragment>
                            <Container>
                                <Modal trigger={<div className="request-catering">
                                    <Button animated="fade" fluid basic color='red'>
                                        <Button.Content visible>Request a quick catering... </Button.Content>
                                        <Button.Content hidden>in 5 minutes</Button.Content>
                                    </Button></div>}>
                                    <Modal.Header>Lets contact you now!</Modal.Header>
                                    <Form>
                                        <Modal.Content>
                                            <Modal.Description className="form-fields">
                                                <Form.Group widths='equal'>
                                                    <Form.Field error={!isEmptyObj(errors.name)}>
                                                        <label>Name:*</label>
                                                        <Input name="name" />
                                                        {errors.name && <InLineError message={errors.name} />}
                                                    </Form.Field>
                                                    <Form.Field error={!isEmptyObj(errors.phone)}>
                                                        <label>Contact number:*</label>
                                                        <Input icon="phone" iconPosition='left' name="phone" />
                                                        {errors.phone && <InLineError message={errors.phone} />}

                                                    </Form.Field>
                                                </Form.Group>
                                                <Form.Group widths='equal'>
                                                    <Form.Field error={!isEmptyObj(errors.email)}>
                                                        <label>Email address:*</label>
                                                        <Input name="email" />
                                                        {errors.email && <InLineError message={errors.email} />}
                                                    </Form.Field>
                                                    <Form.Field error={!isEmptyObj(errors.event)}>
                                                        <label>Type of event:*</label>
                                                        <Input name="phone" />
                                                    </Form.Field>
                                                    {errors.phone && <InLineError message={errors.phone} />}
                                                </Form.Group>
                                                <Form.Group widths='equal'>
                                                    <Form.Field error={!isEmptyObj(errors.startDate)}>
                                                        <label>Date of event:*</label>
                                                        <DatePicker
                                                            selected={this.state.startDate}
                                                            onChange={this.handleChange}
                                                        />
                                                        {errors.startDate && <InLineError message={errors.startDate} />}
                                                        {/* <Input name="dateOfEvent" /> */}
                                                    </Form.Field>
                                                    <Form.Field error={!isEmptyObj(errors.startTime)}>
                                                        <label>Time of event:*</label>
                                                        {/* <TimePicker name="time" /> */}
                                                        <Input name="timeOfEvent" />
                                                        {errors.startTime && <InLineError message={errors.startTime} />}
                                                        
                                                    </Form.Field>
                                                </Form.Group>
                                                <Form.Group widths='equal'>
                                                    <Form.Field error={!isEmptyObj(errors.number)}>
                                                        <label>Number of people:*</label>
                                                        <Input name="numberOfPeople" />
                                                        {errors.number && <InLineError message={errors.number} />}
                                                    </Form.Field>
                                                    <Form.Field error={!isEmptyObj(errors.location)}>
                                                        <label>Location of event:*</label>
                                                        <Input name="timeOfEvent" />
                                                        {/* <GooglePlaceSearch value={client.address} onChange={this.onChange} dispatchAddress={this.dispatchLocation} name="location" /> */}
                                                        {errors.location && <InLineError message={errors.location} />}
                                                    </Form.Field>
                                                </Form.Group>
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions className="modal-action">
                                            <Modal
                                                open={open}
                                                onOpen={this.open}
                                                onClose={this.close}
                                                size='small'
                                                trigger={
                                                    <Button icon>
                                                        Submit <Icon name='right chevron' />
                                                    </Button>
                                                }
                                            >
                                                <Modal.Header>Confirmation
                                                </Modal.Header>
                                                <Modal.Content>
                                                    <p>Is this your mobile number: +27 78 567 8987</p>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button icon='check' content='All Done' onClick={this.close} />
                                                </Modal.Actions>

                                            </Modal>
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
            </Layout>
        )

    }
}
export default CateringHeader