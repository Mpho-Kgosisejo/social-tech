import React from 'react'
import { Container, Form, TextArea, Button, Tab, Input, Rating, Header } from 'semantic-ui-react'
import ContextAPI from "../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../src/Types/ColorsTypes"

class AboutOurChef extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          rating: 0
        }
    
      }

      handleChange = e => this.setState({ rating: e.target.value })

    render() {
        const { rating } = this.state
        return (
            <div>
                <div className="dashboard-page-container">
                    <div className="form-upload-header">
                        <h3>Upload About Our Chefs</h3>
                    </div>
                    <Tab.Pane attached={false}>
                        <Form>
                            <Form.Field>
                                Name <Input name="name" placeholder='Name' />
                            </Form.Field>
                            <Form.Field>
                                Hierarchy <Input name="description" placeholder='ranking of the chef' />
                            </Form.Field>
                            <Form.Field>
                                Image <Input name="image" type='file' />
                            </Form.Field>
                            <Form.Field>
                                Description <Input name="description" placeholder='Background story' />
                            </Form.Field>
                            <div>
                                <div>Rating: {rating}</div>
                                <input type='range' min={0} max={5} value={rating} onChange={this.handleChange} />
                                <br />
                                <Rating rating={this.state.rating} maxRating={5} />
                            </div>
                            <Button className="form-button-submit" size='large' primary type='submit'>Submit</Button>
                        </Form>
                    </Tab.Pane>
                </div>
            </div>
        )
    }

}
export default AboutOurChef