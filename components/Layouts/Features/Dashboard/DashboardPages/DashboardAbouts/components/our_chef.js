import React from 'react'
import { Container, Form, TextArea, Button, Tab, Input, Rating, Header } from 'semantic-ui-react'
import ContextAPI from "../../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../../src/Types/ColorsTypes"

class AboutOurChef extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            aboutChef: {
                name: "",
                hierarchy: "",
                image: "",
                description: ""
            },
          errors: {},
          rating: 0
        }
    
      }

      onChange = (e) => this.setState({
        aboutChef: {
          ...this.state.aboutChef,
          [e.target.name]: e.target.value
        }
      })

      handleChange = e => this.setState({ rating: e.target.value })

    render() {
        const { rating, aboutChef, errors } = this.state
        return (
            <div>
                <div className="dashboard-page-container">
                    <div className="form-upload-header">
                        <h3>Upload About Our Chefs</h3>
                    </div>
                    <Tab.Pane attached={false}>
                        <Form>
                            <Form.Field error={!isEmptyObj(errors.name)}>
                                Name <Input name="name" value={aboutChef.name} placeholder='Name' onChange={this.onChange}/>
                                {errors.name && <InLineError message={errors.name} />}
                            </Form.Field>
                            <Form.Field errir={!isEmptyObj(errors.hierarchy)}>
                                Hierarchy <Input name="description" value={aboutChef.hierarchy} placeholder='ranking of the chef' onChange={this.onChange}/>
                                {errors.hierarchy && <InLineError message={errors.hierarchy} />}
                            </Form.Field>
                            <Form.Field error={!isEmptyObj(errors.image)}>
                                Image <Input name="image" value={aboutChef.image} type='file' onChange={this.onChange}/>
                                {errors.image && <InLineError message={errors.image}/>}
                            </Form.Field>
                            <Form.Field error={!isEmptyObj(errors.description)}>
                                Description <Input name="description" value={aboutChef.description} placeholder='Background story' onChange={this.onChange}/>
                                {errors.description && <InLineError message={errors.description} />}
                            </Form.Field>
                            <div>
                                <div>Rating: {rating}</div>
                                <input type='range' min={0} max={5} value={rating} onChange={this.handleChange} />
                                <br />
                                <Rating rating={this.state.rating} maxRating={5} />
                            </div>
                            <Button className="form-button-submit" size='large' primary type='submit'>Submit</Button>
                        </Form>
                        <pre>{JSON.stringify(this.state.aboutChef, null, 2)}</pre>
                    </Tab.Pane>
                </div>
            </div>
        )
    }

}
export default AboutOurChef