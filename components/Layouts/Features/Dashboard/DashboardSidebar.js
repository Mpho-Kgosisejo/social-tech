import React from 'react'
import { Icon, Menu, Sidebar, Dropdown } from 'semantic-ui-react'
import "../../../../static/css/dashboard.css"
import DashboardMenuPage from './DashboardPages/DashboardMenuPage';



const DashboardSidebar = () => (
    <div>  
        <Sidebar.Pushable className="dashboard-sidebar show-below-nav">
            <Sidebar 
                as={Menu}
                animation='push'
                direction='left'
                icon='labeled'
                vertical
                visible={true}
                width='thin'
            >
            <Menu.Item as='a'>
                <Icon name='home' />
                Home
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='clipboard' />
                <Dropdown text='Pages' pointing='left' className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Abouts</Dropdown.Item>
                        <Dropdown.Item>Menu</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
            <Menu.Item as='a'>
                <Icon name='camera' />
                Orders
            </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
                <div className="mainLayout show-below-nav">
                    <DashboardMenuPage/>
                </div>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    </div>
)

export default DashboardSidebar