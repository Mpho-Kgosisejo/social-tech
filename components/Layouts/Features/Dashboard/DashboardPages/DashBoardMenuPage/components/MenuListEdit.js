import { Button, Image, Card, Modal, Header, Icon, Pagination, Menu, Input } from 'semantic-ui-react'
import MenuUploadForm from './MenuUploadForm';
import ContextApi from '../../../../../../../src/config/ContextAPI'
import api from '../../../../../../../src/providers/APIRequest';
import { isEmptyObj } from '../../../../../../../src/utils/Objs';
import MenuEditForm from './MenuEditForm';


class MenuListEdit extends React.Component {
    constructor (props)
    {
        super(props)

        this.state = {
            isDeleteModalOpen : false,
            isEditModalOpen : false,
            isUploadModalOpen : false ,
            reqBody : {},
            newCategoryList : {},
            editId : '',

            //pagination stuff
            activePage: 1,
            cardsPerPage : 18,

            //search stuff
            searchResult : [],
            isSearching : false,
        }
    }

    handleUploadModal = () => {
        if (this.state.isUploadModalOpen)
            this.setState({ isUploadModalOpen : false})
        else 
            this.setState({ isUploadModalOpen : true})
    }

    handleEditModal = (productId) => {
        if (this.state.isEditModalOpen)
            this.setState({ isEditModalOpen : false})
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
                    reqBody : {},
                })
                this.props.refreshState({
                    products : this.state.newCategoryList
                })
                // dispatch({type : "ALERT_PORTAL", payload : {
                //     open : true, 
                //     type : 'success',
                //     message : "Successfully deleted the product."
                // }})
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

    countNumberOfPages = (list, cardsPerPage) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(list.length / cardsPerPage); i++) {
          pageNumbers.push(i);
        }
        return(pageNumbers.length)
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    //search filter 
    filterList = (event) => {
        let currentList = [];
        let newList = [];

            // If the search bar isn't empty
        if (event.target.value !== "") {
            currentList = this.props.products

            newList = currentList.filter(item => {
                const lc = item.name.toLowerCase()
                const filter = event.target.value.toLowerCase()

                return lc.includes(filter)
            })

            this.setState({
                searchResult : newList,
                isSearching : true
            });
        }
        else {
            this.setState({
                isSearching : false
            })
        }
    }

    getListToRender = (activePage, cardsPerPage) => {
        //configure Pagination things
        const indexOfLastCard = activePage * cardsPerPage;
        const indexOfFirstCard = indexOfLastCard - cardsPerPage;
        
        if (this.state.isSearching)
        {
            return (this.state.searchResult.slice(indexOfFirstCard, indexOfLastCard))
        }
        else {
            if(isEmptyObj(this.props.products))
                return {}
            return (this.props.products.slice(indexOfFirstCard, indexOfLastCard))
        }
    }

    render ()
    {
        const { products, categories, refreshState} = this.props
        const { isDeleteModalOpen, isEditModalOpen, editId, isUploadModalOpen, activePage, totalPages, cardsPerPage } = this.state
        
        const currentCards = this.getListToRender(activePage, cardsPerPage)
        let renderCards = null
        if (!isEmptyObj(currentCards))
        {
            renderCards = currentCards.map((product, index) => {
                return (
                    <Card key={index}>
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
                            <Modal closeOnDimmerClick open={isEditModalOpen}  size='small' trigger={
                                <Button onClick={() => this.handleEditModal(product._id)} basic color='green'>
                                    Edit
                                </Button>
                            }>
                                <MenuEditForm refreshState={refreshState} handleEditModal={this.handleEditModal.bind(this)} productId={editId} categories={categories}/>
                            </Modal>
                            
                            
                            <Modal closeOnDimmerClick open={isDeleteModalOpen} basic size='small' trigger={<Button onClick={() => this.handleDeleteModal(product)} basic color='red'>
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
                )
            });
        }

        return (
            <div> { /* ========================= */ } 
                <div className = "dashboard-menu-page-container">
                    <div className = "product-list-header">
                            <div>
                                <h3> Menu Products </h3>
                            </div>
                            <div>
                                <Modal open={isUploadModalOpen} trigger={
                                    <Button size="medium" onClick={() => this.handleUploadModal()}  basic >
                                        Create New Product
                                    </Button>}>
                                        <MenuUploadForm handleUploadModal={this.handleUploadModal.bind(this)} refreshState={refreshState}  categories={categories} />
                                </Modal>
                                <Input className="product-search" size="medium" icon='search' type="text" onChange={() => this.filterList(event)} placeholder='Find a product' />
                            </div>
                    </div> 

                    <div className = "upload-contents">
                        <ContextApi.Consumer>
                            {({state}) => ( 
                                <div>
                                    {isEmptyObj(products) ?
                                        null 
                                        :
                                            <div>
                                                <Card.Group>
                                                    {renderCards}
                                                </Card.Group>
                                                { 
                                                    this.countNumberOfPages(products, cardsPerPage) > 1 ?     
                                                    <div className="pagination-component centered-element">
                                                    <Pagination size='tiny' onPageChange={this.handlePaginationChange} totalPages={this.countNumberOfPages(products, cardsPerPage)} />
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                    }
                                </div>
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