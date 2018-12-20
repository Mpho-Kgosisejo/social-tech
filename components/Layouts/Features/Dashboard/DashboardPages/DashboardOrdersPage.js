import React from 'react'
import { Container, Table, Item, Segment, Header, Button } from 'semantic-ui-react'
import api from '../../../../../src/providers/APIRequest';
import Router from 'next/router';
import ContextAPI from '../../../../../src/config/ContextAPI';
import { isEmptyObj } from "../../../../../src/utils/Objs";
// import DashboardOrderIDPage from './DashboardOrderIDPage';

class DashboardOrdersPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            orders: [],
            selectedOrder: {}
        }
    }

    getData = async () => {
        const res = await api.dashboard_orders.get_orders();

        if (res.status === 200) {
            const { orders } = res.data
            this.setState({ orders, selectedOrder: orders[0] });
        } else {
            res.status(404).send('Bad Request')
        }
    }

    onClickLink = ({ id, state }) => {
        const { dispatch, router } = state
        const query = { page: "orders", orderid: id }

        this.state.orders.forEach(order => {
            if (order._id == id) {
                this.setState({ selectedOrder: order })
            }
        })

        Router.replace({ pathname: router.route, query })
        dispatch({
            type: "ROUTER", payload: {
                ...router,
                asPath: `${router.route}/page=order&orderid=${id}`,
                query: query
            }
        })
    }

    componentDidMount() {
        this.getData()
    }

    render() {

        const { orders, selectedOrder } = this.state
        console.log(">>>>>>>>", selectedOrder._id)

        return (
            <ContextAPI.Consumer>
                {({ state }) => (
                    <>
                        <div className="dashboard-orders-table">
                            <Table basic verticalAlign="middle" columns="6" celled striped style={{ cursor: "pointer" }}>
                                <Table.Header className="table-header">
                                    <Table.Row>
                                        <Table.HeaderCell>Customer</Table.HeaderCell>
                                        <Table.HeaderCell>Order Number</Table.HeaderCell>
                                        <Table.HeaderCell>Price</Table.HeaderCell>
                                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                                        <Table.HeaderCell>Customer Number</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {orders.map(el => {
                                        return (
                                            <Table.Row key={el._id}>
                                                <Table.Cell>{el.customer.name}</Table.Cell>
                                                <Table.Cell><a onClick={() => this.onClickLink({ id: el._id, state })}>{el._id}</a></Table.Cell>
                                                <Table.Cell>{el.details.subTotal}</Table.Cell>
                                                <Table.Cell>{el.details.totalItemsCount}</Table.Cell>
                                                <Table.Cell>{el.customer.contact}</Table.Cell>
                                                <Table.Cell>{(el.status) == "approved" ? <p style={{ color: "#3CB371" }}>{el.status}</p> : (el.status) == "pending" ? <p style={{ color: "#ffa900" }}>{el.status}</p> : <p style={{ color: "#FF0000" }}>{el.status}</p>}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </div>
                        <div className="dashboard-page-container">
                        {!isEmptyObj(selectedOrder) ? 
                        // <Container>
                        <>
                                <Segment>
                                <Header sub as='h3' textAlign='left'>Customer : </Header>
                                <span textAlign='left'>{selectedOrder.customer.name}</span>
                                <Header sub as='h3' textAlign='left'>Order Number : </Header>
                                <span textAlign='left'>#{selectedOrder._id}</span>
                                <Header sub textAlign='left' >Number of Items : </Header>
                                <span textAlign='left' >{selectedOrder.details.totalItemsCount}</span>
                                <Header sub textAlign='left'>Total : </Header>
                                <span textAlign='left'>R{selectedOrder.details.total} inc. vat</span>
                                <Button floated='right' >Click Here</Button>
                                
                                </Segment>
                            
                                <Item.Group divided>
                                    {selectedOrder.items.map(menuItem => {
                                        return (
                                            <Item key={menuItem.name}>
                                                <Item.Image className="image-item" src={menuItem.image} />
                                                <Item.Content>
                                                    <Item.Header verticalAlign='middle'>{menuItem.name}</Item.Header>
                                                    <Item.Meta>Price : R{menuItem.price}</Item.Meta>
                                                    <Item.Meta>Quantity : {menuItem.quantity}</Item.Meta>
                                                </Item.Content>
                                            </Item>
                                        )
                                    })}
                                </Item.Group>
                                
                            
                        {/* // </Container>  */}
                         </> : "loading" 
                        }
                        </div>
                    </>
                )}
            </ContextAPI.Consumer>
        )
    }
}
export default DashboardOrdersPage
