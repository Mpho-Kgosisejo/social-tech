import React from 'react'
import { Container, Grid, Segment, Loader, Dropdown, Icon } from 'semantic-ui-react'
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
            },
            netEarn : 0,
            deliveredToday : 0
        }
    }

    getNetEarning = async () => {
        const res = await api.dashboard_Index.get_net_earnings()
        if (res.status === 200)
            this.setState({ netEarn : res.data.netearnings.totalNet })
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
                const date = new Date()

                let todaysFullDate = `${date.getFullYear()}-${('0' + Number(date.getMonth()) + 1 ).slice(-2) }-${date.getDate()}`

                if (todaysFullDate === _order.createdAt.split('T')[0])
                {
                    this.setState({deliveredToday : this.state.deliveredToday + 1})
                }
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
        this.getNetEarning()
    }

    render()
    {
        const { userList, orderList, deliveredToday, chartData, isLoading, orderChartDropdownOptions, selectedYearData, netEarn } = this.state
        return(
            <div >
                <ContextAPI.Consumer>
                    {({ state }) => (
                        <Grid className="index-top-grid">
                            <Grid.Row stretched>
                                <Grid.Column computer={4} tablet={16} mobile={16}>
                                    <Segment className="index-top-grid-column dashboard-segment">
                                        { isLoading ? <Loader active/> : 
                                            <div className="dashboard-segment-icon-div">
                                                <div className="dashboard-segment-icon-div-child-one">
                                                    <div className="dashboard-segment-icon-div-child-center-content">
                                                        <Icon size='big' inverted name="user outline"/>
                                                    </div>
                                                </div>
                                                <div className="dashboard-segment-icon-div-child-two">
                                                    <div className="dashboard-segment-icon-div-child-center-content">
                                                        <h3>
                                                            <span>Total users</span> <br />
                                                            {userList.length}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </Segment>
                                </Grid.Column >
                                <Grid.Column  computer={4} tablet={16} mobile={16}>
                                    <Segment className="index-top-grid-column dashboard-segment">
                                        { isLoading ? <Loader active/> : 
                                            <div className="dashboard-segment-icon-div">
                                                <div className="dashboard-segment-icon-div-child-one">
                                                    <div className="dashboard-segment-icon-div-child-center-content">
                                                        <Icon size='big' inverted name="user outline"/>
                                                    </div>
                                                </div>
                                                <div className="dashboard-segment-icon-div-child-two">
                                                    <div className="dashboard-segment-icon-div-child-center-content">
                                                        <h3>
                                                            <span>Total orders</span> <br />
                                                            {orderList.length}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column computer={4} tablet={16} mobile={16}>
                                    <Segment className="index-top-grid-column dashboard-segment">
                                        { isLoading ? <Loader active/> : 
                                            <div className="dashboard-segment-icon-div">
                                                <div className="dashboard-segment-icon-div-child-one">
                                                    <div className="dashboard-segment-icon-div-child-center-content">
                                                        {/* <Icon size='big' inverted name="user outline"/> */}
                                                        <h1>R</h1>
                                                    </div>
                                                </div>
                                                <div className="dashboard-segment-icon-div-child-two">
                                                    <div className="dashboard-segment-icon-div-child-center-content">
                                                        <h3>
                                                            <span>Net earning</span> <br />
                                                            {parseFloat(Math.round(netEarn * 100) / 100).toFixed(2)}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </Segment>                        
                                </Grid.Column>
                                <Grid.Column  computer={4} tablet={16} mobile={16}>
                                    <Segment className="index-top-grid-column dashboard-segment">
                                        { isLoading ? <Loader active/> : 
                                            <div className="dashboard-segment-icon-div">
                                                <div className="dashboard-segment-icon-div-child-one">
                                                    <div className="dashboard-segment-icon-div-child-center-content">
                                                        {/* <Icon size='big' inverted name="currency"/> */}
                                                        <h1>R</h1>
                                                    </div>
                                                </div>
                                                <div className="dashboard-segment-icon-div-child-two">
                                                    <div className="dashboard-segment-icon-div-child-center-content">
                                                        <h3>
                                                            <span>Today's Deliveries</span> <br />
                                                            {deliveredToday}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row stretched>
                                <Grid.Column  computer={8} tablet={16} mobile={16}>
                                    <Segment className="index-2nd-grid-column dashboard-segment">
                                        { isLoading ? null : 
                                            <React.Fragment> 
                                                <div className = "product-list-header">
                                                    <div>
                                                        <h3>Orders Graph</h3> 
                                                    </div>
                                                    <div>                                                
                                                        <Dropdown 
                                                            search 
                                                            selection
                                                            placeholder={new Date().getFullYear().toString()}
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
                                    <Segment className="index-2nd-grid-column dashboard-segment">
                                        { isLoading ? null : <UserListSegment refreshState={this.refreshState} users={userList} /> }
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                            {/* <pre>{JSON.stringify(this.state.selectedYearData, " ", 2)}</pre> */}
                        </Grid>
                )}
            </ContextAPI.Consumer>
            </div>
        )
    }
}

export default DashboardMainPage;