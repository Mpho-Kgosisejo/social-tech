import React from 'react'
import { Container, Table, Item } from 'semantic-ui-react'
import api from '../../../../../src/providers/APIRequest';
import Router from 'next/router';
import ContextAPI from '../../../../../src/config/ContextAPI';
// import DashboardOrderIDPage from './DashboardOrderIDPage';

class Order extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            error: false,
            orders: []
        }
        console.log(">>>", this.props)

    }
    init = async () => {
        const { orderid } = this.props.router.query

        if (orderid) {
            const res = await api.dashboard_orders.get_orders(); // api.order({id: orderid})

            if (res.status === 200) {
                const { orders } = res.data
                this.setState({ orders: orders, loading: false });
                console.log("this is the order data", res.data)
            } else {
                this.setState({ error: "404", loading: false })
            }
        } else {
            this.setState({ error: "need id", loading: false })
        }

    }

    componentDidMount() {
        this.init()
    }

    render() {
        const { loading, error, orders } = this.state
        // console.log("render order", orders)

        return (
            <>
                {loading ?
                    "laoding..." :
                    error ? error :
                        <Item.Group divided>
                            {orders.map(el => {
                                return (
                                    <Item >
                                        <Item.Image size='tiny' src={el.order.menuItems.image} />
                                        <Item.Content verticalAlign='middle'>{el.order.menuItems.name}</Item.Content>
                                    </Item>
                                )
                            })}

                        </Item.Group>
                }
            </>
        )
    }
}

class DashboardOrdersPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            orders: []
        }
    }
    getData = async () => {
        const res = await api.dashboard_orders.get_orders();

        if (res.status === 200) {
            const { orders } = res.data
            this.setState({ orders: orders });
        } else {
            res.status(404).send('Bad Request')
        }
    }

    onClickLink = ({ id, state }) => {
        const { dispatch, router } = state
        const query = { page: "orders", orderid: id }

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

        const { orders } = this.state

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
                                            <Table.Row key={el.id}>
                                                <Table.Cell>{el.customer}</Table.Cell>
                                                <Table.Cell><a onClick={() => this.onClickLink({ id: el.order.orderID, state })}>{el.order.orderID}</a></Table.Cell>
                                                <Table.Cell>{el.price}</Table.Cell>
                                                <Table.Cell>{el.quantity}</Table.Cell>
                                                <Table.Cell>{(el.status) == "approved" ? <p style={{ color: "#3CB371" }}>{el.status}</p> : (el.status) == "pending" ? <p style={{ color: "#ffa900" }}>{el.status}</p> : <p style={{ color: "#FF0000" }}>{el.status}</p>}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </div>
                        <Order router={state.router} />
                    </>
                )}
            </ContextAPI.Consumer>
        )
    }
}
export default DashboardOrdersPage