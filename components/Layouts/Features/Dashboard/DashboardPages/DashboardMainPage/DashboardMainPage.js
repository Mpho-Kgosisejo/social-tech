import React from 'react'
import { Container, Grid, Segment, Loader, Dropdown } from 'semantic-ui-react'
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
            isLoading : true,
            userList : {},
            orderList : {},
            chartData : [],
            currentYear : "",
            orderChartDropdownOptions : [],
            selectedYearData : {
                year : "",
                data : []
            }
        }
    }

    getUsers = async () => {
        const res = await api.dashboard_Index.get_users()
        if (res.status === 200) 
        {
            this.setState({ userList : res.data.users })
        }
    } 

    sortYearlyDataByMonth = (yearArray, _orderMonth) => {
        let month = yearArray
        
        switch(_orderMonth)
        {
            case '01' :
                month[0] += 1
                break 
            case '02' : 
            month[1] += 1
                break 
            case '03' : 
            month[2] += 1
                break
            case '04' : 
            month[3] += 1
                break
            case '05' : 
            month[4] += 1
                break
            case '06' : 
            month[5] += 1
                break
            case '07' :
            month[6] += 1
                break
            case '08' : 
            month[7] += 1
                break
            case '09' : 
            month[8] += 1
                break
            case '10' : 
            month[9] += 1
                break
            case '11' : 
            month[10] += 1
                break
            case '12' : 
            month[11] += 1
                break
            default : 
                break
        }
        return month
    }

    handleGraphYearChange = (value) => {
        this.setState({
            selectedYearData : {
                year : value,
                data : this.state.chartData[value]
            }
        })
    }

//           "createdAt": "2018-12-24T14:46:11.028Z",
    getOrders = async () => {
        const res = await api.orders.get_orders()
        if (res.status === 200) 
        {
            const orders = res.data.orders
            // const _orders = {
            //     numOrders : orders.length,
            //     data: orders
            // }

            let years = []

            orders.forEach(_order => {
                let _orderYear = _order.createdAt.split('-')[0]
                let yearExists = false 
                
                years.forEach(year => {
                    if (year == _orderYear)
                        yearExists = true
                    if (year > new Date().getFullYear())
                        years.pop(year)
                })

                if (yearExists === false)
                    years.push(_orderYear)
                years = years.sort()
            });

            const _data = new Object()
            if(years.length > 0)
            {
                years.forEach(year => {
                    orders.forEach(_order => {
                        let _orderYear = _order.createdAt.split('-')[0]
                        let _orderMonth = _order.createdAt.split('-')[1]
                        
                        if (year == _orderYear)
                        {
                            if (_data.hasOwnProperty(year))
                            {
                                const newArr = _data[year]
                                _data[year] = this.sortYearlyDataByMonth(_data[year], _orderMonth)
                            }
                            else 
                            {
                                _data[year] = [0,0,0,0,0,0,0,0,0,0,0,0]
                                _data[year] = this.sortYearlyDataByMonth(_data[year], _orderMonth) 
                            }
                        }
                    })
                })
            }
            
            this.setState({ 
                orderList : orders, 
                isLoading : false, 
                selectedYearData : {
                    year : new Date().getFullYear(),
                    data : _data[new Date().getFullYear()] 
                },
                chartData : _data,
                orderChartDropdownOptions : years 
            })
            // this.props.dispatch({ type: "ORDERS", payload: _orders })
        }
    } 

    refreshState = (newObject) => {
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
        const { userList, orderList, currentYear, chartData, isLoading, orderChartDropdownOptions, selectedYearData } = this.state
        return(
            <div >
                <ContextAPI.Consumer>
                    {({ state }) => (
                        <Grid className="index-top-grid">
                            <Grid.Row stretched>
                                <Grid.Column computer={4} tablet={16} mobile={16}>
                                    <Segment className="index-top-grid-column">
                                        { isLoading ? <Loader active/> : <h1> {userList.length} </h1> }
                                    </Segment>
                                </Grid.Column >
                                <Grid.Column  computer={4} tablet={16} mobile={16}>
                                    <Segment className="index-top-grid-column">
                                        { isLoading ? <Loader active/> : <h1 > {orderList.length} </h1> }
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column computer={4} tablet={16} mobile={16}>
                                    <Segment className="index-top-grid-column">
                                        { isLoading ? <Loader active/> : <h1> Earningz? </h1> }
                                    </Segment>                        
                                </Grid.Column>
                                <Grid.Column  computer={4} tablet={16} mobile={16}>
                                    <Segment className="index-top-grid-column">
                                        { isLoading ? <Loader active/> : <h1> VIZITORS? </h1> }
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row stretched>
                                <Grid.Column  computer={8} tablet={16} mobile={16}>
                                    <Segment className="index-2nd-grid-column">
                                        { isLoading ? <Loader active/> : 
                                            <React.Fragment> 
                                                <div className = "product-list-header">
                                                    <div>
                                                        <h3>Order History Graph</h3> 
                                                    </div>
                                                    <div>                                                
                                                        <Dropdown 
                                                            search 
                                                            selection
                                                            placeholder={new Date().getFullYear()}
                                                            onChange={(e, { value }) => this.handleGraphYearChange(value)}
                                                            options={
                                                                orderChartDropdownOptions.map(item => (
                                                                    { key: item, text: item, value: item}
                                                                    ))}
                                                                    />
                                                    </div>
                                                </div>
                                                <OrderHistoryChart chartData={selectedYearData.data} currentYear={selectedYearData.year}/> 
                                            </React.Fragment>}
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column  computer={8} tablet={16} mobile={16}>
                                    <Segment className="index-2nd-grid-column">
                                        { isLoading ? <Loader active/> : <UserListSegment refreshState={this.refreshState} users={userList} /> }
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