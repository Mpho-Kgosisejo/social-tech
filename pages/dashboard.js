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

    showAlertPortal = ({type, header, message}) => {
        setTimeout(() => {
            this.props.dispatch({type: "ALERT_PORTAL", payload: {open: true, type, header, message}})
        }, 50)
    }

    componentDidMount(){
        this.props.dispatch({type: "SIDEBAR", payload: false})
        const login = getLogin()

        if (isEmptyObj(login)){
            this.showAlertPortal({type: "error", header: "", message: `${NOT_AUTHORIZED_PAGE_ACCESS}: dashboard`})
            logout()
            Router.replace({pathname: "/"})
            return 
        }

        // await() for call if ever done...
        if (!login.isAdmin){
            this.showAlertPortal({type: "error", header: "", message: `${NOT_AUTHORIZED_PAGE_ACCESS}: dashboard`})
            Router.replace({pathname: "/"})
            return
        }

        console.log("Load Admin Data")
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
                    <Layout title="Dashboard" includeContainer={false} includeFooter={false} includeNav={false}>
                        {(!state.root_loading && !loading) && (
                            <React.Fragment>
                                
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