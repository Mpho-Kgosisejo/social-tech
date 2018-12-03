import React from 'react'

import { Tab } from 'semantic-ui-react'

class ProfileTabs extends React.Component
{
    panes = [
        { menuItem: 'Profile', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
        { menuItem: 'Account details', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
        { menuItem: 'Order history', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
      ]

    render()
    {
        return(
            <React.Fragment>
                <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={this.panes} />
            </React.Fragment>
        )
    }
}

export default ProfileTabs