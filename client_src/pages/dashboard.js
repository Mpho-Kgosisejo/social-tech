import React from "react"
import Router from "next/router"

import Layout from "../components/Layouts/Layout"
import {getLogin, logout} from "../src/providers/LoginSession"
import {isEmptyObj} from "../src/utils/Objs"
import { Header, Divider } from "semantic-ui-react";
import ContextAPI from "../src/config/ContextAPI";
import AdminDashboard from "../components/Layouts/Admin";
import UserDashboard from "../components/Layouts/User";

class Dashoard extends React.Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    componentDidMount(){
        const login = getLogin()

        if (isEmptyObj(login)){
            logout()
            Router.replace({pathname: "/"})
            return 
        }
        if (login.isAdmin){
            console.log("Load Admin Data")
        }else{
            console.log("Load User Data")
        }
    }

    static async getInitialProps(){

        return ({})
    }

    render(){
        return(
            <ContextAPI.Consumer>
                {({state}) => (
                    <Layout title="dashboard">
                        <Header as="h2">Dashboard</Header>
                        <Divider/>
                        
                        {(state.login && state.login.isAdmin) ? <AdminDashboard /> : <UserDashboard />}
                    </Layout>
                )}
            </ContextAPI.Consumer>
        )
    }
}

export default Dashoard