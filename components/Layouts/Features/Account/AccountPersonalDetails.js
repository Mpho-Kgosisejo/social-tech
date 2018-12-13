import React from 'react'
import { Form, Button, Divider, Message, Icon, Input } from 'semantic-ui-react'
import validator from "validator"

import ContextAPI from "../../../../src/config/ContextAPI"
import * as MessageTypes from "../../../../src/Types/MessageTypes"
import { isEmptyObj } from '../../../../src/utils/Objs';
import { InLineError } from "../../../Messages/InLineMessage"
import API from '../../../../src/providers/APIRequest';
import GooglePlaceSearch from "../../../utils/GooglePlaceSearch"

class AccountPersonalDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            user: {
                first_name: "",
                last_name: "",
                phone: "",
                address: ""
            },
            errors: {},
            feedback: {
                type: "info",
                header: "",
                message: ""
            }
        }
    }

    dispatchAddress = (address) => {
        this.setState({user: {
            ...this.state.user,
            address: address
        }})
    }

    onSubmit = (e, dispatch) => {
        e.preventDefault()
        console.log("Testing Button")
        const errors = this.validate(this.state.user)
        this.setState({
            ...this.state.errors,
            errors
        })

        if (Object.keys(errors).length === 0){
            console.log("Testing Objects")
            this.doUpdate(dispatch)
        }
    }

    onChange = (e) => this.setState({
        user: {
            ...this.state.user,
            [e.target.name]: e.target.value
        }
    })

    validate = (user) => {
        const errors = {}

        // Validating Firstname
        if (!user.first_name)
        {
            errors.first_name = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        // Validating Lasstname

        if (!user.last_name)
        {
            errors.last_name = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        // Validating Phone

        if (!user.phone)
        {
            errors.phone = MessageTypes.FIELD_CANT_BE_EMPTY
        }else if (!validator.isMobilePhone(user.phone, "en-ZA")){
            errors.phone = MessageTypes.INVALID_MOBILE_NUMBER
        }

        // Validating Address
        if (!user.address)
        {
            errors.address = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        return (errors)
    }

    doUpdate = async (dispatch) => {
        this.setState({isLoading: true})
        const res = await API.profile.account(this.state.user);

        if (res.status === 200){
            console.log("Yes Momma")
        }else if (res.status === 422){

            console.log("No Momma")
        }
    }

    render() {
        const { isLoading, user, errors, feedback } = this.state

        return (
            <ContextAPI.Consumer>
                {({ state }) =>
                <React.Fragment>
                    {/* <pre>{JSON.stringify(state.account.personal_details.first_name, "", 1)}</pre> */}
                    {/* { isLoading ? < pla} */}
                    <Form onSubmit={(e) => this.onSubmit(e, state.dispatch)} loading={isLoading}>
                        <Form.Field error={!isEmptyObj(errors.first_name)}>
                            <label>First name:</label>
                            <input value={user.first_name} onChange={this.onChange} name="first_name"/>
                            {errors.first_name && <InLineError message={errors.first_name}/>}
                        </Form.Field>
                        <Form.Field error={!isEmptyObj(errors.last_name)}>
                            <label>Last name:</label>
                            <input value={user.last_name} onChange={this.onChange} name="last_name"/>
                            {errors.last_name && <InLineError message={errors.last_name}/>}
                        </Form.Field>
                        <Form.Field disabled>
                            <label>Username:</label>
                            {/* <input value={state.account.personal_details.username}  /> */}
                        </Form.Field>
                        <Form.Field disabled>
                            <label>Email address:</label>
                            {/* <input value={state.account.personal_details.email_address}/> */}
                        </Form.Field>
                        <Form.Field error={!isEmptyObj(errors.phone)}>
                            <label>Phone:</label>
                            <Input icon='phone' iconPosition='left' value={user.phone} onChange={this.onChange} name="phone"  />
                            {errors.phone && <InLineError message={errors.phone}/>}
                        </Form.Field>
                        <Form.Field error={!isEmptyObj(errors.address)}>
                            <label>Delivery address:</label>
                            <GooglePlaceSearch value={user.address} onChange={this.onChange} dispatchAddress={this.dispatchAddress} name="address"/>
                            {errors.address && <InLineError message={errors.address}/>}
                        </Form.Field>
                        <Divider />
                        <Form.Field>
                            <a href="forgot-password">Change Password</a>
                        </Form.Field>
                        <Button animated fluid type='submit'  loading={isLoading}>
                            <Button.Content visible>Update</Button.Content>
                            <Button.Content hidden><Icon name="sign in"/></Button.Content>
                        </Button>
                    </Form>
                </React.Fragment>
                }
                     </ContextAPI.Consumer>
        )
    }
}

export default AccountPersonalDetails