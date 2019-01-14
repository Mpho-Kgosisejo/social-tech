import React from 'react';
import Router from "next/router"
import { Dropdown, Tab } from 'semantic-ui-react'

import Layout from '../components/Layouts/Layout';
import api from "../src/providers/APIRequest";
import ContextAPI from "../src/config/ContextAPI";
import { AccountTabsPlaceholder } from '../components/utils/Placeholders'
import { RouterHandler } from "../components/Layouts/Features/About/Helper"
import AccountHeader from "../components/Layouts/Features/Account/AccoutHeader"
import AccountTabs from "../components/Layouts/Features/Account/AccountTabs"
import {isEmptyObj} from "../src/utils/Objs"
import {getLogin, logout} from "../src/providers/LoginSession"
import { NOT_AUTHORIZED_PAGE_ACCESS } from "../src/Types/MessageTypes"


class account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            index: 0,
            edit: false
        }
    }

    toggleEdit = () => (this.state.edit) ? this.setState({edit: false}) : this.setState({edit: true})

    getData = async () => {
        const data = await api.profile.orders()

        if (data.status == 200) {
            this.props.dispatch({ type: "ACCOUNT_ORDER_HISTORY", payload: data.data.order_history })
            this.setState({ loading: false })
        }
        else {
            this.setState({ loading: false })
        }
    }

    changeTab = (index) =>{
        this.setState({ index })
        // this.props.dispatch({type: "ACCOUNT", payload: {...stateAccount, index}})
        // RouterHandler({index})
    }

    showAlertPortal = ({type, header, message}) => {
        setTimeout(() => {
            this.props.dispatch({type: "ALERT_PORTAL", payload: {open: true, type, header, message}})
        }, 50)
    }

    componentDidMount() {
        const login = getLogin()
        
        if (isEmptyObj(login)){
            this.showAlertPortal({type: "error", header: "", message: `${NOT_AUTHORIZED_PAGE_ACCESS}: dashboard`})
            logout()
            Router.replace({pathname: "/"})
            return 
        }
        // await() for call if ever done...
        // setTimeout(() => {
            this.getData();
        // }, 50)
        this.props.dispatch({ type: "PAGE", payload: "account" })

    }
    render() {
        const { loading, index, edit } = this.state

        return (
            <Layout title="Account">
                <ContextAPI.Consumer>
                    {({ state }) =>
                        <React.Fragment>
                            <pre>{JSON.stringify(state.account, "", 2)}</pre>
                            {state.root_loading ? <React.Fragment> <AccountTabsPlaceholder /> </React.Fragment> : 
                            <React.Fragment><AccountHeader edit={edit} toggleEdit={this.toggleEdit} /> 
                            <div className="about-content padding-account-dropdown">
                            <Dropdown
                                fluid
                                selection
                                defaultValue={index}
                                onChange={(e, {value}) => this.changeTab(value)}
                                options={[
                                    {
                                        text: "Personal information",
                                        value: 0
                                    },
                                    {
                                        text: "Order history",
                                        value: 1
                                    },
                                ]}
                            />
                            {/* <Tab className="about-tab" menu={{ secondary: true, pointing: true }} activeIndex={state.about.index} onTabChange={(e, d) => this.changeTab(state.about, d.activeIndex)} panes={panes} /> */}
                        </div>
                        <AccountTabs toggleEdit={this.toggleEdit} edit={edit} index={index} onTabChange={this.changeTab}/>
                        </React.Fragment>
                        }
                        </React.Fragment>
                    }
                </ContextAPI.Consumer>
                <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${"AIzaSyCrU9Rw7a253dKb-SMfEeCsGYgFVw9GehQ"}&libraries=places`}></script> 
            </Layout>

        )
    }
}
export default account