import { Form, Button, Dropdown, Input, Label, Checkbox, Segment, TextArea, Image } from 'semantic-ui-react'
import api from "../../../../../../../src/providers/APIRequest"
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import validator from 'validator'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes"
import { InLineError } from '../../../../../../Messages/InLineMessage'

class MenuEditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editId : '' || props.productId,
            editBody: {
                name: "" ,
                description: "",
                price: 0,
                image: null,
                available: true,
                menuCategoryId: "",
                ingredients: []
            },
            errorBody: {},
            inputIngredient: "",
            inputIngredientError: "",
            isImageEdited : false,
            newDisplayImage : ""
        }
    }

    getProduct = async () => {
        const product = await api.menu.get_single_product(this.state.editId)
        this.setState({editBody : product.data.data})
        // console.log("this.state.editBody", product.data.data)
    }

    componentDidMount() {
        this.getProduct()
    }

    addIngredients = () => {
        let newIngrArr = this.state.editBody.ingredients
        let check = false

        newIngrArr.forEach(ingr => {
            if (ingr === this.state.inputIngredient) {
                this.setState({
                    inputIngredientError: `The item ${ingr} already exists in the ingredient list.`
                })
                check = true
            }
        })

        if (validator.isEmpty(this.state.inputIngredient, {
                ignore_whitespace: true
            })) {
            this.setState({
                inputIngredientError: "Ingredient name cannot be empty!"
            })
        } else if (check != true){
            newIngrArr.push(this.state.inputIngredient)
            this.setState({
                editBody: {
                    ...this.state.editBody,
                    ingredients: newIngrArr
                },
                inputIngredientError : ""
            })
        }
    }

    handleDropDownChange = (e, {
        value
    }) => {
        this.setState({
            editBody: {
                ...this.state.editBody,
                menuCategoryId: value
            }
        })
    }

    handleCheckBoxChange = () => {
        if (this.state.editBody.available) {
            this.setState({
                editBody: {
                    ...this.state.editBody,
                    available: false
                }
            })
        } else {
            this.setState({
                editBody: {
                    ...this.state.editBody,
                    available: true
                }
            })
        }
    }

    onChange = (iVT) => {

        if (iVT.target.name === "product_ingredient") {
            this.setState({
                inputIngredient: iVT.target.value
            })
        } else if (iVT.target.name === "image") {
            if (iVT.target.files && iVT.target.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.setState({ newDisplayImage : e.target.result});
                };
                reader.readAsDataURL(event.target.files[0]);
            }
            this.setState({
                editBody: {
                    ...this.state.editBody,
                    oldImagePath : this.state.editBody.image,
                    image: iVT.target.files[0],
                },
                isImageEdited : true
            })
        } else {
            this.setState({
                editBody: {
                    ...this.state.editBody,
                    [iVT.target.name]: iVT.target.value
                }
            })
        }
    }

    validate = () => {
        const {
            name,
            description,
            price,
            image,
            menuCategoryId,
            ingredients
        } = this.state.editBody
        const errors = {}

        if (validator.isEmpty(name, {
                ignore_whitespace: true
            })) {
            errors.name = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        if (validator.isEmpty(description, {
                ignore_whitespace: true
            })) {
            errors.description = MessageTypes.FIELD_CANT_BE_EMPTY
        }
        // if (isEmptyObj(image))
        // {
        //   errors.image = "You have to add an image."
        // }
        if (isEmptyObj(ingredients)) {
            this.setState({
                inputIngredientError: "You have to add at least 1 ingredient."
            })
        }
        if (!validator.isInt(price.toString(), { min: 1 }) && !validator.isFloat(price.toString()) && !validator.isDecimal(price.toString())) {
            errors.price = "Please put in a valid number, which is not less than R 0.5"
        }
        if (validator.isEmpty(menuCategoryId)) {
            errors.menuCategoryId = "Please select a category to which this product belongs."
        }
        return (errors)
    }

    uploadEditedMenu = async () => {
        const errors = this.validate()
        if (isEmptyObj(errors)) {
            const res = await api.menu.update_product(this.state.editBody, this.state.isImageEdited)
            this.props.refreshState({
                products : res.data.result
            })
            this.props.handleEditModal()
            this.setState({
                ...this.state,
                errorBody : {}
            })
        } else {
            this.setState({
                ...this.state,
                errorBody: errors
            })
        }
    }

    render() {
        const { editBody, inputIngredient, inputIngredientError, errorBody, isImageEdited, newDisplayImage } = this.state
        const { categories, handleEditModal} = this.props

        return ( 
          <div> { /* ========================= */ } 
            <div className = "dashboard-menu-page-container">
              <div className = "menu-upload-header">
                <h3> Edit Product </h3> 
              </div> 
            <Form>
              <Form.Field error = {!isEmptyObj(errorBody.name)}>
                <label > Product Name</label>  
                <Input name = "name" value = { editBody.name } onChange = { iVT => this.onChange(iVT)} placeholder = 'Name' autoComplete="off"/> 
                { errorBody.name && < InLineError message = {errorBody.name}/>} 
              </Form.Field>
              <Form.Field error = {!isEmptyObj(errorBody.description)}>
                <label > Product Description </label> 
                <TextArea name = "description"  value = { editBody.description } onChange = {iVT => this.onChange(iVT)} placeholder='Description' autoComplete="off"/> 
                { errorBody.description && <InLineError message = { errorBody.description }/> } 
              </Form.Field> 
              <Form.Field error = {!isEmptyObj(errorBody.price)}>
                <label > Price </label>
                <Input name = "price" value = { editBody.price } onChange = { iVT => this.onChange(iVT) } label = {{ basic: true, content: 'R'}} labelPosition = 'left' type = 'text' placeholder = 'Amount' autoComplete="off"/> 
                { errorBody.price && < InLineError message = { errorBody.price } />} 
              </Form.Field>
              <Form.Field error={!isEmptyObj(inputIngredientError)}> 
                <label>Ingredients</label> 
                <Input name="product_ingredient" value={inputIngredient} onChange={iVT => this.onChange(iVT) } action={<Button negative={!isEmptyObj(inputIngredientError)} onClick={this.addIngredients} >Add</Button>} autoComplete="off"></Input>
                {inputIngredientError && <InLineError message={inputIngredientError}/>}
              </Form.Field>
              <Segment className = "ingredients-list-segment" > 
                { isEmptyObj(editBody.ingredients) ? 
                  <Label> <h4> There are no ingredients yet, add some. </h4> </Label> : 
                      editBody.ingredients.map(ingrdnt => ( 
                        <Label key={ingrdnt}> { ingrdnt } </Label>
                      ))
                } 
              </Segment> 
              <Form.Field>
                <label> Category </label> 
                <div className = "category-available-upload-div" > {isEmptyObj(categories) ? 
                  <Label> You have to create a category first </Label> :  
                  <Dropdown 
                    error = {!isEmptyObj(errorBody.menuCategoryId)} 
                    placeholder = 'Select Category' 
                    onChange = { this.handleDropDownChange } 
                    clearable 
                    selection 
                    options = { 
                      categories.map(category => ({ 
                        text: category.title, value: category._id }
                        ))
                    }/> } 
                    <Checkbox className = "toggle-checkbox" 
                      defaultChecked 
                      toggle 
                      onChange = {
                        this.handleCheckBoxChange
                      }
                      label = { <label> Is this product available ? </label>} 
                    />
                </div> 
                { errorBody.menuCategoryId && <InLineError message = {errorBody.menuCategoryId}/> } 
                </Form.Field> 
                <Form.Field>
                    <label > Product Image </label>
                    <div>
                        <Image size='small' src={ isImageEdited ? newDisplayImage : editBody.image }></Image>
                        <input name="image" style={{display : 'none'}} type='file' onChange={iVT => this.onChange(iVT)} ref={fileInput => this.fileInput = fileInput}></input>
                        <Button onClick={() => this.fileInput.click()}>Edit</Button>
                    </div>
                </Form.Field>
                
                <Form.Button size ='medium' primary onClick = { () => this.uploadEditedMenu()}> Save </Form.Button> 
                <Button size ='medium' primary onClick={() => handleEditModal()}> Cancel </Button> 
                </Form> 
              </div> 
            { /* ===================== */ }
              <pre>{ JSON.stringify(this.state, " ", 2) }</pre> 
              {/* <pre>{ JSON.stringify(this.state.errorBody, " ", 2)}</pre> */}
            </div>
          )
  }
}

export default MenuEditForm