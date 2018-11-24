import React from 'react'
import AccountHeader from './AccoutHeader';
import AccountTabs from './AccountTabs';

class AccountLayout extends React.Component
{
    render()
    {
        return(
            <React.Fragment>
                <AccountHeader />
                <AccountTabs />
            </React.Fragment>
        )
    }
}

export default AccountLayout