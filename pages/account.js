import React from 'react';
import { Dropdown, Tab } from 'semantic-ui-react'

import Layout from '../components/Layouts/Layout';
import api from "../src/providers/APIRequest";
import ContextAPI from "../src/config/ContextAPI";
import { AccountTabsPlaceholder } from '../components/utils/Placeholders'
import { RouterHandler } from "../components/Layouts/Features/About/Helper"
import AccountHeader from "../components/Layouts/Features/Account/AccoutHeader"
import AccountTabs from "../components/Layouts/Features/Account/AccountTabs"

class account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            index: 0
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

    changeTab = (index) =>{
        console.log("------", index)
        this.setState({ index })
        // this.props.dispatch({type: "ACCOUNT", payload: {...stateAccount, index}})
        // RouterHandler({index})
    }

    componentDidMount() {
        this.getData();
        this.props.dispatch({ type: "PAGE", payload: "account" })

    }
    render() {
        const { loading, index } = this.state

        return (
            <Layout title="Account">
                <ContextAPI.Consumer>
                    {({ state }) =>
                        <React.Fragment>
                            {loading ? <React.Fragment> <AccountTabsPlaceholder /> </React.Fragment> : 
                            <React.Fragment><AccountHeader /> 
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
                        <AccountTabs index={index} onTabChange={this.changeTab}/>
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