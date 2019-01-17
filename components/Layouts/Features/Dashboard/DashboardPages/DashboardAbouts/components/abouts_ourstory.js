import React from 'react'
import { Container, Form, List, Button, Tab, Input, Rating, Header, Segment, Divider } from 'semantic-ui-react'
import ContextAPI from "../../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import validator from 'validator'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes" 
import API from '../../../../../../../src/providers/APIRequest';

class AboutOurStory extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
          isAddingCategory : false,
          newCategory : {
            tag_name: "",
            tag_description: ""
          },
          aboutStory: {
            description: "",
            tags : []
          }, 
          errors: {}
        }
    
      }

      get_story = async () => {
        const res = await API.web.getOurStory()
        if (res.status == 200)
        {
          this.setState({aboutStory : res.data.our_story[0]})
        }
      }

      componentDidMount()
      {
          this.get_story()
      }
    
      onChange = (e) => {
        if (e.target.name == "tag_name" || e.target.name == "tag_description")
        {
          this.setState({
            newCategory: {
              ...this.state.newCategory,
              [e.target.name]: e.target.name == "tag_name" ? e.target.value.toUpperCase() : e.target.value
            }
          })
        }
        if (e.target.name == "description")
        {
          this.setState({
            aboutStory: {
              ...this.state.aboutStory,
              [e.target.name]: e.target.value
            }
          })
        }
      } 


      validate = () => {
        const { description } = this.state.aboutStory
        const { tag_name, tag_description } = this.state.newCategory
        const errors = {}

        if (validator.isEmpty(description, {
          ignore_whitespace: true
        })){
          errors.description = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if(this.state.isAddingCategory && validator.isEmpty(tag_name, {
          ignore_whitespace: true
        })){
          errors.tag_name = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        if(this.state.isAddingCategory && validator.isEmpty(tag_description, {
          ignore_whitespace: true
        })){
          errors.tag_description = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        return (errors) 
      }

      confirmCategoryAdd = () => {
        const errors = this.validate()

        if(isEmptyObj(errors)){
          this.setState({
            aboutStory: {
              ...this.state.aboutStory,
              tags : this.state.aboutStory.tags.concat(this.state.newCategory)
            },
            isAddingCategory : false
          })
        }
        else{
            this.setState({
                errors: errors
            })
        }
      }

      onclickSubmit =  async () => {
        const errors = this.validate()

        if(isEmptyObj(errors)){
            const res = await API.web.addOrUpdateStory(this.state.aboutStory)
            this.setState({
                aboutStory : res.data.ourstory
            })
        }
        else{
            this.setState({
                errors: errors
            })
        }

    }

    handleCategoryAdd = () => {
        if (this.state.isAddingCategory)
            this.setState({isAddingCategory : false})
        else 
            this.setState({isAddingCategory : true})
    }

    removeCategory = (index) => {
      const newTags = this.state.aboutStory.tags
      newTags.splice(index, 1)
      this.setState({ aboutStory : {
          ...this.state.aboutStory,
          tags : newTags
      }})
    }
    
    render() {
      const { isAddingCategory, errors, aboutStory, newCategory} = this.state
      
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
                    {
                      isAddingCategory ? 
                        <>
                          <Form.Field error={!isEmptyObj(errors.tag_name)}>
                            Add a category name<Input value={newCategory.tag_name} name="tag_name" placeholder='Add a category to the story eg. Innovation/Awards...' onChange={this.onChange}></Input>
                            {errors.tag_name && <InLineError message={errors.tag_name} />}
                          </Form.Field>
                          <Form.Field error={!isEmptyObj(errors.tag_description)}>
                            Description of the category<Form.TextArea value={newCategory.tag_description} name="tag_description" placeholder='eg. What awards have you won...' onChange={this.onChange}/>
                            {errors.tag_description && <InLineError message={errors.tag_description} />}
                          </Form.Field> 
                          <div className = "product-list-header">
                              <div></div>
                              <div>  
                                <Button onClick={() => this.confirmCategoryAdd()}>Save</Button>                                              
                                <Button onClick={() => this.handleCategoryAdd()}>Cancel</Button>
                              </div>
                          </div>
                        </> :
                        <div className = "product-list-header">
                            <div></div>
                            <div>  
                              <Button onClick={() => this.handleCategoryAdd()}>New Category</Button>
                            </div>
                        </div>
                        
                    }
                    <Button className="form-button-submit" size='large' primary type='submit' onClick = {this.onclickSubmit} >Submit</Button>
                    <Divider/>
                    <h3>Sub Categories</h3>
                    <Segment>
                        {
                          aboutStory.tags.length < 1 ? 
                            <h3>No Sub-categories yet.</h3>
                          : 
                          <List divided relaxed>
                              {aboutStory.tags.map((tag, index) => (
                                  <List.Item id={tag.tag_description}>
                                      {/* <List.Icon name='question' size='large' verticalAlign='middle' /> */}
                                      <List.Content>
                                          <List.Header as='a'>{tag.tag_name}</List.Header>
                                          <List.Description as='a'>{tag.tag_description}</List.Description> 
                                      </List.Content>
                                      <List.Content floated='right'>
                                          <Button onClick={() => this.removeCategory(index)}>Delete</Button>
                                      </List.Content>
                                  </List.Item>
                              ))}
                          </List>
                        }
                    </Segment>
                  </Form>
                </Tab.Pane>
                {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
              </div>
      )
        
    }
}
export default AboutOurStory