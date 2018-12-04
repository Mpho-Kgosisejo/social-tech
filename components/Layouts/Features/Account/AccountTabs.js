import React from 'react'
import { Tab, Dropdown } from 'semantic-ui-react'

import Layout from '../../Layout';
import AccountPersonalDetails from './AccountPersonalDetails';
import AccountHistory from './AccountHistory';

const panes = [
  { menuItem: 'Personal details', render: () => <Tab.Pane><AccountPersonalDetails /></Tab.Pane> },
  { menuItem: 'Order history', render: () => <Tab.Pane><AccountHistory /></Tab.Pane> }
]


const AccountTabs = () =>
  (
    <div className="account-tabs">
      <Tab menu={{ fluid: true, vertical: true, tabular: true}} panes={panes} />
    </div>
  )

export default AccountTabs