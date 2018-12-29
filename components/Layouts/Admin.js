import React from "react"
import DashboardSidebar from "./Features/Dashboard/DashboardSidebar";

class AdminDashboard extends React.Component {
    constructor(props)
    {
        super(props)
    }

    render(){
        return (
            <React.Fragment>
                <DashboardSidebar dispatch={this.props.dispatch}/>
            </React.Fragment>
        )
    }
}

export default AdminDashboard