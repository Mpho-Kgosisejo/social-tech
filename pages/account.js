import React from 'react';
import { Dropdown, Tab } from 'semantic-ui-react'

import Layout from '../components/Layouts/Layout';
import api from "../src/providers/APIRequest";
import ContextAPI from "../src/config/ContextAPI";
import { AccountTabsPlaceholder } from '../components/utils/Placeholders'

import AccountHeader from "../components/Layouts/Features/Account/AccoutHeader"
import AccountTabs from "../components/Layouts/Features/Account/AccountTabs"

class account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    getData = async () => {
        const data = await api.profile.account()

        if (data.status == 200) {
            this.props.dispatch({ type: "ACCOUNT", payload: { ...data.data } })
            this.setState({ loading: false })
        }
        else {
            this.setState({ loading: false })
        }
    }

    componentDidMount() {
        this.getData();
        this.props.dispatch({ type: "PAGE", payload: "account" })

    }
    render() {
        const { loading } = this.state

        return (
            <Layout title="Account">
                <ContextAPI.Consumer>
                    {({ state }) =>
                        <React.Fragment>
                            {loading ? <React.Fragment> <AccountTabsPlaceholder /> </React.Fragment> : <React.Fragment><AccountHeader /> <AccountTabs /> </React.Fragment>}
                        </React.Fragment>
                    }
                </ContextAPI.Consumer>
            </Layout>

        )
    }
}
export default account