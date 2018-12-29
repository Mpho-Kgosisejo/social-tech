import React from 'react'
import { Container, Grid, Segment, Loader } from 'semantic-ui-react'
import OrderHistoryChart from './Components/OrderHistoryChart'
import UserListSegment from './Components/UserListSegment'
import ContextAPI from "../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../src/utils/Objs"

import api from "../../../../../../src/providers/APIRequest"

class DashboardMainPage extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            userList : {},
            orderList : {},
            chartData : [],
            currentYear : ""
        }
    }

    getUsers = async () => {
        const res = await api.dashboard_Index.get_users()
        if (res.status === 200) 
        {
            this.setState({ userList : res.data.users })
        }
    } 
//           "createdAt": "2018-12-24T14:46:11.028Z",
    getOrders = async () => {
        const res = await api.orders.get_orders()
        if (res.status === 200) 
        {
            const orders = res.data.orders
            const _orders = {
                numOrders : orders.length,
                data: orders
            }

            let _currentYear = new Date().getFullYear()                     
            const data = [0,0,0,0,0,0,0,0,0,0,0,0]

            orders.forEach(_order => {
                let _orderYear = _order.createdAt.split('-')[0]
                let _orderMonth = _order.createdAt.split('-')[1]
                if (_currentYear.toString() === _orderYear)
                {
                    switch(_orderMonth)
                    {
                        case '01' :
                            data[0] += 1
                        case '02' : 
                            data[1] += 1
                        case '03' : 
                            data[2] += 1
                        case '04' : 
                            data[3] += 1
                        case '05' : 
                            data[4] += 1
                        case '06' : 
                            data[5] += 1
                        case '07' :
                            data[6] += 1 
                        case '08' : 
                            data[7] += 1
                        case '09' : 
                            data[8] += 1
                        case '10' : 
                            data[9] += 1
                        case '11' : 
                            data[10] += 1
                        case '12' : 
                            data[11] += 1
                        default : 
                            break
                    }
                }
            })
            // console.log( "==========>>>>>>>>>", data)

            this.setState({ orderList : orders, currentYear : _currentYear, chartData : data })
            
            this.props.dispatch({ type: "ORDERS", payload: _orders })
        }
    } 

    refreshState = (newObject) => {
        // console.log("okay cool cool cool save it", newObject)
        this.setState({
            ...this.state,
            ...newObject
        })
    }

    componentDidMount(){
        this.getUsers()
        this.getOrders()
    }

    render()
    {
        const { userList, orderList, currentYear, chartData } = this.state
        return(
            <div >
                <ContextAPI.Consumer>
                    {({ state }) => (
                        <Grid className="index-top-grid">
                            <Grid.Row stretched>
                                <Grid.Column computer={4} tablet={16} mobile={16}>
                                    <Segment className="index-top-grid-column">
                                            <h1 >{userList.length} </h1>
                                    </Segment>
                                </Grid.Column >
                                <Grid.Column  computer={4} tablet={16} mobile={16}>
                                    <Segment className="index-top-grid-column">
                                        {/* {isEmptyObj(state.orders) ? } */}
                                        {/* <h1 > {state.orders.numOrders} </h1> */}
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column computer={4} tablet={16} mobile={16}>
                                    <Segment className="index-top-grid-column">
                                            <h1 > Earningz? </h1>
                                    </Segment>                        
                                </Grid.Column>
                                <Grid.Column  computer={4} tablet={16} mobile={16}>
                                    <Segment className="index-top-grid-column">
                                        <h1 > VIZITORS? </h1>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row stretched>
                                <Grid.Column  computer={8} tablet={16} mobile={16}>
                                    <Segment className="index-2nd-grid-column">
                                        {/* <pre>{JSON.stringify(state.orders, " ", 2)}</pre> */}
                                            <OrderHistoryChart chartData={chartData} currentYear={currentYear}/>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column  computer={8} tablet={16} mobile={16}>
                                    <Segment className="index-2nd-grid-column">
                                        <UserListSegment refreshState={this.refreshState} users={userList} />
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                            <pre>{JSON.stringify(this.state, " ", 2)}</pre>
                        </Grid>
                )}
            </ContextAPI.Consumer>
            </div>
        )
    }
}    
// const DashboardMainPage = () => (
//     <h1>I AM THE LANDING PAGE</h1>
// )

export default DashboardMainPage;