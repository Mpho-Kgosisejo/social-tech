import React from 'react'
import { Container, Form, TextArea, Button, Tab, Input, Rating, Header } from 'semantic-ui-react'
import ContextAPI from "../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../src/Types/ColorsTypes"

class DashboardAboutsPage extends React.Component {

  constructor(props) {
    super(props)
    
    

  }

  onChange = (e) => this.setState({
    aboutStory: {
      ...this.state.aboutStory,
      [e.target.name]: e.target.value
    }
  })

  handleChange = e => this.setState({ rating: e.target.value })

  render() {
    const { rating, errors, aboutStory} = this.state
    const panes = [
      {
        menuItem: 'Our Story Form',
        render: () =>
            <div className="dashboard-page-container">
              <div className="form-upload-header">
                <h3>Upload About Our Story</h3>
              </div>
              <Tab.Pane attached={false}>
                <Form>
                  <Form.Field error={!isEmptyObj(errors.description)}>
                    <Form.TextArea value={aboutStory.description} label="Description" name="description" placeholder='What is Fresh Eats about' onChange={this.onChange}/>
                    {errors.description && <InLineError message={errors.description} />}
                  </Form.Field>
                  <Form.Field error={!isEmptyObj(errors.category_name)}>
                    Add a category name<Input value={aboutStory.category_name} name="category_name" placeholder='Add a category to the story eg. Innovation/Awards...' onChange={this.onChange} action={<Button className="form-button-submit">Add</Button>}></Input>
                    {errors.category_name && <InLineError message={errors.category_name} />}
                  </Form.Field>
                  <Form.Field error={!isEmptyObj(errors.category_desc)}>
                    <Form.TextArea value={aboutStory.category_desc} name="category_desc" label='Description of the category' placeholder='eg. What awards have you won...' onChange={this.onChange}/>
                  </Form.Field>
                  <Button className="form-button-submit" size='large' primary type='submit'>Submit</Button>
                </Form>
              </Tab.Pane>
              <pre>{JSON.stringify(this.state.aboutStory, null, 2)}</pre>
            </div>
      },
      {
        menuItem: 'Our Chefs Form',
        render: () =>
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
      },
      {
        menuItem: 'Contact Us Form',
        render: () =>
          <div>
            <div className="dashboard-page-container">
              <div className="form-upload-header">
                <h3>Upload Contact Us</h3>
              </div>
              <Tab.Pane attached={false}>
                <Form>
                  <Form.Field>
                    Description <Input name="description" placeholder='Any reason why people should contact you' />
                  </Form.Field>
                  <Form.Group unstackable widths={3}>
                    <Form.Input label='Address 1' placeholder='address' />
                    <Form.Input label='Address 2' placeholder='address' />
                    <Form.Input label="Address 3" placeholder='address' />
                  </Form.Group>
                  <Form.Field>
                    City <Input name="city" placeholder='city' />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input label='Email' placeholder='joe@schmoe.com' />
                  </Form.Field>
                  <Form.Group unstackable widths={4}>
                    <Form.Input label='Tel' placeholder='landline' />
                    <Form.Input label='Phone' placeholder='cell phone' />
                    <Form.Input label="Fax" placeholder='fax number' />
                    <Form.Input label="Chefs Phone" placeholder='chefs phone' />
                  </Form.Group>
                  <Form.Group unstackable widths={2}>Business Hours
              <Form.Input label='' placeholder='Monday' />To
              <Form.Input label='' placeholder='Friday' />
                    <Form.Input type="time" placeholder='Search...' />To
              <Form.Input type="time" placeholder='Search...' />
                    <Form.Input label='' placeholder='Except public holidays' />
                  </Form.Group>
                  <Button className="form-button-submit" size='large' primary type='submit'>Submit</Button>
                </Form>
              </Tab.Pane>
            </div>
          </div>
      },
      {
        menuItem: 'FAQs Form',
        render: () =>
          <div>
            <div className="dashboard-page-container">
              <div className="form-upload-header">
                <h3>Upload About FAQs</h3>
              </div>
              <Tab.Pane attached={false}>
                <Form>
                  <Form.Field>
                    Question<Input placeholder='Add a question eg. Who is the owner of fresh eats?...' action={<Button className="form-button-submit">Add</Button>}></Input>
                  </Form.Field>
                  <Form.Field>
                    <Form.TextArea label='Answer' placeholder='eg. Mpumi is the owner...' />
                  </Form.Field>
                  <Button className="form-button-submit" size='large' primary type='submit'>Submit</Button>
                </Form>
              </Tab.Pane>
            </div>
          </div>
      },
    ]
    return (
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    )
  }

}
export default DashboardAboutsPage