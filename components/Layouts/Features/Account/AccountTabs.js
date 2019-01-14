import React from 'react'
import { Tab, Dropdown } from 'semantic-ui-react'

import ContextAPI from "../../../../src/config/ContextAPI"
import AccountPersonalDetails from './AccountPersonalDetails';
import AccountHistory from './AccountHistory';

const AccountTabs = ({index, onTabChange, edit, toggleEdit}) =>
  (
    <div className="account-tabs">
      <Tab
        onTabChange={(e, d) => onTabChange(d.activeIndex)}
        menu={{ fluid: true, vertical: true, tabular: true}}
        activeIndex={index}
        panes={[
          { menuItem: 'Personal details', render: () =>
            <Tab.Pane>
              <ContextAPI.Consumer>
                {({state}) => <AccountPersonalDetails toggleEdit={toggleEdit} edit={edit} account={state.account} />}
              </ContextAPI.Consumer>
            </Tab.Pane> },
          { menuItem: 'Order history', render: () => <Tab.Pane><AccountHistory /></Tab.Pane> }
        ]}
        />
    </div>
  )

export default AccountTabs