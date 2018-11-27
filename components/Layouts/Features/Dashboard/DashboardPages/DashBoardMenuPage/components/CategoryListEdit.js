import { Table, Modal, Header , Icon, Button, Checkbox, Input } from 'semantic-ui-react'
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import validator from 'validator'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import api from "../../../../../../../src/providers/APIRequest"
import ContextApi from '../../../../../../../src/config/ContextAPI'

class CategoryListEdit extends React.Component {
    constructor ()
    {
        super()
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
            newCategoryList : [],
            errorBody : [],
            modalOpen : false,
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
    }

    onChange = (iVT) => {

        if (iVT.target.name == "addNewItem") {
            let split_lower = iVT.target.value.toLowerCase().split(" ").join("")
            this.setState({
                newCategory: {
                    ...this.state.newCategory,
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
            const res = await api.menu.upload_menu(this.state.newCategory)
            console.log(res)

            if(res.status === 200){
                let newArr = res.data.data
        
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

    openCloseConfirm = () => {
        if (this.state.modalOpen)
            this.setState({ modalOpen : false})
        else
            this.setState({ modalOpen : true })
    }

    confirmDelete = async (ctgry, dispatch) => {
        const response = await api.menu.delete_category(ctgry)
        if (response.status === 200)
        {   
            this.setState({
                newCategoryList : response.data.data
            })
            dispatch({type : "ALERT_PORTAL", payload : {
                open : true, 
                type : 'success',
                message : "Successfully delete the category and its items."
            }})
        }
        else
        {
            dispatch({type : "ALERT_PORTAL", payload : {
                open : true, 
                type : 'error',
                message : "Could not delet the category."
            }})
        }
        this.setState({ modalOpen : false })
    }

    render ()
    {
        const { categories, products } = this.props
        const { isAddingCategory, newCategory, newCategoryList, errorBody, modalOpen} = this.state
        return (
            <div> { /* ========================= */ } 
                <div className = "dashboard-menu-page-container">
                <div className = "menu-upload-header">
                    <h3> Create a new menu category </h3> 
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
                        {isEmptyObj(newCategoryList) ? 
                             categories.map( ctgry => (
                                <Table.Row key={ctgry._id} textAlign='center'>
                                    <Table.Cell>{ctgry.title}</Table.Cell>
                                    <Table.Cell>{this.count_item_number(ctgry, products)}</Table.Cell>
                                    <Table.Cell>
                                        <Checkbox disabled defaultChecked={ctgry.show ? true : false }/>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button icon size='small'>
                                            <Icon size='small' name='pencil'/>
                                        </Button>
                                        <Modal 
                                            basic
                                            open={modalOpen}
                                            trigger={
                                                <Button onClick={() => this.openCloseConfirm()} icon size='small'>
                                                    <Icon size='small' name='delete'/>
                                                </Button>
                                            }  size='small'>

                                                <Header icon='archive' content='Archive Old Messages' />
                                                <Modal.Content>
                                                <p>
                                                    This category has {this.count_item_number(ctgry, products)} products in it, delete it anyway?
                                                </p>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button onClick={() => this.openCloseConfirm()} basic color='red' inverted>
                                                        <Icon name='remove' /> No
                                                    </Button>
                                                    <ContextApi.Consumer>
                                                        {({state}) => (
                                                            <Button onClick={() => this.confirmDelete(ctgry, state.dispatch)} color='green' inverted>
                                                                <Icon name='checkmark' /> Yes
                                                            </Button>
                                                        )}
                                                    </ContextApi.Consumer>
                                                    
                                                </Modal.Actions>
                                        </Modal>
                                    </Table.Cell>
                                </Table.Row>
                            )) : null
                        }
                        {!isEmptyObj(newCategoryList) ? 
                            newCategoryList.map( ctgry => (
                                <Table.Row key={ctgry._id} textAlign='center'>
                                    <Table.Cell>{ctgry.title}</Table.Cell>
                                    <Table.Cell>{this.count_item_number(ctgry, products)}</Table.Cell>
                                    <Table.Cell>
                                        <Checkbox disabled defaultChecked={ctgry.show ? true : false }/>
                                    </Table.Cell>
                                    <Table.Cell>
                                    <Button icon size='small'>
                                            <Icon size='small' name='pencil'/>
                                        </Button>
                                        <Modal 
                                            trigger={
                                                <Button onClick={() => this.openConfirm(ctgry)} icon size='small'>
                                                    <Icon size='small' name='delete'/>
                                                </Button>
                                            } basic size='small' closeIcon>

                                                <Header icon='archive' content='Archive Old Messages' />
                                                <Modal.Content>
                                                <p>
                                                    This category has {this.count_item_number(ctgry, products)} products in it, delete it anyway?
                                                </p>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                <Button basic color='red' inverted>
                                                    <Icon name='remove' /> No
                                                </Button>
                                                <Button color='green' inverted>
                                                    <Icon name='checkmark' /> Yes
                                                </Button>
                                                </Modal.Actions>
                                        </Modal>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                            : null 
                        }
                    </Table.Body>   
                </Table>
                </div>
                </div>
                <pre>{ JSON.stringify(this.state, "", 2) }</pre> 
            </div>
        )
    }
}

export default CategoryListEdit