import React from 'react'
import { Container, Form, Button, Tab, Input, Select } from 'semantic-ui-react'
import ContextAPI from "../../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes"
import validator from 'validator'


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
                description: "",
                address1: "",
                address2: "",
                city: "",
                email: "",
                tel: "",
                phone: "",
                fax: "",
                chefs_phone: "",
                day_one: "",
                day_two: "",
                time_one: "",
                time_two: "",
                except: ""
            },
            errors: {}

        }
    }

    validate = () => {
        const { description,
            address1,
            address2,
            city,
            email,
            tel,
            phone,
            fax,
            chefs_phone,
            day_one,
            day_two,
            time_one,
            time_two,
            except } = this.state.contactUs
        const errors = {}

        if (validator.isEmpty(description, {
            ignore_whitespace: true
        })) {
            errors.description = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if (validator.isEmpty(address1, {
            ignore_whitespace: true
        })) {
            errors.address1 = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        if (validator.isEmpty(address2, {
            ignore_whitespace: true
        })) {
            errors.address2 = MessageTypes.FIELD_CANT_BE_EMPTY
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
        if (!validator.isMobilePhone(phone, ['en-ZA'])) {
            errors.phone = MessageTypes.INVALID_PHONE_NUMBER
        }
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
        if (validator.isEmpty(except, {
            ignore_whitespace: true
        })) {
            errors.except = MessageTypes.FIELD_CANT_BE_EMPTY
        }



        return (errors)

    }

    onclickSubmit = () => {
        const errors = this.validate()
        console.log(errors)
        if (isEmptyObj(errors)) {

            console.log(errors)
            this.setState({
                errors: {}
            })
        }
        else {
            this.setState({
                errors: errors
            })
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
                            <Form.Field error={!isEmptyObj(errors.description)}>
                                Description <Input name="description" value={contactUs.description} placeholder='Any reason why people should contact you' onChange={this.onChange} />
                                {errors.description && <InLineError message={errors.description} />}
                            </Form.Field>
                            <Form.Group unstackable widths={3}>
                                <Form.Field error={!isEmptyObj(errors.address1)}>
                                    <Form.Input label='Address 1' name="address1" value={contactUs.address1} placeholder='address' onChange={this.onChange} />
                                    {errors.address1 && <InLineError message={errors.address1} />}
                                </Form.Field>
                                <Form.Field error={!isEmptyObj(errors.address2)}>
                                    <Form.Input label='Address 2' name="address2" value={contactUs.address2} placeholder='address' onChange={this.onChange} />
                                    {errors.address2 && <InLineError message={errors.address2} />}
                                </Form.Field>
                            </Form.Group>
                            <Form.Field error={!isEmptyObj(errors.city)}>
                                City <Input name="city" value={contactUs.city} placeholder='city' onChange={this.onChange} />
                                {errors.city && <InLineError message={contactUs.city} />}
                            </Form.Field>
                            <Form.Field error={!isEmptyObj(errors.email)}>
                                <Form.Input label='Email' name="email" value={contactUs.email} placeholder='joe@schmoe.com' onChange={this.onChange} />
                                {errors.email && <InLineError message={errors.email} />}
                            </Form.Field>
                            <Form.Group unstackable widths={4}>
                                <Form.Field error={!isEmptyObj(errors.tel)}>
                                    <Form.Input label='Tel' name="tel" value={contactUs.tel} placeholder='landline' onChange={this.onChange} />
                                    {errors.tel && <InLineError message={errors.tel} />}
                                </Form.Field>
                                <Form.Field error={!isEmptyObj(errors.phone)}>
                                    <Form.Input label='Phone' name="phone" value={contactUs.phone} placeholder='cell phone' onChange={this.onChange} />
                                    {errors.phone && <InLineError message={errors.phone} />}
                                </Form.Field>
                                <Form.Field error={!isEmptyObj(errors.fax)}>
                                    <Form.Input label="Fax" name="fax" value={contactUs.fax} placeholder='fax number' onChange={this.onChange} />
                                    {errors.fax && <InLineError message={errors.fax} />}
                                </Form.Field>
                                <Form.Field error={!isEmptyObj(errors.chefs_phone)}>
                                    <Form.Input label="Chefs Phone" name="chefs_phone" value={contactUs.chefs_phone} placeholder='chefs phone' onChange={this.onChange} />
                                    {errors.chefs_phone && <InLineError message={errors.chefs_phone} />}
                                </Form.Field>
                            </Form.Group>
                            <Form.Group unstackable widths={2}>Business Hours
                                <Form.Field error={!isEmptyObj(errors.day_one)}>
                                    <Form.Select label='' name="day_one" placeholder='Monday' options={daysOTW} onChange={this.onChangeDropdown} />
                                    {errors.day_one && <InLineError message={errors.day_one} />}
                                    </Form.Field>To
                                <Form.Field error={!isEmptyObj(errors.day_two)}>
                                    <Form.Select label='' name="day_two" placeholder='Friday' options={daysOTW} onChange={this.onChangeDropdown} />
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
                                <Form.Field error={!isEmptyObj(errors.except)}>
                                    <Form.Input label='' name="except" value={contactUs.except} placeholder='Except public holidays' onChange={this.onChange} />
                                    {errors.except && <InLineError message={errors.except} />}
                                </Form.Field>
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