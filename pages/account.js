import React from 'react';
import { Dropdown, Tab } from 'semantic-ui-react'

import Layout from '../components/Layouts/Layout';
import AccountLayout from '../components/Layouts/Features/Account/AccountLayout';
import api from "../src/providers/APIRequest";
import ContextAPI from "../src/config/ContextAPI";

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
        return (
            <Layout title="Account">
                <ContextAPI.Consumer>
                    {({ state }) =>
                        <React.Fragment>
                            <AccountLayout />
                        </React.Fragment>
                    }
                </ContextAPI.Consumer>
            </Layout>

        )
    }
}
export default account