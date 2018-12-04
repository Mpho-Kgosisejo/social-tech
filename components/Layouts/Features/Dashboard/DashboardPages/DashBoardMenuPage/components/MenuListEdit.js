import { Button, Image, Card, Modal, Header, Icon } from 'semantic-ui-react'
import MenuUploadForm from './MenuUploadForm';
import ContextApi from '../../../../../../../src/config/ContextAPI'
import api from '../../../../../../../src/providers/APIRequest';
import { isEmptyObj } from '../../../../../../../src/utils/Objs';
import MenuEditForm from './MenuEditForm';


class MenuListEdit extends React.Component {
    constructor ()
    {
        super()
        this.state = {
            isDeleteModalOpen : false,
            isEditModalOpen : false,
            reqBody : {},
            newCategoryList : {},
            editId : ''
        }
    }

    handleEditModal = (productId) => {
        if (this.state.isEditModalOpen)
            this.setState({ isEditModalOpen : false })
        else 
            this.setState({ isEditModalOpen : true, editId : productId })
    }

    handleDeleteModal = (product) => {
        if (this.state.isDeleteModalOpen)
            this.setState({ isDeleteModalOpen : false })
        else 
            this.setState({ isDeleteModalOpen : true, 
                reqBody : product
            })
    }

    confirmProductDelete = async (dispatch) => {

        if (!isEmptyObj(this.state.reqBody))
        {
            const response = await api.menu.delete_product(this.state.reqBody)
            if (response.status === 200)
            {   
                this.setState({
                    newCategoryList : response.data.data,
                    reqBody : {}
                })
                dispatch({type : "ALERT_PORTAL", payload : {
                    open : true, 
                    type : 'success',
                    message : "Successfully deleted the product."
                }})
            }
            else
            {
                dispatch({type : "ALERT_PORTAL", payload : {
                    open : true, 
                    type : 'error',
                    message : "Could not delete the product."
                }})
            }
        }
        else 
        {
            console.log("hmmmm")
        }
        this.setState({isDeleteModalOpen : false})
    }


    render ()
    {
        const { products, categories} = this.props
        const { isDeleteModalOpen, newCategoryList, isEditModalOpen, editId } = this.state

        return (
            <div> { /* ========================= */ } 
                <div className = "dashboard-menu-page-container">
                    <div className = "menu-upload-header">
                        <h3> Create a new menu category </h3> 
                        {/* <Modal trigger={
                            <Button basic >
                                Upload New Menu
                            </Button>}>
                                <MenuUploadForm categories={categories} />
                        </Modal> */}
                    </div> 

                    <div className = "upload-contents">
                        <ContextApi.Consumer>
                            {({state}) => ( 
                                <Card.Group>
                                {isEmptyObj(newCategoryList) ? 
                                    products.map( product => (
                                        <Card>
                                            <Card.Content>
                                                <Image floated='right' size='mini' src={product.image} />
                                                <Card.Header>{product.name}</Card.Header>
                                                <Card.Meta>{product.price}</Card.Meta>
                                                <Card.Description>
                                                    {product.description}
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                            <Button.Group fluid>
                                                <Modal open={isEditModalOpen}  size='small' trigger={
                                                    <Button onClick={() => this.handleEditModal(product._id)} basic color='green'>
                                                        Edit
                                                    </Button>
                                                }>
                                                    <MenuEditForm productId={editId} categories={categories}/>
                                                </Modal>
                                                
                                                
                                                <Modal open={isDeleteModalOpen} basic size='small' trigger={<Button onClick={() => this.handleDeleteModal(product)} basic color='red'>
                                                                    Delete
                                                                </Button>}>
    
                                                    <Header icon='delete' content='Delete Product' />
                                                    <Modal.Content>
                                                        <p>
                                                            Are you sure you want to delete this product?
                                                        </p>
                                                    </Modal.Content>
                                                    <Modal.Actions>
                                                            <Button onClick={() => this.handleDeleteModal()} basic color='red' inverted>
                                                                <Icon name='remove' /> No
                                                            </Button>
                                                            <Button onClick={() => this.confirmProductDelete(state.dispatch)} color='green' inverted>
                                                                <Icon name='checkmark' /> Yes
                                                            </Button>
                                                    </Modal.Actions>
                                                </Modal>                                        
                                            </Button.Group>
                                            </Card.Content>
                                        </Card>
                                    ))
                                 :
                                    newCategoryList.map( product => (
                                        <Card>
                                            <Card.Content>
                                                <Image floated='right' size='mini' src={product.image} />
                                                <Card.Header>{product.name}</Card.Header>
                                                <Card.Meta>{product.price}</Card.Meta>
                                                <Card.Description>
                                                    {product.description}
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                            <Button.Group fluid>
                                                <Button basic color='green'>
                                                    Edit
                                                </Button>
                                                
                                                <Modal open={isDeleteModalOpen} basic size='small' trigger={<Button onClick={() => this.handleDeleteModal(product)} basic color='red'>
                                                                    Delete
                                                                </Button>}>

                                                    <Header icon='delete' content='Delete Product' />
                                                    <Modal.Content>
                                                        <p>
                                                            Are you sure you want to delete this product?
                                                        </p>
                                                    </Modal.Content>
                                                    <Modal.Actions>
                                                            <Button onClick={() => this.handleDeleteModal()} basic color='red' inverted>
                                                                <Icon name='remove' /> No
                                                            </Button>
                                                            <Button onClick={() => this.confirmProductDelete(state.dispatch)} color='green' inverted>
                                                                <Icon name='checkmark' /> Yes
                                                            </Button>
                                                    </Modal.Actions>
                                                </Modal>                                        
                                            </Button.Group>
                                            </Card.Content>
                                        </Card>
                                    ))
                                }
                                
                                </Card.Group>
                        )}
                        </ContextApi.Consumer>
                    </div>
                </div>
                {/* <pre>{ JSON.stringify(this.state, null, 2) }</pre>  */}
            </div>
        )
    }
}

export default MenuListEdit