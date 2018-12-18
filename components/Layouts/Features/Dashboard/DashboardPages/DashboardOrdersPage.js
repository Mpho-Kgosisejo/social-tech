import React from 'react'
import { Container, Table, Item, Segment, Header } from 'semantic-ui-react'
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

        return (
            <ContextAPI.Consumer>
                {({ state }) => (
                    <>
                        <div className="dashboard-orders-table">
                            <Table basic verticalAlign="middle" columns="6" celled striped style={{ cursor: "pointer" }}>
                                <Table.Header className="table-header">
                                    <Table.Row>
                                        <Table.HeaderCell>Customer</Table.HeaderCell>
                                        <Table.HeaderCell>Order ID</Table.HeaderCell>
                                        <Table.HeaderCell>Price</Table.HeaderCell>
                                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {orders.map(el => {
                                        return (
                                            <Table.Row key={el._id}>
                                                <Table.Cell>{el.customer}</Table.Cell>
                                                <Table.Cell><a onClick={() => this.onClickLink({ id: el._id, state })}>{el._id}</a></Table.Cell>
                                                <Table.Cell>{el.details.subTotal}</Table.Cell>
                                                <Table.Cell>{el.details.totalItemsCount}</Table.Cell>
                                                <Table.Cell>{(el.status) == "approved" ? <p style={{ color: "#3CB371" }}>{el.status}</p> : (el.status) == "pending" ? <p style={{ color: "#ffa900" }}>{el.status}</p> : <p style={{ color: "#FF0000" }}>{el.status}</p>}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </div>
                        <Container>
                        {/* {!isEmptyObj(orders) ? 
                            <Segment clearing>
                                    {orders.map(el => {
                                        return()
                                        <Header floated='left'>{el._id}</Header>
                                    })}
                            </Segment> : "load"
                        } */}
                            {!isEmptyObj(selectedOrder) ?
                                <Item.Group divided>
                                    {selectedOrder.items.map(menuItem => {
                                        return (
                                            <Item key={menuItem.name}>
                                                <Item.Image size='tiny' src={menuItem.image} />
                                                <Item.Content>
                                                    <Item.Header verticalAlign='middle'>{menuItem.name}</Item.Header>
                                                    <Item.Meta>R{menuItem.price}</Item.Meta>
                                                </Item.Content>
                                            </Item>
                                        )
                                    })}
                                </Item.Group> :
                                "load"
                            }
                        </Container>
                        {/* <Order router={state.router} /> */}
                        <pre>{JSON.stringify(this.state.selectedOrder, " ", 2)}</pre>

                    </>
                )}
            </ContextAPI.Consumer>
        )
    }
}
export default DashboardOrdersPage
