import { Table, Modal, Header , Icon, Button, Checkbox, Input } from 'semantic-ui-react'
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import validator from 'validator'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import api from "../../../../../../../src/providers/APIRequest"
import ContextApi from '../../../../../../../src/config/ContextAPI'
import { jsUcfirst } from '../../../../../../../src/utils/jsUcfirst';

class CategoryListEdit extends React.Component {
    constructor (props)
    {
        super(props)
        this.state = {
            isAddingCategory : false,
            newCategory : {
                name : '',
                title : '',
                show : false
            },
            deleteCategory : {
                name : '',
                title : '',
                show : false
            },
            errorBody : [],
            modalOpen : false,
            isEditing : false,
            editCategory : {
                name : '',
                title : '',
                show : false
            },
            edit_Id : ""
        }
    }

    addCategory = () => {
        if (this.state.isAddingCategory)
            this.setState({ isAddingCategory : false})
        else
            this.setState({ isAddingCategory : true})
    }

    handleCheckBoxChange = () => {

        if (this.state.isAddingCategory)
        {
            if (this.state.newCategory.show) {
                this.setState({
                    newCategory: {
                        ...this.state.newCategory,
                        show: false
                    }
                })
            } else {
                this.setState({
                    newCategory: {
                        ...this.state.newCategory,
                        show: true
                    }
                })
            }
        }
        else if (this.state.isEditing) {
            if (this.state.editCategory.show) {
                this.setState({
                    editCategory: {
                        ...this.state.editCategory,
                        show: false
                    }
                })
            } else {
                this.setState({
                    editCategory: {
                        ...this.state.editCategory,
                        show: true
                    }
                })
            }
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    onChange = (iVT) => {

        if (iVT.target.name == "addNewItem") {
            let split_lower = iVT.target.value.toLowerCase().split(" ").join("")
            this.setState({
                newCategory: {
                    ...this.state.newCategory,
                    name : split_lower, 
                    title :  iVT.target.value
                }
            })
        }
        if (iVT.target.name == "editCategory") {
            let split_lower = iVT.target.value.toLowerCase().split(" ").join("")
            this.setState({
                editCategory: {
                    ...this.state.editCategory,
                    name : split_lower, 
                    title : iVT.target.value
                }
            })
        }
    }

    count_item_number = (_category, _products) => {
        let index = 0
        _products.forEach(prdct => {
            if(prdct.menuCategoryId == _category._id)
                index += 1
        })
        return index
    }

    uploadCategory = async (dispatch) => {
        const errors = {}

        if (validator.isEmpty(this.state.newCategory.title, { ignore_whitespace: true })) 
        {
            errors.title = MessageTypes.FIELD_CANT_BE_EMPTY
            this.setState({
                errorBody : errors
            })
        }
        else 
        {
            let ctgry = this.state.newCategory
            ctgry.title = jsUcfirst(ctgry.title)
            const res = await api.menu.upload_menu(ctgry)

            console.log(ctgry)

            if(res.status === 200){
                let newArr = res.data.data
        
                this.props.refreshState ({
                    categories : newArr
                })

                this.setState({
                    newCategoryList : newArr,
                    isAddingCategory : false,
                    newCategory : {
                        name : "", 
                        title : "",
                        show : false
                    },
                    errorBody : []
                })

                dispatch({type : "ALERT_PORTAL", payload : {
                    open : true, 
                    type : 'success',
                    message : "Successfully added a new category"
                }}) 
            }
            else if (res.status === 501){
                dispatch({type : "ALERT_PORTAL", payload : {
                    open : true, 
                    type : 'error',
                    message : "The title you selected already exists."
                }}) 
                this.setState({
                    newCategory : {
                        name : "", 
                        title : "",
                        show : false
                    }
                })
            }
        }
    }

    openCloseConfirm = (ctgry) => {
        if (this.state.modalOpen)
            this.setState({ modalOpen : false})
        else
        {
            this.setState({ deleteCategory : ctgry , modalOpen : true}) 
        }
    }

    confirmDelete = async (dispatch) => {
        const response = await api.menu.delete_category(this.state.deleteCategory)
        if (response.status === 200)
        {   
            this.setState({
                deleteCategory : {}
            })

            const getProducts = await api.menu.menu_products()

            this.props.refreshState ({
                categories : response.data.data,
                products : getProducts.data.items
            })

            dispatch({type : "ALERT_PORTAL", payload : {
                open : true, 
                type : 'success',
                message : "Successfully deleted the category and its items."
            }})
        }
        else
        {
            dispatch({type : "ALERT_PORTAL", payload : {
                open : true, 
                type : 'error',
                message : "Could not delete the category."
            }})
        }
        this.setState({ modalOpen : false })
    }

    saveEdit = async (dispatch) => {
        const errors = {}

        if (validator.isEmpty(this.state.editCategory.title, { ignore_whitespace: true })) {
            errors.title = MessageTypes.FIELD_CANT_BE_EMPTY
            this.setState({
                errorBody : errors
            })
        }
        else {
            let ctgry = this.state.editCategory
            ctgry.title = jsUcfirst(ctgry.title)
            const response = await api.menu.update_category(ctgry)
            if (response.status === 200)
            {   
                

                this.props.refreshState ({
                    categories : response.data.data
                })

                this.setState({
                    editCategory : {},
                    edit_Id : ""
                })
                dispatch({type : "ALERT_PORTAL", payload : {
                    open : true, 
                    type : 'success',
                    message : "Successfully updated the category."
                }})
            }
            else
            {
                dispatch({type : "ALERT_PORTAL", payload : {
                    open : true, 
                    type : 'error',
                    message : "Could not update the category."
                }})
            }
            this.setState({ isEditing : false })
        }
    }

    startEditingCategory = (ctgry) => {
        this.setState({
            isEditing : true,
            editCategory : ctgry, 
            edit_Id : ctgry._id
        })
    }

    render ()
    {
        const { categories, products } = this.props
        const { isAddingCategory, newCategory, newCategoryList, errorBody, modalOpen, isEditing, edit_Id, editCategory} = this.state
        return (
            <div> { /* ========================= */ } 
                <div className = "dashboard-menu-page-container">
                <div className = "menu-upload-header">
                    <h3> Menu Categories </h3> 
                </div> 
                <div className = "upload-contents">

                {/* <----------------------- MODAL -----------------------> */}

                <Table celled>
                    <Table.Header>
                        <Table.Row textAlign='center'>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Number of items</Table.HeaderCell>
                            <Table.HeaderCell>Show Category</Table.HeaderCell>
                            <Table.HeaderCell className="category-table-add-row">
                                <Button onClick={this.addCategory} icon basic size='small'>
                                    <Icon size='small' name={isAddingCategory ? 'cancel' : 'add'}/>
                                    {isAddingCategory ? 'Cancel' : 'Add'}
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {isAddingCategory ? 
                            <Table.Row textAlign='center'>
                                <Table.Cell>
                                    <Input name='addNewItem' value = { newCategory.title } onChange = { iVT => this.onChange(iVT)} fluid rows={1}/>
                                    { errorBody.title && < InLineError message = {errorBody.title}/>} 
                                </Table.Cell>
                                <Table.Cell disabled>
                                    0
                                </Table.Cell>
                                <Table.Cell>
                                    <Checkbox onChange = { this.handleCheckBoxChange } />
                                </Table.Cell>
                                <Table.Cell>
                                    <ContextApi.Consumer>
                                        {({state}) => (
                                            <Button onClick={ () => this.uploadCategory(state.dispatch)} icon basic size='small'>
                                                <Icon size='small' name='save'/>
                                                Save
                                            </Button>
                                        )}
                                    </ContextApi.Consumer>
                                </Table.Cell>
                            </Table.Row>
                            : null 
                        }
                        {
                            categories.map( ctgry => (
                                <Table.Row key={ctgry._id} textAlign='center'>
                                    { (isEditing && validator.equals(ctgry._id, edit_Id)) ? 
                                        <Table.Cell>
                                            <Input name='editCategory' value = { editCategory.title } onChange = { iVT => this.onChange(iVT)} fluid rows={1}/> 
                                            { errorBody.title && < InLineError message = {errorBody.title}/>} 
                                        </Table.Cell> :  
                                        <Table.Cell>{ctgry.title}</Table.Cell> 
                                    }
                                    <Table.Cell>{this.count_item_number(ctgry, products)}</Table.Cell>
                                    <Table.Cell>
                                        { (isEditing && validator.equals(ctgry._id, edit_Id)) ? 
                                            <Checkbox onChange = { this.handleCheckBoxChange }  defaultChecked={ctgry.show ? true : false }/> 
                                            :  
                                            <Checkbox disabled defaultChecked={ctgry.show ? true : false }/>
                                        }
                                        
                                    </Table.Cell>
                                    <Table.Cell>
                                        { (isEditing && validator.equals(ctgry._id, edit_Id)) ?
                                            <ContextApi.Consumer>
                                                {({state}) => (
                                                    <Button icon size='small' onClick={() => this.saveEdit(state.dispatch)}>
                                                    <Icon size='small' name='check'/>
                                                </Button>
                                                )}
                                            </ContextApi.Consumer>
                                            : 
                                            <Button icon size='small' onClick={() => this.startEditingCategory(ctgry)}>
                                                <Icon size='small' name='pencil'/>
                                            </Button> 
                                        }
                                        <Modal 
                                            basic
                                                open={modalOpen}
                                            trigger={
                                                <Button onClick={() => this.openCloseConfirm(ctgry)} icon size='small'>
                                                    <Icon size='small' name='delete'/>
                                                </Button>
                                            }  size='small'>

                                                <Header content='Delete' />
                                                <Modal.Content>
                                                <p>
                                                    This category might have products in it, do you want to delete it anyway?
                                                </p>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button onClick={() => this.openCloseConfirm()} basic color='red' inverted>
                                                        <Icon name='remove' /> No
                                                    </Button>
                                                    <ContextApi.Consumer>
                                                        {({state}) => (
                                                            <Button onClick={() => this.confirmDelete(state.dispatch)} color='green' inverted>
                                                                <Icon name='checkmark' /> Yes
                                                            </Button>
                                                        )}
                                                    </ContextApi.Consumer>
                                                    
                                                </Modal.Actions>
                                        </Modal>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>   
                </Table>
                </div>
                </div>
                {/* <pre>{ JSON.stringify(this.state.newCategory, "", 2) }</pre>  */}
            </div>
        )
    }
}

export default CategoryListEdit
