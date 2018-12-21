import React from 'react'
import { Form, Button, Tab, Input, Rating, Card, Segment, Icon, Image, Menu, Popup, Modal, TextArea, Header, Message} from 'semantic-ui-react'
import ContextAPI from "../../../../../../../src/config/ContextAPI";
import { isEmptyObj, isEquivalent } from "../../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes"
import validator from 'validator'
import api from '../../../../../../../src/providers/APIRequest';


class AboutOurChef extends React.Component {

    constructor(props) {
        super(props)
        this.editChefRef = React.createRef();
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
            storedChefsName : "",
            isDeletingChef : false,
            deleteBody : {},
            editErrors :{},
            newDisplayImage : "",
            isImageEdited : false        
        }
    }

    handleScrollToElement = () => {
        window.scrollTo(0, this.editChefRef.current.offsetTop);
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

    onChange = (e) => {
        if (e.target.name == "editName" || e.target.name == "editBackground" || e.target.name == "editSpeciality" || e.target.name == "editImage")
        {
            switch(e.target.name)
            {
                case "editName" :
                    this.setState({ editChef : { ...this.state.editChef, name : e.target.value } })
                    break
                case "editBackground" :
                    this.setState({ editChef : { ...this.state.editChef, background : e.target.value } })
                    break
                case "editSpeciality" :
                    this.setState({ editChef : { ...this.state.editChef, speciality : e.target.value } })
                    break
                case "editImage" :
                    if (e.target.files && e.target.files[0]) {
                        const errors = {}
                        if ( (e.target.files[0].name.split('.').pop() != 'jpeg') &&  (e.target.files[0].name.split('.').pop() != 'png')  && (e.target.files[0].name.split('.').pop() != 'jpg'))
                        {
                            errors.image = "Only images of types *.jpeg, *jpg and *.png are allowed."
                            this.setState({ 
                                editErrors : {
                                    ...this.state.editErrors,
                                    image : errors.image
                                }  
                            })
                        }
                        else
                        {
                            this.setState({
                                editChef: {
                                    ...this.state.editChef,
                                    oldImagePath : this.state.editChef.image_url,
                                    image_url: e.target.files[0],
                                },
                                isImageEdited : true
                            })
                            let reader = new FileReader();
                            reader.onload = (e) => {
                                this.setState({ newDisplayImage : e.target.result});
                            };
                            reader.readAsDataURL(event.target.files[0]);
                        }
                    }
                    
                    break
            }
        }
        else 
        {
            this.setState({
                aboutChef: {
                    ...this.state.aboutChef,
                    [e.target.name]: e.target.name === "image" ? e.target.files[0] : e.target.value
                }
            })
        }
    }

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

    validateEdit = () => {
        const {name, 
            speciality, 
            image, 
            background} = this.state.editChef
        const errors = {}

        if (validator.isEmpty(name, {
            ignore_whitespace: true
        })){
            errors.editName = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        // if(document.getElementById("uploadEditedFile").value != "") {
        //     console.log("we have a file", image.name.split('.').pop())
        //     if((image.name.split('.').pop() != 'jpeg') &&  (image.name.split('.').pop() != 'png'))
        //     {
        //         errors.image = "Only images of types *.jpeg and *.png are allowed."
        //     }
        // }
        if(validator.isEmpty(speciality, {
            ignore_whitespace: true
        })){
            errors.editSpeciality = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        if(validator.isEmpty(background, {
            ignore_whitespace: true
            })){
            errors.editBackground = MessageTypes.FIELD_CANT_BE_EMPTY
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

    startEditMode = (edChef) => {

        if(!isEmptyObj(this.state.editChef))
        {
            if (isEquivalent(this.state.editChef, edChef))
            {
                this.setState({ isEditingChef : false, editChef : {} })
            }
            else 
            {
                this.setState({ isEditingChef : true, editChef : edChef, storedChefsName : edChef.name })
                this.handleScrollToElement()
            }
        }
        else 
        {
            if(this.state.isEditingChef)
                this.setState({ isEditingChef : false })
            else 
            {
                this.setState({ isEditingChef : true, editChef : edChef, storedChefsName : edChef.name })
                this.handleScrollToElement()                
            }
        }
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

    handleChange = e => {
        if (e.target.name == "editRating")
            this.setState({ editChef : {
                    ...this.state.editChef,
                    rating : e.target.value
                }
        })
        else
            this.setState({ rating: e.target.value })
    }
    
    saveChefEdit = async () => {
        const errors = this.validateEdit()
        if(isEmptyObj(errors)){
            const res = await api.web.updateChef(this.state.editChef, this.state.isImageEdited)
            console.log(res)
            this.setState({
                editErrors: {},
                chefList : res.data.chefs,
                isEditingChef : false,
                editChef : {}
            })
        }
        else{
            this.setState({
                editErrors: errors
            })
        }
    }

    render() {
        const { rating, aboutChef, errors, chefList, isEditingChef, editChef, isDeletingChef, editErrors, isImageEdited, newDisplayImage } = this.state
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
                        {isEmptyObj(chefList) ? 
                            <Message icon>
                                <Icon name='user'/>
                                <Message.Content>
                                <Message.Header>There are currently no chef profiles available</Message.Header>
                                Use the form above to create a chef's profile which can be viewed by your users in the about us section of the main website.
                                </Message.Content>
                            </Message>
                            : 
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
                                                        <Popup trigger={<Icon onClick={() => this.startEditMode(chef)} name='edit'/>} content='edit' />
                                                        <Popup trigger={<Icon onClick={() => this.deleteChef(chef) } name='delete'/>} content='delete'/>
                                                        </Menu.Item>
                                                    </Menu.Menu> 
                                                </Menu>
                                            </Card.Content>
                                        </Card>
                                ))}
                            </Card.Group>
                        }
                    </Segment>

                     <div ref={this.editChefRef}>
                        {isEditingChef ? 
                                <Segment>
                                    <h1> Edit {editChef.name}'s Profile </h1>
                                    <Form>
                                        <Form.Field>
                                            <div className="edit-image-div">
                                                <Image className="edit-image-div"  src={ isImageEdited ? newDisplayImage : editChef.image_url }></Image>
                                                <input id='uploadEditedFile' name="editImage" style={{display : 'none'}} type='file' onChange={iVT => this.onChange(iVT)} ref={fileInput => this.fileInput = fileInput}></input>
                                                <div className="edit-image-button">
                                                    <Button className="centered-element" onClick={() => this.fileInput.click()}>Edit</Button>
                                                </div>
                                            </div>
                                            { editErrors.image && < InLineError message = {editErrors.image} /> } 
                                        </Form.Field>
                                        <Form.Field error={!isEmptyObj(editErrors.editName)}>
                                            Name <Input name="editName" value={editChef.name} placeholder='Name' onChange={this.onChange}/>
                                            {editErrors.editName && <InLineError message={editErrors.editName} />}
                                        </Form.Field>
                                        <Form.Field error={!isEmptyObj(editErrors.editSpeciality)}>
                                            Speciality <Input name="editSpeciality" value={editChef.speciality} placeholder='ranking of the chef' onChange={this.onChange}/>
                                            {editErrors.editSpeciality && <InLineError message={editErrors.editSpeciality} />}
                                        </Form.Field>
                                        <Form.Field error={!isEmptyObj(editErrors.editBackground)}>
                                            Background <TextArea  name="editBackground" value={editChef.background} placeholder='Background story' onChange={this.onChange}/>
                                            {editErrors.editBackground && <InLineError message={editErrors.editBackground} />}
                                        </Form.Field>
                                        <div>
                                            <div>Rating: {editChef.rating}</div>
                                            <input type='range' name="editRating"  min={0} max={5} value={editChef.rating} onChange={this.handleChange} />
                                            <br />
                                            <Rating rating={this.state.editChef.rating} maxRating={5} />
                                        </div>
                                        <Button className="form-button-submit" size='large' primary onClick = {() => this.saveChefEdit() }>Save</Button>
                                    </Form>
                                </Segment>
                        : null}
                    </div>

                    {/* modal will be called when the delete delete chef icon is called */}
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
                    <pre>{JSON.stringify(this.state.isEditingChef, null, 2)}</pre>
                    <pre>{JSON.stringify(this.state.isImageEdited, null, 2)}</pre>

                </div>
            </div>
        )
    }

}
export default AboutOurChef