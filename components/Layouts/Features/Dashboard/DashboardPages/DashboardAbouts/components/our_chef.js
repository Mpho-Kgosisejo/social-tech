import React from 'react'
import { Container, Form, Button, Tab, Input, Rating, Card, Segment, Icon, Image, Menu, Popup, Modal, Header} from 'semantic-ui-react'
import ContextAPI from "../../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes"
import validator from 'validator'
import api from '../../../../../../../src/providers/APIRequest';


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
          rating: 0,
          chefList : [],
          isEditingChef : false,
          editChef : {},
          isDeletingChef : false,
          deleteBody : {}
        }
    }

    getChefs = async () => {
        const res = await api.web.getChefs()

        this.setState({
            chefList : res.data.chefs
        })
    }

    componentDidMount ()
    {
        this.getChefs()
    }

      onChange = (e) => this.setState({
        aboutChef: {
          ...this.state.aboutChef,
          [e.target.name]: e.target.name === "image" ? e.target.files[0] : e.target.value
        }
      })

      validate = () => {
        const {name, 
            hierarchy, 
            image, 
            description} = this.state.aboutChef
        const errors = {}

        if (validator.isEmpty(name, {
          ignore_whitespace: true
        })){
          errors.name = MessageTypes.FIELD_CANT_BE_EMPTY
        }

        if(validator.isEmpty(hierarchy, {
          ignore_whitespace: true
        })){
          errors.hierarchy = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        if(document.getElementById("uploadFile").value != "") {
            if((image.name.split('.').pop() != 'jpeg') &&  (image.name.split('.').pop() != 'png') &&  (image.name.split('.').pop() != 'jpg'))
            {
                errors.image = "Only images of types *.jpeg, *jpg and *.png are allowed."
            }
        }
        else 
        {
            errors.image = "You have to add an image."
        }
        if(validator.isEmpty(description, {
            ignore_whitespace: true
          })){
            errors.description = MessageTypes.FIELD_CANT_BE_EMPTY
          }

        return (errors)
        
      }

      onclickSubmit = async () => {
        const errors = this.validate()
        if(isEmptyObj(errors)){
            const res = await api.web.uploadChef(this.state.aboutChef, this.state.rating)
            this.setState({
                errors: {},
                chefList : res.data.chefs
            })
        }
        else{
            this.setState({
                errors: errors
            })
        }
    }

    startEditMode = (editChef) => {
        if(this.state.isEditingChef)
            this.setState({ isEditingChef : false })
        else 
            this.setState({ isEditingChef : true })
    }

    deleteChef = (delBody) => {
        if(this.state.isDeletingChef)
            this.setState({ isDeletingChef : false })
        else 
            this.setState({ isDeletingChef : true, deleteBody : delBody })
    }

    confirmChefdeletion = async () => {
        const resp = await api.web.deleteChef(this.state.deleteBody)
        console.log(resp)
        this.setState({ chefList : resp.data.chefs, deleteBody : {}, isDeletingChef : false })
    }

    handleChange = e => this.setState({ rating: e.target.value })

    render() {
        const { rating, aboutChef, errors, chefList, isEditingChef, isDeletingChef } = this.state
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
                            <Form.Field error={!isEmptyObj(errors.hierarchy)}>
                                Hierarchy <Input name="hierarchy" value={aboutChef.hierarchy} placeholder='ranking of the chef' onChange={this.onChange}/>
                                {errors.hierarchy && <InLineError message={errors.hierarchy} />}
                            </Form.Field>
                            <Form.Field error={!isEmptyObj(errors.image)}>
                                Image <Input id="uploadFile" name="image"  type='file' onChange={this.onChange}/>
                                {errors.image && <InLineError message={errors.image}/>}
                            </Form.Field>
                            <Form.Field error={!isEmptyObj(errors.description)}>
                                Description <Input  name="description" value={aboutChef.description} placeholder='Background story' onChange={this.onChange}/>
                                {errors.description && <InLineError message={errors.description} />}
                            </Form.Field>
                            <div>
                                <div>Rating: {rating}</div>
                                <input type='range' min={0} max={5} value={rating} onChange={this.handleChange} />
                                <br />
                                <Rating rating={this.state.rating} maxRating={5} />
                            </div>
                            <Button className="form-button-submit" size='large' primary type='submit' onClick = {() => this.onclickSubmit() }>Submit</Button>
                        </Form>
                    </Tab.Pane>

                    <Segment>
                        <Card.Group>
                            {   chefList.map( chef => (
                                    <Card key={chef._id}>
                                        <Image src={chef.image_url}/>
                                        <Card.Content>
                                        <Card.Header>{chef.name}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>{chef.speciality}</span>
                                        </Card.Meta>
                                        <Card.Description>{chef.background}</Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Menu secondary>
                                                <Menu.Item>
                                                    <a>
                                                        <Icon name='star' />
                                                        {chef.rating}
                                                    </a>
                                                </Menu.Item>
                                                <Menu.Menu position='right'>
                                                    <Menu.Item>
                                                    {/* <Popup trigger={<Icon name={isEditingChef && editID === FAQ._id ? 'check' : 'edit'}/>} content={isEditingFAQ && editID === FAQ._id ? 'save' : 'edit'} /> */}
                                                    <Popup trigger={<Icon onClick={() => this.deleteChef(chef) } name='delete'/>} content='delete'/>
                                                    </Menu.Item>
                                                </Menu.Menu> 
                                            </Menu>
                                        </Card.Content>
                                    </Card>
                            ))}
                        </Card.Group>
                    </Segment>


                    {/* modal will be called when the delete faq icon is called */}
                    <Modal open={isDeletingChef} basic size='small'>
                            <Header content='Warning! This Action is irriversible'/>
                            <Modal.Content>
                                <p>
                                    Are you sure you want to delete this Chef? Press No to cancel the operation and Yes to continue.
                                </p>
                            </Modal.Content>
                            <Modal.Actions>
                            <Button onClick={() => this.deleteChef()} basic color='red' inverted>
                                <Icon name='remove' /> No
                            </Button>
                            <Button onClick={() => this.confirmChefdeletion()} color='green' inverted>
                                <Icon name='checkmark' /> Yes
                            </Button>
                            </Modal.Actions>
                        </Modal> 
                    <pre>{JSON.stringify(this.state, null, 2)}</pre>
                </div>
            </div>
        )
    }

}
export default AboutOurChef