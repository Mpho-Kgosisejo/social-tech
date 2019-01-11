import React from 'react'
import { Container, Form, TextArea, Button, Tab, Input, Rating, Header } from 'semantic-ui-react'
import ContextAPI from "../../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import validator from 'validator'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes" 

class AboutOurStory extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
          aboutStory: {
            description: "",
            category_name: "",
            category_desc: ""
          }, 
          errors: {}
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
                category_name,  
                category_desc } = this.state.aboutStory
        const errors = {}

        if (validator.isEmpty(description, {
          ignore_whitespace: true
        })){
          errors.description = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if(validator.isEmpty(category_name, {
          ignore_whitespace: true
        })){
          errors.category_name = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        if(validator.isEmpty(category_desc, {
          ignore_whitespace: true
        })){
          errors.category_desc = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        return (errors)
        
      }

      onclickSubmit = () => {
        const errors = this.validate()
        console.log(errors)
        if(isEmptyObj(errors)){

            console.log(errors)
            this.setState({
                errors: {}
            })
        }
        else{
            this.setState({
                errors: errors
            })
        }

    }

    
      render() {
        const { errors, aboutStory} = this.state
       
        return (
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
                        Add a category name<Input value={aboutStory.category_name} name="category_name" placeholder='Add a category to the story eg. Innovation/Awards...' onChange={this.onChange}></Input>
                        {errors.category_name && <InLineError message={errors.category_name} />}
                      </Form.Field>
                      <Form.Field error={!isEmptyObj(errors.category_desc)}>
                        <Form.TextArea value={aboutStory.category_desc} name="category_desc" label='Description of the category' placeholder='eg. What awards have you won...' onChange={this.onChange}/>
                      </Form.Field>
                      <Button className="form-button-submit" size='large' primary type='submit' onClick = {this.onclickSubmit} >Submit</Button>
                    </Form>
                  </Tab.Pane>
                  <pre>{JSON.stringify(this.state.aboutStory, null, 2)}</pre>
                </div>
        )
          
      }
}
export default AboutOurStory