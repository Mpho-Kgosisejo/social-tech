import { Button, Image, Card, Modal } from 'semantic-ui-react'
import MenuUploadForm from './MenuUploadForm';

class MenuListEdit extends React.Component {
    constructor ()
    {
        super()
    }

    render ()
    {
        const { products, categories} = this.props
        return (
            <div> { /* ========================= */ } 
                <div className = "dashboard-menu-page-container">
                    <div className = "menu-upload-header">
                        <h3> Create a new menu category </h3> 
                        <Modal trigger={
                            <Button basic >
                                Upload New Menu
                            </Button>}>
                                <MenuUploadForm categories={categories} />
                        </Modal>
                    </div> 

                    <div className = "upload-contents">
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
                                        
                                        <Button basic color='red'>
                                            Delete
                                        </Button>

                                    </Button.Group>
                                    </Card.Content>
                                </Card>
                            ))}
                        </Card.Group>
                    </div>
                </div>
                <pre>{ JSON.stringify(products, null, 2) }</pre> 
            </div>
        )
    }
}

export default MenuListEdit