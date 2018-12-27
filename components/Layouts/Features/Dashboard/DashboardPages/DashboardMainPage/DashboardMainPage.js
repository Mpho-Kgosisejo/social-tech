import React from 'react'
import { Container, Grid, Segment } from 'semantic-ui-react'
import OrderHistoryChart from './Components/OrderHistoryChart'
import UserListSegment from './Components/UserListSegment'

import api from "../../../../../../src/providers/APIRequest"

class DashboardMainPage extends React.Component {
    constructor()
    {
        super()
        this.state = {
            userList : {}
        }
    }

    getUsers = async () => {
        const res = await api.dashboard_Index.get_users()
        console.log(res)
        if (res.status === 200) 
        {
            this.setState({ userList : res.data.users })
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
    }

    render()
    {
        const { userList } = this.state
        return(
            <div >
                <Grid className="index-top-grid">
                    <Grid.Row stretched>
                        <Grid.Column computer={4} tablet={16} mobile={16}>
                            <Segment className="index-top-grid-column">
                                    <h1 >{userList.length} </h1>
                            </Segment>
                        </Grid.Column >
                        <Grid.Column  computer={4} tablet={16} mobile={16}>
                            <Segment className="index-top-grid-column">
                                <h1 >Order Numberz </h1>
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
                                <OrderHistoryChart/>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column  computer={8} tablet={16} mobile={16}>
                            <Segment className="index-2nd-grid-column">
                                <UserListSegment refreshState={this.refreshState} users={userList} />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}    
// const DashboardMainPage = () => (
//     <h1>I AM THE LANDING PAGE</h1>
// )

export default DashboardMainPage;