import React from 'react'
import { Container, Form, Icon, Button, Tab, Input, Label, Segment } from 'semantic-ui-react'
import ContextAPI from "../../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import validator from 'validator'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes"
import api from '../../../../../../../src/providers/APIRequest';

class AboutOurStory extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      aboutStory: {
        description: "",
        tag_name: "",
        tag_descritption: ""
      },
      errors: {},
      tags: []

    }

  }

  getTAGS = async () => {
    const res = await api.web.about()

    if (res.status === 200) {
      const { tags } = res.data.our_story
      this.setState({ tags });
      console.log("This the tags", tags)

    } else {
      res.status(404).send('Bad Request')
    }

  }

  onChange = (e) => this.setState({
    aboutStory: {
      ...this.state.aboutStory,
      [e.target.name]: e.target.value
    }
  })


  validate = () => {
    const { description,
      tag_name,
      tag_descritption } = this.state.aboutStory
    const errors = {}

    if (validator.isEmpty(description, {
      ignore_whitespace: true
    })) {
      errors.description = MessageTypes.FIELD_CANT_BE_EMPTY
    }

    if (validator.isEmpty(tag_name, {
      ignore_whitespace: true
    })) {
      errors.tag_name = MessageTypes.FIELD_CANT_BE_EMPTY
    }
    if (validator.isEmpty(tag_descritption, {
      ignore_whitespace: true
    })) {
      errors.tag_descritption = MessageTypes.FIELD_CANT_BE_EMPTY
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


  componentDidMount() {
    this.getTAGS()
  }

  render() {
    const { errors, aboutStory, tags } = this.state
    // console.log("about data", aboutStory)

    return (
      <div className="dashboard-page-container">
        <div className="form-upload-header">
          <h3>Upload About Our Story</h3>
        </div>
        <Tab.Pane attached={false}>
          <Form>
            <Form.Field error={!isEmptyObj(errors.description)}>
              <Form.TextArea value={aboutStory.description} label="Description of Our Story" name="description" placeholder='What is Fresh Eats about' onChange={this.onChange} />
              {errors.description && <InLineError message={errors.description} />}
            </Form.Field>

            <Form.Field error={!isEmptyObj(errors.tag_name)}>
              Add a category name<Input value={aboutStory.tag_name} name="tag_name" placeholder='Add a category to the story eg. Innovation/Awards...' onChange={this.onChange} action={<Button>Add</Button>}></Input>
              {errors.tag_name && <InLineError message={errors.tag_name} />}
            </Form.Field>
            <Segment className="ingredients-list-segment" >
              {isEmptyObj(tags) ?
                <Label> <h4> Add a category </h4> </Label> :
                tags.map(tag => (
                  <Label key={tag.tag_name} onClick={ () => this.clickLabel() }> {tag.tag_name} </Label>
                ))
              }
            </Segment>
            <Form.Field error={!isEmptyObj(errors.tag_descritption)}>
              <Form.TextArea value={aboutStory.tag_descritption} name="tag_descritption" label='Description of the category' placeholder='eg. What awards have you won...' onChange={this.onChange} />
            </Form.Field>


            <Button className="form-button-submit" size='large' primary type='submit' onClick={this.onclickSubmit} >Submit</Button>
          </Form>
        </Tab.Pane>
        <pre>{JSON.stringify(this.state.aboutStory, null, 2)}</pre>
      </div>
    )

  }
}
export default AboutOurStory