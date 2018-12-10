import React from 'react'
import { Form, Button, Dropdown, Input, Label, Checkbox, Segment } from 'semantic-ui-react'
import ContextAPI from '../../../../../src/config/ContextAPI';
import api from "../../../../../src/providers/APIRequest"
import { isEmptyObj } from "../../../../../src/utils/Objs"

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
      inputIngredient : "",
      ingrdnt_message : "There are no ingredients yet, add some."
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

  componentDidMount() {
    this.getMenu()
    this.getCategories()
  }

  render() {
    const { products, categories, productUploadBody, inputIngredient, ingrdnt_message } = this.state
    return (
      <div>
        {/* ========================= */}
        <div className="dashboard-page-container">
          <div className="form-upload-header">
            <h3>Upload Menu</h3>
          </div>
          <div className="menu-upload-form">
            <Form>
              <Form.Field>
                Product Name <Input name="name" value={productUploadBody.name} onChange={iVT => this.onChange(iVT) } placeholder='Name' />
              </Form.Field>
              <Form.Field>
                Product Description <Input name="description" value={productUploadBody.description} onChange={iVT => this.onChange(iVT) } placeholder='Description' />
              </Form.Field>
              <Form.Field>
                Price <Input name="price" value={productUploadBody.price} onChange={iVT => this.onChange(iVT) } labelPosition='Left' type='text' placeholder='Amount'>
                  <Label basic>R</Label>
                  <input />
                </Input>
              </Form.Field>
              <Form.Field>
                Product Image <Input name="image" onChange={iVT => this.onChange(iVT) } type='file'/>
              </Form.Field>
              <Form.Field> 
                Ingredients <Input name="product_ingredient" value={inputIngredient} onChange={iVT => this.onChange(iVT) } action={<Button onClick={this.addIngredients}>Add</Button>}></Input>
              </Form.Field>
              <Segment className="ingredients-list-segment">
                {isEmptyObj(productUploadBody.ingredients) ? <Label><h4>{ingrdnt_message}</h4></Label> : 
                    productUploadBody.ingredients.map(ingrdnt =>(
                      <Label>{ingrdnt}</Label>
                    ))
                }
              </Segment>
              Category
              <div className="category-available-upload-div">
                {isEmptyObj(categories) ?  <Label>You have to create a category first</Label> : 
                    <Dropdown placeholder='Select Category' onChange={this.handleDropDownChange}  clearable selection options={
                      categories.map(category => (
                        { text: category.title, value: category._id}
                      ))
                  } />  
                }
                <Checkbox className="toggle-checkbox" defaultChecked toggle onChange={this.handleCheckBoxChange} label={<label>Is this product available?</label>} />
              </div>
              <Button className="form-button-submit" size='large' primary type='submit'>Submit</Button>
            </Form>
          </div>
        </div>
        {/* ===================== */}

        <pre>{JSON.stringify(this.state.productUploadBody, null, 2) }</pre>
        <pre>{JSON.stringify(this.state.temp_catID, null, 2) }</pre>         
      </div>
    )
  }
}

export default DashboardMenuPage