import React from "react"
import Router from "next/router"

import Layout from "../components/Layouts/Layout"
import {getLogin, logout} from "../src/providers/LoginSession"
import {isEmptyObj} from "../src/utils/Objs"
import { Header, Divider } from "semantic-ui-react";
import ContextAPI from "../src/config/ContextAPI";
import AdminDashboard from "../components/Layouts/Admin";
import UserDashboard from "../components/Layouts/User";
import { NOT_AUTHORIZED_PAGE_ACCESS } from "../src/Types/MessageTypes";

class Dashoard extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            loading: true
        }
    }

    componentDidMount(){
        const login = getLogin()

        if (isEmptyObj(login)){
            setTimeout(() => {
                this.props.dispatch({type: "ALERT_PORTAL", payload: {open: true, type: "error", header: "", message: `${NOT_AUTHORIZED_PAGE_ACCESS}: dashboard`}})
            }, 50)
            logout()
            Router.replace({pathname: "/"})
            return 
        }

        // await() for call if ever done...
        if (login.isAdmin){
            console.log("Load Admin Data")
        }else{
            console.log("Load User Data")
        }

        this.setState({
            loading: false
        })
    }

    static async getInitialProps(){
        return ({})
    }

    render(){
        const {loading} = this.state

        return(
            <ContextAPI.Consumer>
                {({state}) => (
                    <Layout title="Dashboard">
                        {(!state.root_loading && !loading) && (
                            <React.Fragment>
                                <Header as="h2">Dashboard</Header>
                                <Divider />
                                
                                {(state.login && state.login.isAdmin) ?
                                    <AdminDashboard /> : <UserDashboard />
                                }
                            </React.Fragment>
                        )}
                    </Layout>
                )}
            </ContextAPI.Consumer>
        )
    }
}

export default Dashoard