import React from 'react'
import api from "../../../../../../src/providers/APIRequest"
import MenuUploadForm from './components/MenuUploadForm'
import MenuListEdit from './components/MenuListEdit'
import CategoryListEdit from './components/CategoryListEdit'

class DashboardMenuPage extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        // checkboxToggled : true,
        products: [],
        ProStatus: 0,
        ProductResponseMessage: "",
        categories: [],
        CategoryResponseMessage: "",
        CatStatus: 0,
      }
    }

    refreshState = (newObject) => {
      // console.log("okay cool cool cool save it", newObject)
      this.setState({
          ...this.state,
          ...newObject
      })
    }

    // <------------------- BEGIN API CALL ------------------------>
    getMenu = async () => {
      const data = await api.menu.menu_products()
      const _products = data.data.items
      if (data.status === 200 || data.status === 304) {
        this.setState({
          products: _products,
          ProStatus: data.status,
          ProductResponseMessage: data.data.message,
        })
      } else {
        this.setState({
          ProStatus: data.status,
          ProductResponseMessage: data.data.message
        })
      }
    }

    getCategories = async () => {
      const data = await api.menu.menu_categories()
      const _categories = data.data.data
      if (data.status === 200) {
        this.setState({
          categories: _categories,
          CatStatus: data.status,
          CategoryResponseMessage: data.data.message
        })
        // console.log(this.state)
      } else {
        this.setState({
          CatStatus: data.status,
          CategoryResponseMessage: data.data.message
        })
        // console.log(this.state)
      }
    }
    // <------------------- BEGIN API CALL ------------------------>

    componentDidMount() {
      this.getMenu()
      this.getCategories()
    }

    render() {
        const { products, categories} = this.state
        return ( 
          <div> { /* ========================= */ } 
            <CategoryListEdit refreshState={this.refreshState} categories={categories} products={products}/>
            {/* <MenuUploadForm categories={categories} /> */}
            <MenuListEdit refreshState={this.refreshState} products={products} categories={categories}/>
          </div>
        )
  }
}

export default DashboardMenuPage