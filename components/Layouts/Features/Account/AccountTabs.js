import React from  'react'
import {Tab} from 'semantic-ui-react' 

import Layout from '../../Layout';
import AccountPersonalDetails from './AccountPersonalDetails';
import AccountPaymentDetails from './AccountPaymentDetails';

const panes = [
    { menuItem: 'Personal details', render: () => <Tab.Pane><AccountPersonalDetails /></Tab.Pane> },
    { menuItem: 'Payment details', render: () => <Tab.Pane><AccountPaymentDetails /></Tab.Pane> },
    { menuItem: 'Order history', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ]


const AccountTabs = () => 
(
       <div className="account-tabs">
            <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
        </div> 
)
  
export default AccountTabs