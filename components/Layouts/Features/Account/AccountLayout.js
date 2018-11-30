import React from 'react'
import AccountHeader from './AccoutHeader';
import AccountTabs from './AccountTabs';
import { Container, PlaceholderImage, Placeholder, PlaceholderParagraph } from 'semantic-ui-react'
import API from '../../../../src/providers/APIRequest';

import {AccountHeaderPlaceholder, AccountTabsPlaceholder} from "../../../utils/Placeholders"

class AccountLayout extends React.Component {

    constructor(props)
    {
        super()
        this.state = {
            loading: true,
            data: {}
        }
    }

    processData = async () => {
        const data = await API.profile.account()
        console.log(data);

        if (data.status == 200)
        {
            this.setState({loading: false})
        }
    }

    componentDidMount()
    {
        this.processData()
    }

    render() {
        const {loading} = this.state

        return (
            <React.Fragment>
                {/* <pre>{JSON.stringify(loading, "", 1)}</pre> */}
                {loading ? <React.Fragment> <AccountTabsPlaceholder /> </React.Fragment> : <React.Fragment><AccountHeader /> <AccountTabs /> </React.Fragment>}
            </React.Fragment>
        )
    }
}

export default AccountLayout