import React from 'react'
import { Container, Table } from 'semantic-ui-react'
import api from '../../../../../src/providers/APIRequest';

class DashboardOrdersPage extends React.Component {

    constructor() {
        super()

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

    componentDidMount() {
        this.getData()
    }

    render() {

        const { orders } = this.state

        return (
            <div>
                <div className="dashboard-orders-table">
                    <Table basic verticalAlign="middle" columns="6" celled striped>
                        <Table.Header className="table-header">
                            <Table.Row>
                                <Table.HeaderCell>Customer</Table.HeaderCell>
                                <Table.HeaderCell>Order ID</Table.HeaderCell>
                                <Table.HeaderCell>Menu Name</Table.HeaderCell>
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
                                        <Table.Cell>{el.orderID}</Table.Cell>
                                        <Table.Cell>{el.menu_name}</Table.Cell>
                                        <Table.Cell>{el.price}</Table.Cell>
                                        <Table.Cell>{el.quantity}</Table.Cell>
                                        <Table.Cell>{(el.status) == "approved" ? <p style={{color: "#3CB371"}}>{el.status}</p> : (el.status) == "pending" ? <p style={{color: "#ffa900"}}>{el.status}</p> : <p style={{color: "#FF0000"}}>{el.status}</p> }</Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        )
    }
}
export default DashboardOrdersPage