import { Button, Image, Card, Modal, Header, Icon } from 'semantic-ui-react'
import MenuUploadForm from './MenuUploadForm';
import ContextApi from '../../../../../../../src/config/ContextAPI'


class MenuListEdit extends React.Component {
    constructor ()
    {
        super()
        this.state = {
            isDeleteModalOpen : false,
            reqBody : {}
        }
    }

    handleDeleteModal = (product) => {
        if (this.state.isDeleteModalOpen)
            this.setState({ isDeleteModalOpen : false })
        else 
            this.setState({ isDeleteModalOpen : true, 
                reqBody : product
            })
    }


    render ()
    {
        const { products, categories} = this.props
        const { isDeleteModalOpen } = this.state

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
                                { products.map( product => (
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
                                                        <Button onClick={() => this.confirmProductDelete()} color='green' inverted>
                                                            <Icon name='checkmark' /> Yes
                                                        </Button>
                                                </Modal.Actions>
                                            </Modal>                                        
                                        </Button.Group>
                                        </Card.Content>
                                    </Card>
                                ))}
                                </Card.Group>
                        )}
                        </ContextApi.Consumer>
                    </div>
                </div>
                <pre>{ JSON.stringify(this.state, null, 2) }</pre> 
            </div>
        )
    }
}

export default MenuListEdit