import { Table, Image, Icon, Button, Checkbox, Input } from 'semantic-ui-react'
import { isEmptyObj } from "../../../../../../../src/utils/Objs"
import validator from 'validator'
import * as MessageTypes from "../../../../../../../src/Types/MessageTypes"
import { InLineError } from '../../../../../../Messages/InLineMessage'
import api from "../../../../../../../src/providers/APIRequest"

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
            newCategoryList : [],
            errorBody : []
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

    uploadCategory = () => {

        const errors = {}

        if (validator.isEmpty(this.state.newCategory.title, { ignore_whitespace: true })) 
        {
            errors.title = MessageTypes.FIELD_CANT_BE_EMPTY
            this.setState({
                errorBody : {
                    ...this.state.errorBody,
                    errors
                }
            })
        }
        else 
        {
            const res = api.menu.upload_menu(this.state.newCategory)
            console.log(res)

            let newArr = [...this.state.newCategoryList, this.state.newCategory]
        
            this.setState({
                newCategoryList : newArr,
                isAddingCategory : false,
                newCategory : {
                    name : "", 
                    title : "",
                    show : false
                }
            })
        }
    }

    render ()
    {
        const { categories, products } = this.props
        const { isAddingCategory, newCategory, newCategoryList} = this.state
        return (
            <div> { /* ========================= */ } 
                <div className = "dashboard-menu-page-container">
                <div className = "menu-upload-header">
                    <h3> Create a new menu category </h3> 
                </div> 
                <div className = "upload-contents">
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
                                </Table.Cell>
                                <Table.Cell disabled>
                                    0
                                </Table.Cell>
                                <Table.Cell>
                                    <Checkbox onChange = { this.handleCheckBoxChange } />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={this.uploadCategory} icon basic size='small'>
                                        <Icon size='small' name='save'/>
                                        Save
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                            : null 
                        }
                        { categories.map( ctgry => (
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
                                    <Button icon size='small'>
                                        <Icon size='small' name='delete'/>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {!isEmptyObj(newCategoryList) ? 
                            newCategoryList.map( ctgry => (
                                <Table.Row key={ctgry.name} textAlign='center'>
                                    <Table.Cell>{ctgry.title}</Table.Cell>
                                    <Table.Cell>{this.count_item_number(ctgry, products)}</Table.Cell>
                                    <Table.Cell>
                                        <Checkbox disabled defaultChecked={ctgry.show ? true : false }/>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button icon size='small'>
                                            <Icon size='small' name='pencil'/>
                                        </Button>
                                        <Button icon size='small'>
                                            <Icon size='small' name='delete'/>
                                        </Button>
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