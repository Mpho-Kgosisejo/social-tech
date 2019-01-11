import React from 'react'
import { Table, Button } from 'semantic-ui-react';
import api from '../../../../../src/providers/APIRequest'


class DashboardCateringPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            cater_fields: []
        }
    }

    getData = async () => {
        const res = await api.web.catering();

        if (res.status === 200) {
            const { cater_fields } = res.data
            this.setState({ cater_fields });
        } else {
            res.status(404).send('Bad Request')
        }
    }

    componentDidMount() {
        this.getData()
    }


    render() {
        const { cater_fields } = this.state

        return (
            <div className="dashboard-orders-table">
                <Table basic verticalAlign="middle" columns="8" celled striped style={{ cursor: "pointer" }}>
                    <Table.Header className="table-header">
                        <Table.Row>
                            <Table.HeaderCell className="table-header">Name</Table.HeaderCell>
                            <Table.HeaderCell className="table-header">Contact Number</Table.HeaderCell>
                            <Table.HeaderCell className="table-header">Email</Table.HeaderCell>
                            <Table.HeaderCell className="table-header">Type of event</Table.HeaderCell>
                            <Table.HeaderCell className="table-header">Date of event</Table.HeaderCell>
                            <Table.HeaderCell className="table-header">Time of event</Table.HeaderCell>
                            <Table.HeaderCell className="table-header">Location of event</Table.HeaderCell>
                            <Table.HeaderCell className="table-header">Number of people</Table.HeaderCell>
                            {/* <Table.HeaderCell className="table-header">Accept Or Decline</Table.HeaderCell> */}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {cater_fields.map(el => {
                            return (
                                <Table.Row key={el._id}>
                                    <Table.Cell>{el.customer_name}</Table.Cell>
                                    <Table.Cell>{el.customer_num}</Table.Cell>
                                    <Table.Cell>{el.customer_email}</Table.Cell>
                                    <Table.Cell>{el.type_event}</Table.Cell>
                                    <Table.Cell>{el.date_event}</Table.Cell>
                                    <Table.Cell>{el.time_event}</Table.Cell>
                                    <Table.Cell>{el.location_event}</Table.Cell>
                                    <Table.Cell>{el.number_people}</Table.Cell>
                                    {/* <Table.Cell><Button>Accept</Button><Button>Decline</Button></Table.Cell> */}
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
        )
    }


}
export default DashboardCateringPage