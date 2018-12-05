import React from 'react'
import { Icon, Menu, Sidebar, Dropdown, Divider, Container } from 'semantic-ui-react'
import "../../../../static/css/dashboard.css"
import DashboardMainPage from './DashboardPages/DashboardMainPage';
import DashboardMenuPage from './DashboardPages/DashboardMenuPage';
import DashboardAboutsPage from './DashboardPages/DashboardAboutsPage'
import DashboardOrdersPage from './DashboardPages/DashboardOrdersPage'
import DashboardOrderIDPage from './DashboardPages/DashboardOrderIDPage';
import { RightNav } from '../../Nav';
import ContextAPI from '../../../../src/config/ContextAPI';


class DashboardSidebar extends React.Component {

    constructor() {
        super()
        this.state = {
            activePage: 'home',
            openSidebar: false
        }
    }

    changeActivePage = (name) => {
        this.setState({ activePage: name, openSidebar: false })
    }

    showSideBars = () => {
        if (this.state.openSidebar === true)
            this.setState({ openSidebar: false })
        else
            this.setState({ openSidebar: true })
    }

    renderPage = (pageName) => {
        switch (pageName) {
            case "home":
                return (
                    <DashboardMainPage />
                )
            case "menu":
                return (
                    <DashboardMenuPage />
                )
            case "order":
                return (
                    <DashboardOrdersPage />
                )
            case "order-menu":
                return (
                    <DashboardOrderIDPage />
                )

            case "about":
                return (
                    <DashboardAboutsPage />
                )
            default:
                return (
                    <DashboardMainPage />
                )
        }
    }

    render() {
        const { activePage, openSidebar } = this.state
        return (
            <div>
                <div className="dashboard-page-header fresheats-light-green-bg">
                    <Menu secondary>
                        <Menu.Item onClick={this.showSideBars}>
                            <Icon className="header-content" name={openSidebar ? 'close' : 'bars'} />
                        </Menu.Item>
                        <Menu.Item>
                            <h1 className="header-content">DASHBOARD</h1>
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <RightNav />
                        </Menu.Menu>
                    </Menu>
                </div>
                <Sidebar.Pushable className="dashboard-sidebar-pushable">
                    <Sidebar
                        as={Menu}
                        animation='push'
                        direction='left'
                        vertical
                        visible={openSidebar}
                        //width='thin'
                        className="dashboard-sidebar fresheats-light-green-bg"
                    >

                        <Menu.Item className="fresheats-brown-color" as='a' onClick={() => { this.changeActivePage("home") }}>
                            <Icon name='home' />
                            Home
                    </Menu.Item>
                        {/* <Menu.Item> */}
                        <Dropdown text="orders" className="link item fresheats-brown-color">
                            {/* <Icon name='food' /> */}
                            {/* <Menu.Item> */}
                            <Dropdown.Menu className="fresheats-green-bg">
                                <Dropdown.Item onClick={() => { this.changeActivePage("order") }} className="fresheats-brown-color">Customers orders</Dropdown.Item>
                                <Dropdown.Item onClick={() => { this.changeActivePage("order-menu") }} className="fresheats-brown-color">Customers menu items</Dropdown.Item>
                            </Dropdown.Menu>
                            {/* </Menu.Item> */}
                        </Dropdown>
                        {/* </Menu.Item> */}
                        <Divider />
                        <Menu.Item className="fresheats-brown-color" as='a' onClick={() => { this.changeActivePage("menu") }}>
                            <Icon name='clipboard' />
                            Menu
                    </Menu.Item>
                        <Menu.Item className="fresheats-brown-color" as='a' onClick={() => { this.changeActivePage("about") }}>
                            <Icon name='clipboard' />
                            About
                    </Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher className="dashboard-sidebar-pushable">
                        <div className="mainLayout">
                            {this.renderPage(activePage)}

                            <ContextAPI.Consumer>
                                {({state}) => (
                                    <pre>{JSON.stringify(state.router, "", 1)}</pre>
                                )}
                            </ContextAPI.Consumer>
                        </div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default DashboardSidebar