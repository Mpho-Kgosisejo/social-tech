import React from 'react'
import { Form, Button, Dropdown, Input, Label, Checkbox, Segment, FormField } from 'semantic-ui-react'
import ContextAPI from '../../../../../src/config/ContextAPI';
import api from "../../../../../src/providers/APIRequest"
import { isEmptyObj } from "../../../../../src/utils/Objs"
import validator from 'validator'
import * as MessageTypes from "../../../../../src/Types/MessageTypes"
import { InLineError } from '../../../../Messages/InLineMessage';

class DashboardMenuPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      // checkboxToggled : true,
      products: [],
      ProStatus : 0,
      ProductResponseMessage : "",
      categories : [],
      CategoryResponseMessage : "",
      CatStatus : 0,
      productUploadBody : {
        name : "",
        description : "",
        price : 0,
        image : null,
        available : true,
        menuCategoryId : "",
        ingredients :[]
      },
      errorBody : {},
      inputIngredient : "",
    }
  }

  // <------------------- BEGIN API CALL ------------------------>
  getMenu = async () => {
    const data = await api.menu.menu_products()
    const _products = data.data.items
    if (data.status === 200 || data.status === 304) {
      this.setState({ products: _products, ProStatus : data.status, ProductResponseMessage : data.data.message,})
      // console.log(this.state)
    } else {
      this.setState({ ProStatus : data.status, ProductResponseMessage : data.data.message })
      // console.log(this.state)
    }
  }

  getCategories = async () => {
    const data = await api.menu.menu_categories()
    const _categories = data.data.data
    if (data.status === 200) {
      this.setState({ categories: _categories, CatStatus : data.status, CategoryResponseMessage : data.data.message})
      // console.log(this.state)
    } else {
      this.setState({ CatStatus : data.status, CategoryResponseMessage : data.data.message })
      // console.log(this.state)
    }
  }
  // <------------------- BEGIN API CALL ------------------------>

  addIngredients = () => {
    let newIngrArr = this.state.productUploadBody.ingredients

    newIngrArr.push(this.state.inputIngredient)
    this.setState({
      productUploadBody : {
        ...this.state.productUploadBody,
        ingredients : newIngrArr
      }
    })
  }

  handleDropDownChange = (e, { value }) => {
    this.setState({
      productUploadBody: {
        ...this.state.productUploadBody,
        menuCategoryId : value
      }
    })
  }

  handleCheckBoxChange = () => {
    if (this.state.productUploadBody.available)
    {
      this.setState({
        productUploadBody: {
          ...this.state.productUploadBody,
          available : false
        }
      })
    }
    else 
    {
      this.setState({
        productUploadBody: {
          ...this.state.productUploadBody,
          available : true
        }
      })
    }
  }

  onChange = (iVT) => {

    if (iVT.target.name === "product_ingredient")
    {
        this.setState({inputIngredient : iVT.target.value})
    }
    else if (iVT.target.name === "image")
    {
      console.log("before ===", iVT.target.files[0])
      this.setState({
        productUploadBody: {
          ...this.state.productUploadBody,
          image : iVT.target.files[0]
        }
      })
      console.log(">>>>>>>>>>>>", this.state.productUploadBody.image)
    }
    else {
      this.setState({
        productUploadBody: {
          ...this.state.productUploadBody,
          [iVT.target.name]: iVT.target.value
        }
      })
    }
  }

  validate = () => {
    const {name, description, price, image, menuCategoryId, ingredients} = this.state.productUploadBody
    const errors = {}

    if (validator.isEmpty(name, { ignore_whitespace: true })) {
      errors.name = MessageTypes.FIELD_CANT_BE_EMPTY
    }
    if (validator.isEmpty(description, { ignore_whitespace: true })){
      errors.description =  MessageTypes.FIELD_CANT_BE_EMPTY
    }
    if (isEmptyObj(ingredients))
    {
      errors.ingredients = "You have to add at least 1 ingredient."
    }
    if (!validator.isInt(price.toString() , {min : 1}) || !validator.isFloat(price.toString()))
    {
      errors.price = "Please put in a valid number, which is not less than R 0.5"
    }
    if (validator.isEmpty(menuCategoryId))
    {
      errors.menuCategoryId = "Please select a category to which this product belongs."
    }
    return(errors)
  }

  uploadMenu = () => {
    const errors = this.validate()
    this.setState({
      errorBody : errors
    })
  }

  componentDidMount() {
    this.getMenu()
    this.getCategories()
  }

  render() {
    const { products, categories, productUploadBody, inputIngredient, errorBody} = this.state
    return (
      <div>
        {/* ========================= */}
        <div className="dashboard-menu-page-container">
          <div className="menu-upload-header">
            <h3>Upload Menu</h3>
          </div>
          <div className="menu-upload-form">
            <Form onSubmit={this.uploadMenu}>
              <Form.Field error={!isEmptyObj(errorBody.name)}>
                <label>Product Name</label> 
                <Input name="name" value={productUploadBody.name} onChange={iVT => this.onChange(iVT) } placeholder='Name' />
                {errorBody.name && <InLineError message={errorBody.name}/>}
              </Form.Field>
              <Form.Field error={!isEmptyObj(errorBody.description)}>
                <label>Product Description</label>
                <Input name="description" value={productUploadBody.description} onChange={iVT => this.onChange(iVT) } placeholder='Description' />
                {errorBody.description && <InLineError message={errorBody.description}/>}
              </Form.Field>
              <Form.Field error={!isEmptyObj(errorBody.price)}>
                <label>Price</label> 
                <Input name="price" value={productUploadBody.price} onChange={iVT => this.onChange(iVT) } labelPosition='Left' type='text' placeholder='Amount'>
                  <Label basic>R</Label>
                  <input />
                </Input>
                {errorBody.price && <InLineError message={errorBody.price}/>}
              </Form.Field>
              <Form.Field error={!isEmptyObj(errorBody.image)}>
                <label>Product Image </label> 
                <Input name="image" onChange={iVT => this.onChange(iVT) } type='file'/>
                {errorBody.image && <InLineError message={errorBody.image}/>}
              </Form.Field>
              <Form.Field error={!isEmptyObj(errorBody.ingredients)}> 
                <label>Ingredients</label> 
                <Input name="product_ingredient" value={inputIngredient} onChange={iVT => this.onChange(iVT) } action={<Button negative={!isEmptyObj(errorBody.ingredients)} onClick={this.addIngredients} >Add</Button>}></Input>
                {errorBody.inputIngredient && <InLineError message={errorBody.inputIngredient}/>}
              </Form.Field>
              <Segment className="ingredients-list-segment">
                {isEmptyObj(productUploadBody.ingredients) ? <Label><h4>There are no ingredients yet, add some.</h4></Label> : 
                    productUploadBody.ingredients.map(ingrdnt =>(
                      <Label>{ingrdnt}</Label>
                    ))
                }
              </Segment>
              <Form.Field>
                  <label>Category</label>
                  <div className="category-available-upload-div">
                    {isEmptyObj(categories) ?  <Label>You have to create a category first</Label> : 
                        <Dropdown error={!isEmptyObj(errorBody.menuCategoryId)} placeholder='Select Category' onChange={this.handleDropDownChange}  clearable selection options={
                          categories.map(category => (
                            { text: category.title, value: category._id}
                            ))
                          } />  
                    }
                    <Checkbox className="toggle-checkbox" defaultChecked toggle onChange={this.handleCheckBoxChange} label={<label>Is this product available?</label>} />
                  </div>
                  { errorBody.menuCategoryId && <InLineError message={errorBody.menuCategoryId}/> }
              </Form.Field>
              <Form.Button size='large' primary type='submit' >Submit</Form.Button>
            </Form>
          </div>
        </div>
        {/* ===================== */}

        <pre>{JSON.stringify(this.state.productUploadBody, null, 2) }</pre>
        <pre>{JSON.stringify(this.state.errorBody, null, 2) }</pre>
        <pre>{JSON.stringify(this.state.temp_catID, null, 2) }</pre>         
      </div>
    )
  }
}

export default DashboardMenuPage