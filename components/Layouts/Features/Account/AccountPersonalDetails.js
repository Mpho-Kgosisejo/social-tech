import React from 'react'
import { Form, Button, Divider, Message, Icon, Input } from 'semantic-ui-react'
import validator from "validator"

import ContextAPI from "../../../../src/config/ContextAPI"
import * as MessageTypes from "../../../../src/Types/MessageTypes"
import { isEmptyObj } from '../../../../src/utils/Objs';
import { InLineError } from "../../../Messages/InLineMessage"
import API from '../../../../src/providers/APIRequest';
import GooglePlaceSearch from "../../../utils/GooglePlaceSearch"

export const DefaultForm = ({root_loading, email, username, firstname, lastname, address, phone}) => (
    <Form loading={root_loading}>
        <Form.Field>
            <label>First name:</label>
            <input disabled defaultValue={firstname}/>
        </Form.Field>
        <Form.Field>
            <label>Last name:</label>
            <input disabled defaultValue={lastname}/>
        </Form.Field>
        <Form.Field disabled>
            <label>Username:</label>
            <input disabled defaultValue={username}/>
        </Form.Field>
        <Form.Field disabled>
            <label>Email address:</label>
            <input disabled defaultValue={email}/>
        </Form.Field>
        <Form.Field>
            <label>Phone:</label>
            <Input disabled icon='phone' iconPosition='left' value={phone} />
        </Form.Field>
        <Form.Field >
            <label>Delivery address:</label>
            <input disabled defaultValue={address}/>
        </Form.Field>
        <Divider />
        <Form.Field>
            <a href="forgot-password">Change Password</a>
        </Form.Field>
        <Button disabled animated fluid type='submit'>
            <Button.Content visible>Update</Button.Content>
            <Button.Content hidden><Icon name="sign in"/></Button.Content>
        </Button>
    </Form>
)

const Editable = ({user, root_state, onSubmit, isLoading, errors, onChange, dispatchAddress, toggleEdit}) => (
    <Form loading={root_state.root_loading} onSubmit={(e) => onSubmit(e, root_state.dispatch, toggleEdit)} loading={isLoading}>
        <Form.Field error={!isEmptyObj(errors.firstname)}>
            <label>First name:</label>
            <input value={user.firstname} onChange={onChange} name="firstname"/>
            {errors.firstname && <InLineError message={errors.firstname}/>}
        </Form.Field>
        <Form.Field error={!isEmptyObj(errors.lastname)}>
            <label>Last name:</label>
            <input value={user.lastname} onChange={onChange} name="lastname"/>
            {errors.lastname && <InLineError message={errors.lastname}/>}
        </Form.Field>
        <Form.Field disabled>
            <label>Username:</label>
            <input defaultValue={root_state.account.personal_details.username}  />
        </Form.Field>
        <Form.Field disabled>
            <label>Email address:</label>
            <input defaultValue={root_state.account.personal_details.email}/>
        </Form.Field>
        <Form.Field error={!isEmptyObj(errors.phone)}>
            <label>Phone:</label>
            <Input icon='phone' iconPosition='left' value={user.phone} onChange={onChange} name="phone"  />
            {errors.phone && <InLineError message={errors.phone}/>}
        </Form.Field>
        <Form.Field error={!isEmptyObj(errors.address)}>
            <label>Delivery address:</label>
            <GooglePlaceSearch value={user.address} onChange={onChange} dispatchAddress={dispatchAddress} name="address"/>
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
)

class AccountPersonalDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            user: {
                firstname: "dddd",
                lastname: "",
                phone: "",
                address: "",
                email: ""
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

    onSubmit = (e, dispatch, toggleEdit) => {
        e.preventDefault()
        const errors = this.validate(this.state.user)
        this.setState({
            ...this.state.errors,
            errors
        })

        if (Object.keys(errors).length === 0){
            this.doUpdate(dispatch, toggleEdit)
        }
    }

    onChange = (e) => this.setState({
        user: {
            ...this.state.user,
            [e.target.name]: e.target.value
        }
    })

    updateLocalState = () => {
        const {account} = this.props

        if (process.browser){
            this.setState({
                ...this.state,
                user: {...account.personal_details}
            })
        }
    }

    validate = (user) => {
        const errors = {}

        // Validating Firstname
        if (!user.firstname)
        {
            errors.firstname = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        // Validating Lasstname

        if (!user.lastname)
        {
            errors.lastname = MessageTypes.FIELD_CANT_BE_EMPTY
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

    doUpdate = async (dispatch, toggleEdit) => {
        this.setState({isLoading: true})
        const res = await API.profile.account_update(this.state.user);

        if (res.status === 200){
            this.setState({isLoading: false})
            dispatch({type : "ALERT_PORTAL", payload : {
                open : true, 
                type : '',
                message : "Profile successfully updated"
            }}) 
            dispatch({type: "ACCOUNT_PERSONAL_DETAILS", payload: res.data.user })
            toggleEdit()
        }else {
            this.setState({isLoading: false})
        }
    }

    componentDidMount(){
        this.updateLocalState()
    }

    render() {
        const { isLoading, user, errors, feedback } = this.state
        const {edit, toggleEdit } = this.props
        return (
            <ContextAPI.Consumer>
                {({ state }) => {
                    return (
                        <React.Fragment>
                            {(edit) ?
                                <Editable
                                    toggleEdit= {toggleEdit} 
                                    user={user}
                                    root_state={state}
                                    onSubmit={this.onSubmit}
                                    isLoading={isLoading}
                                    errors={errors}
                                    onChange={this.onChange}
                                    dispatchAddress={this.dispatchAddress}
                                /> :
                                <DefaultForm root_loading={state.root_loading} {...state.account.personal_details} />
                            }
                        </React.Fragment>
                        
                    )
                }}
                     </ContextAPI.Consumer>
        )
    }
}

export default AccountPersonalDetails