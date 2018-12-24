import React from 'react'
import { Container, Grid } from 'semantic-ui-react'
import OrderHistoryChart from './Components/OrderHistoryChart'
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

    componentDidMount(){
        this.getUsers()
    }

    render()
    {
        const { userList } = this.state
        return(
            <div >
                <Grid className="index-top-grid" >
                    <Grid.Row columns={4}>
                        <Grid.Column computer={4} tablet={16} mobile={16}>
                            <div>
                                <div>
                                    <h1 className="index-top-grid-column">{userList.length} </h1>
                                </div>
                            </div>
                        </Grid.Column >
                        <Grid.Column  computer={4} tablet={16} mobile={16}>
                            <h1 className="index-top-grid-column">HELLO</h1>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={16} mobile={16}>
                            <h1 className="index-top-grid-column">HELLO</h1>
                        </Grid.Column>
                        <Grid.Column  computer={4} tablet={16} mobile={16}>
                            <h1 className="index-top-grid-column">HELLO</h1>
                        </Grid.Column>
                        <Grid.Column  computer={16} tablet={16} mobile={16}>
                            <OrderHistoryChart />
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