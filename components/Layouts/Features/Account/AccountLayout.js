import React from 'react'
import AccountHeader from './AccoutHeader';
import AccountTabs from './AccountTabs';
import { Container } from 'semantic-ui-react'

class AccountLayout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <AccountHeader />
                <AccountTabs />
            </React.Fragment>
        )
    }
}

export default AccountLayout