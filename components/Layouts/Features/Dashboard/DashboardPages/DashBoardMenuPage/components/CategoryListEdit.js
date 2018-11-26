import { Table, Image, Icon, Button, Checkbox, Input } from 'semantic-ui-react'
import { isEmptyObj } from "../../../../../../../src/utils/Objs"

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
            newCategoryList : []
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
            this.setState({
                newCategory: {
                    ...this.state.newCategory,
                    name : iVT.target.value.toLowerCase(), 
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

    uploadCategorsy = (categories) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>", categories)
    }

    render ()
    {
        const { categories, products } = this.props
        const { isAddingCategory, newCategory} = this.state
        return (
            <div> { /* ========================= */ } 
                <div className = "dashboard-menu-page-container">
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
                                    <Button onClick={this.uploadCategorsy(categories)} icon basic size='small'>
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
                    </Table.Body>   
                </Table>
                </div>
                <pre>{ JSON.stringify(this.state, "", 2) }</pre> 
            </div>
        )
    }
}

export default CategoryListEdit