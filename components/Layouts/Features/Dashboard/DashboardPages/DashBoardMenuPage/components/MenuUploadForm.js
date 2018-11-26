import { Form, Button, Dropdown, Input, Label, Checkbox, Segment, TextArea } from 'semantic-ui-react'
import api from "../../../../../../../src/providers/APIRequest"
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import validator from 'validator'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes"
import { InLineError } from '../../../../../../Messages/InLineMessage'

class MenuUploadForm extends React.Component {
    constructor() {
        super()
        this.state = {
            productUploadBody: {
                name: "",
                description: "",
                price: 0,
                image: null,
                available: true,
                menuCategoryId: "",
                ingredients: []
            },
            errorBody: {},
            inputIngredient: "",
            inputIngredientError: ""
        }
    }

    addIngredients = () => {
        let newIngrArr = this.state.productUploadBody.ingredients

        newIngrArr.forEach(ingr => {
            if (ingr === this.state.inputIngredient) {
                this.setState({
                    inputIngredientError: `The item ${ingr} already exists in the ingredient list.`
                })
            }
        })

        if (validator.isEmpty(this.state.inputIngredient, {
                ignore_whitespace: true
            })) {
            this.setState({
                inputIngredientError: "Ingredient name cannot be empty!"
            })
        } else {
            newIngrArr.push(this.state.inputIngredient)
            this.setState({
                productUploadBody: {
                    ...this.state.productUploadBody,
                    ingredients: newIngrArr
                }
            })
        }
    }

    handleDropDownChange = (e, {
        value
    }) => {
        this.setState({
            productUploadBody: {
                ...this.state.productUploadBody,
                menuCategoryId: value
            }
        })
    }

    handleCheckBoxChange = () => {
        if (this.state.productUploadBody.available) {
            this.setState({
                productUploadBody: {
                    ...this.state.productUploadBody,
                    available: false
                }
            })
        } else {
            this.setState({
                productUploadBody: {
                    ...this.state.productUploadBody,
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
            console.log("before ===", iVT.target.files[0])
            this.setState({
                productUploadBody: {
                    ...this.state.productUploadBody,
                    image: iVT.target.files[0]
                }
            })
        } else {
            this.setState({
                productUploadBody: {
                    ...this.state.productUploadBody,
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
        } = this.state.productUploadBody
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
        if (!validator.isInt(price.toString(), {
                min: 1
            }) || !validator.isFloat(price.toString())) {
            errors.price = "Please put in a valid number, which is not less than R 0.5"
        }
        if (validator.isEmpty(menuCategoryId)) {
            errors.menuCategoryId = "Please select a category to which this product belongs."
        }
        return (errors)
    }

    uploadMenu = () => {
        const errors = this.validate()
        if (isEmptyObj(errors)) {
            const res = api.menu.upload_product(this.state.productUploadBody)
            console.log(res)
        } else {
            this.setState({
                errorBody: errors
            })
        }
    }

    render() {
        const { productUploadBody, inputIngredient, inputIngredientError, errorBody } = this.state
        const { categories} = this.props

        return ( 
          <div> { /* ========================= */ } 
            <div className = "dashboard-menu-page-container">
              <div className = "menu-upload-header">
                <h3> Upload Menu </h3> 
              </div> 
            <div className = "menu-upload-form">

            <Form>
              <Form.Field error = {!isEmptyObj(errorBody.name)}>
                <label > Product Name </label>  
                <Input name = "name" value = { productUploadBody.name } onChange = { iVT => this.onChange(iVT)} placeholder = 'Name' autoComplete="off"/> 
                { errorBody.name && < InLineError message = {errorBody.name}/>} 
              </Form.Field>
              <Form.Field error = {!isEmptyObj(errorBody.description)}>
                <label > Product Description </label> 
                {/* <Input name = "description" value = { productUploadBody.description } onChange = {iVT => this.onChange(iVT)} placeholder = 'Description'/>  */}
                <TextArea name = "description"  value = { productUploadBody.description } onChange = {iVT => this.onChange(iVT)} placeholder='Description' autoComplete="off"/> 
                { errorBody.description && <InLineError message = { errorBody.description }/> } 
              </Form.Field> 
              <Form.Field error = {!isEmptyObj(errorBody.price)}>
                <label > Price </label>
                <Input name = "price" value = { productUploadBody.price } onChange = { iVT => this.onChange(iVT) } label = {{ basic: true, content: 'R'}} labelPosition = 'left' type = 'text' placeholder = 'Amount' autoComplete="off"/> 
                { errorBody.price && < InLineError message = { errorBody.price } />} 
              </Form.Field> 
              < Form.Field error = {!isEmptyObj(errorBody.image)}>
                <label > Product Image </label>
                <Input name = "image" onChange = {iVT => this.onChange(iVT)} type = 'file'/> 
                { errorBody.image && < InLineError message = {errorBody.image} /> } 
              </Form.Field> 
              <Form.Field error={!isEmptyObj(inputIngredientError)}> 
                <label>Ingredients</label> 
                <Input name="product_ingredient" value={inputIngredient} onChange={iVT => this.onChange(iVT) } action={<Button negative={!isEmptyObj(inputIngredientError)} onClick={this.addIngredients} >Add</Button>} autoComplete="off"></Input>
                {inputIngredientError && <InLineError message={inputIngredientError}/>}
              </Form.Field>
              <Segment className = "ingredients-list-segment" > 
                { isEmptyObj(productUploadBody.ingredients) ? 
                  <Label> <h4> There are no ingredients yet, add some. </h4> </Label> : 
                      productUploadBody.ingredients.map(ingrdnt => ( 
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
                <Form.Button size = 'large' primary onClick = { this.uploadMenu}> Submit </Form.Button> 
                </Form> 
              </div> 
            </div>
            { /* ===================== */ }
              {/* <pre>{ JSON.stringify(this.state.productUploadBody, null, 2) }</pre> 
              <pre>{ JSON.stringify(this.state.errorBody, null, 2)}</pre> 
              <pre>{ JSON.stringify(this.state.inputIngredientError, null, 2) }</pre> */}
            </div>
          )
  }
}

export default MenuUploadForm