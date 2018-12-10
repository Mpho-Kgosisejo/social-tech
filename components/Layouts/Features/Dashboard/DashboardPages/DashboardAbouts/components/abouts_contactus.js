import React from 'react'
import { Container, Form, TextArea, Button, Tab, Input, Rating, Header } from 'semantic-ui-react'
import ContextAPI from "../../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../../src/Types/ColorsTypes"

class AboutContactUs extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            contactUs: {
                description: "",
                address1: "",
                address2: "",
                address3: "",
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
    onChange = (e) => this.setState({
        contactUs: {
            ...this.state.contactUs,
            [e.target.name]: e.target.value
        }
    })

    render() {
        const { errors, contactUs } = this.state
        return (
            <div>
                <div className="dashboard-page-container">
                    <div className="form-upload-header">
                        <h3>Upload Contact Us</h3>
                    </div>
                    <Tab.Pane attached={false}>
                        <Form>
                            <Form.Field error={!isEmptyObj(errors.description)}>
                                Description <Input name="description" value={contactUs.description} placeholder='Any reason why people should contact you' />
                                {errors.description && <InLineError message={errors.description} />}
                            </Form.Field>
                            <Form.Group unstackable widths={3}>
                                <Form.Field error={!isEmptyObj(errors.address1)}>
                                    <Form.Input label='Address 1' name="address1" value={contactUs.address1} placeholder='address' />
                                    {errors.address1 && <InLineError message={errors.address1} />}
                                </Form.Field>
                                <Form.Field error={!isEmptyObj(errors.address2)}>
                                    <Form.Input label='Address 2' name="address2" value={contactUs.address2} placeholder='address' />
                                    {errors.address2 && <InLineError message={errors.address2} />}
                                </Form.Field>
                                <Form.Field error={!isEmptyObj(errors.address3)}>
                                    <Form.Input label="Address 3" name="address3" value={contactUs.address3} placeholder='address' />
                                    {errors.address3 && <InLineError message={errors.address3} />}
                                </Form.Field>
                            </Form.Group>
                            <Form.Field error={!isEmptyObj(errors.city)}>
                                City <Input name="city" value={contactUs.city} placeholder='city' />
                                {errors.city && <InLineError message={contactUs.city} />}
                            </Form.Field>
                            <Form.Field error={!isEmptyObj(errors.email)}>
                                <Form.Input label='Email' name="email" value={contactUs.email} placeholder='joe@schmoe.com' />
                                {errors.email && <InLineError message={errors.email} />}
                            </Form.Field>
                            <Form.Group unstackable widths={4}>
                                <Form.Field error={!isEmptyObj(errors.tel)}>
                                    <Form.Input label='Tel' name="tel" value={contactUs.tel} placeholder='landline' />
                                    {errors.tel && <InLineError message={errors.tel} />}
                                </Form.Field>
                                <Form.Field error={!isEmptyObj(errors.phone)}>
                                    <Form.Input label='Phone' name="phone" value={contactUs.phone} placeholder='cell phone' />
                                    {errors.phone && <InLineError message={errors.phone} />}
                                </Form.Field>
                                <Form.Field error={!isEmptyObj(errors.fax)}>
                                    <Form.Input label="Fax" name="fax" value={contactUs.fax} placeholder='fax number' />
                                    {errors.fax && <InLineError message={errors.fax} />}
                                </Form.Field>
                                <Form.Field error={!isEmptyObj(errors.chefs_phone)}>
                                    <Form.Input label="Chefs Phone" name="chefs_phone" value={contactUs.chefs_phone} placeholder='chefs phone' />
                                    {errors.chefs_phone && <InLineError message={errors.chefs_phone} />}
                                </Form.Field>
                            </Form.Group>
                            <Form.Group unstackable widths={2}>Business Hours
                            <Form.Field>
                                    <Form.Input label='' placeholder='Monday' />To
                            </Form.Field>
                                <Form.Field>
                                    <Form.Input label='' placeholder='Friday' />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input type="time" placeholder='Search...' />To
                            </Form.Field>
                                <Form.Field>
                                    <Form.Input type="time" placeholder='Search...' />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input label='' placeholder='Except public holidays' />
                                </Form.Field>
                            </Form.Group>
                            <Button className="form-button-submit" size='large' primary type='submit'>Submit</Button>
                        </Form>
                    </Tab.Pane>
                </div>
            </div>
        )


    }

}
export default AboutContactUs