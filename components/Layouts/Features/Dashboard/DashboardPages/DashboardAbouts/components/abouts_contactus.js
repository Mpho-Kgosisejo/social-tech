import React from 'react'
import { Container, Form, Button, Tab, Input, Select } from 'semantic-ui-react'
import ContextAPI from "../../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes"
import validator from 'validator'
import api from '../../../../../../../src/providers/APIRequest';


const daysOTW = [
    { text: 'Monday', value: 'Monday' },
    { text: 'Tuesday', value: 'Tuesday' },
    { text: 'Wednesday', value: 'Wednesday' },
    { text: 'Thursday', value: 'Thursday' },
    { text: 'Friday', value: 'Friday' },
    { text: 'Saturday', value: 'Saturday' },
    { text: 'Sunday', value: 'Sunday' }
]

class AboutContactUs extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            contactUs: {
                _id : "",
                address_1: "",
                address_2: "",
                address_3: "",
                city: "",
                email: "",
                tel: "",
                fax: "",
                chefs_phone: "",
                day_one: "",
                day_two: "",
                time_one: "",
                time_two: "",
            },
            errors: {}

        }
    }

    getContactDetails = async () => {
        const res = await api.web.getAboutContactDetails()

        if (!isEmptyObj(res.data.contact_us))
        {
            const businessHours = res.data.contact_us[0].business_hours.split(' ')
            this.setState({
                contactUs : {
                    ...this.state.contactUs,
                    ...res.data.contact_us[0],
                    day_one: businessHours[4],
                    day_two: businessHours[6],
                    time_one: businessHours[0],
                    time_two: businessHours[2],
                }
            })
        }

        
    }

    componentDidMount () {
        this.getContactDetails()
    }

    validate = () => {
        const {
            address_1,
            address_2,
            address_3,
            city,
            email,
            tel,
            fax,
            chefs_phone,
            day_one,
            day_two,
            time_one,
            time_two } = this.state.contactUs
        const errors = {}

        // if (validator.isEmpty(description, {
        //     ignore_whitespace: true
        // })) {
        //     errors.description = MessageTypes.FIELD_CANT_BE_EMPTY
        // }

        if (validator.isEmpty(address_1, {
            ignore_whitespace: true
        })) {
            errors.address_1 = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        if (validator.isEmpty(address_2, {
            ignore_whitespace: true
        })) {
            errors.address_2 = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        if (validator.isEmpty(address_3, {
            ignore_whitespace: true
        })) {
            errors.address_3 = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        if (validator.isEmpty(city, {
            ignore_whitespace: true
        })) {
            errors.city = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        if (!validator.isEmail(email)) {
            errors.email = MessageTypes.INVALID_EMAIL
        }
        if (!validator.isMobilePhone(tel, ['en-ZA'])) {
            errors.tel = MessageTypes.INVALID_PHONE_NUMBER
        }
        // if (!validator.isMobilePhone(phone, ['en-ZA'])) {
        //     errors.phone = MessageTypes.INVALID_PHONE_NUMBER
        // }
        if (!validator.isMobilePhone(fax, ['en-ZA'])) {
            errors.fax = MessageTypes.INVALID_PHONE_NUMBER
        }
        if (!validator.isMobilePhone(chefs_phone, ['en-ZA'])) {
            errors.chefs_phone = MessageTypes.INVALID_PHONE_NUMBER
        }
        if (validator.isEmpty(day_one, {
            ignore_whitespace: true
        })) {
            errors.day_one = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        if (validator.isEmpty(day_two, {
            ignore_whitespace: true
        })) {
            errors.day_two = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (validator.isEmpty(time_one, {
            ignore_whitespace: true
        })) {
            errors.time_one = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        if (validator.isEmpty(time_two, {
            ignore_whitespace: true
        })) {
            errors.time_one = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        // if (validator.isEmpty(except, {
        //     ignore_whitespace: true
        // })) {
        //     errors.except = MessageTypes.FIELD_CANT_BE_EMPTY
        // }

        return (errors)

    }

    onclickSubmit = async () => {
        const errors = this.validate()
        
        this.setState({
            errors
        })

        if (Object.keys(errors).length <= 0){
            const res = await api.web.updateAboutContactDetails(this.state.contactUs)
            console.log(res)
            if (res.status == "200") {
                //do some alert that will show the user that we updated 
            }
            else {
                //do some alert that will show the user that we COULD NOT update
            }
        }

    }
    onChangeDropdown = (e, { name, value }) => {
        this.setState({
            contactUs: {
                ...this.state.contactUs,
                [name]: value
            }
        })
    }

    onChange = (e) => {
        this.setState({
            contactUs: {
                ...this.state.contactUs,
                [e.target.name]: e.target.value
            }
        })
    }


    render() {
        const { errors, contactUs, cityOptions } = this.state
        return (
            <div>
                <div className="dashboard-page-container">
                    <div className="form-upload-header">
                        <h3>Upload Contact Us</h3>
                    </div>
                    <Tab.Pane attached={false}>
                        <Form>
                            {/* <Form.Field error={!isEmptyObj(errors.description)}>
                                Description <Input name="description" value={contactUs.description} placeholder='Any reason why people should contact you' onChange={this.onChange} />
                                {errors.description && <InLineError message={errors.description} />}
                            </Form.Field> */}
                            <Form.Group  widths={3}>
                                <Form.Field error={!isEmptyObj(errors.address_1)}>
                                    <Form.Input label='Address 1' name="address_1" value={contactUs.address_1} placeholder='address' onChange={this.onChange} />
                                    {errors.address_1 && <InLineError message={errors.address_1} />}
                                </Form.Field>
                                <Form.Field error={!isEmptyObj(errors.address_2)}>
                                    <Form.Input label='Address 2' name="address_2" value={contactUs.address_2} placeholder='address' onChange={this.onChange} />
                                    {errors.address_2 && <InLineError message={errors.address_2} />}
                                </Form.Field>
                                <Form.Field error={!isEmptyObj(errors.address_3)}>
                                    <Form.Input label='Postal Code' name="address_3" value={contactUs.address_3} placeholder='Postal Code' onChange={this.onChange} />
                                    {errors.address_3 && <InLineError message={errors.address_3} />}
                                </Form.Field>
                            </Form.Group>
                            <Form.Field error={!isEmptyObj(errors.city)}>
                                City <Input name="city" value={contactUs.city} placeholder='city' onChange={this.onChange} />
                                {errors.city && <InLineError message={contactUs.city} />}
                            </Form.Field>
                            <Form.Field error={!isEmptyObj(errors.email)}>
                                <Form.Input type='email' label='Email' name="email" value={contactUs.email} placeholder='joe@schmoe.com' onChange={this.onChange} />
                                {errors.email && <InLineError message={errors.email} />}
                            </Form.Field>
                            <Form.Group widths={3}>
                                <Form.Field error={!isEmptyObj(errors.tel)}>
                                    <Form.Input label='Tel' name="tel" value={contactUs.tel} placeholder='landline' onChange={this.onChange} />
                                    {errors.tel && <InLineError message={errors.tel} />}
                                </Form.Field>
                                {/* <Form.Field error={!isEmptyObj(errors.phone)}>
                                    <Form.Input label='Phone' name="phone" value={contactUs.phone} placeholder='cell phone' onChange={this.onChange} />
                                    {errors.phone && <InLineError message={errors.phone} />}
                                </Form.Field> */}
                                <Form.Field error={!isEmptyObj(errors.fax)}>
                                    <Form.Input label="Fax" name="fax" value={contactUs.fax} placeholder='fax number' onChange={this.onChange} />
                                    {errors.fax && <InLineError message={errors.fax} />}
                                </Form.Field>
                                <Form.Field error={!isEmptyObj(errors.chefs_phone)}>
                                    <Form.Input label="Chefs Phone" name="chefs_phone" value={contactUs.chefs_phone} placeholder='chefs phone' onChange={this.onChange} />
                                    {errors.chefs_phone && <InLineError message={errors.chefs_phone} />}
                                </Form.Field>
                            </Form.Group>
                            <Form.Group  widths={2}>Business Hours
                                <Form.Field error={!isEmptyObj(errors.day_one)}>
                                    <Form.Select value={contactUs.day_one} label='' name="day_one" placeholder='Monday' options={daysOTW} onChange={this.onChangeDropdown} />
                                    {errors.day_one && <InLineError message={errors.day_one} />}
                                    </Form.Field>To
                                <Form.Field error={!isEmptyObj(errors.day_two)}>
                                    <Form.Select value={contactUs.day_two} label='' name="day_two" placeholder='Friday' options={daysOTW} onChange={this.onChangeDropdown} />
                                    {errors.day_two && <InLineError message={errors.day_two} />}
                                </Form.Field>
                                <Form.Field error={!isEmptyObj(errors.time_one)}>
                                    <Form.Input type="time" name="time_one" value={contactUs.time_one} placeholder='Search...' onChange={this.onChange} />
                                    {errors.time_one && <InLineError message={errors.time_one} />}
                                </Form.Field>To
                                <Form.Field error={!isEmptyObj(errors.time_two)}>
                                    <Form.Input type="time" name="time_two" value={contactUs.time_two} placeholder='Search...' onChange={this.onChange} />
                                    {errors.time_two && <InLineError message={errors.time_two} />}
                                </Form.Field>
                                {/* <Form.Field error={!isEmptyObj(errors.except)}>
                                    <Form.Input label='' name="except" value={contactUs.except} placeholder='Except public holidays' onChange={this.onChange} />
                                    {errors.except && <InLineError message={errors.except} />}
                                </Form.Field> */}
                            </Form.Group>
                            <Button className="form-button-submit" size='large' primary type='submit' onClick={this.onclickSubmit} >Submit</Button>
                        </Form>
                        <pre>{JSON.stringify(this.state.contactUs, null, 2)}</pre>
                    </Tab.Pane>
                </div>
            </div>
        )


    }


}
export default AboutContactUs