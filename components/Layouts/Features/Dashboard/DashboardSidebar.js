import React from 'react'
import { Icon, Menu, Sidebar, Breadcrumb, Divider, Container } from 'semantic-ui-react'
import "../../../../static/css/dashboard.css"
import DashboardMainPage from './DashboardPages/DashboardMainPage/DashboardMainPage';
import DashboardMenuPage from './DashboardPages/DashBoardMenuPage/DashboardMenuPage';
import DashboardAboutsPage from './DashboardPages/DashboardAbouts/DashboardAboutsPage'
import DashboardOrdersPage from './DashboardPages/DashboardOrdersPage'
import DashboardOrderIDPage from './DashboardPages/DashboardOrderIDPage';
import { RightNav } from '../../Nav';
import Router from "next/router"
import ContextAPI from '../../../../src/config/ContextAPI';


class DashboardSidebar extends React.Component {

    constructor(props) {
        super(props)
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
            case "Home":
                return (
                    <DashboardMainPage dispatch={this.props.dispatch}/>
                )
            case "Menu":
                return (
                    <DashboardMenuPage />
                )
            case "Orders":
                return (
                    <DashboardOrdersPage />
                )
            case "order-menu":
                return (
                    <DashboardOrderIDPage />
                )

            case "About":
                return (
                    <DashboardAboutsPage />
                )
            default:
                return (
                    <DashboardMainPage dispatch={this.props.dispatch}/>
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
                            <h1 className="header-content">
                                <Breadcrumb size='large' >
                                    <Breadcrumb.Section>Dashboard</Breadcrumb.Section>
                                    <Breadcrumb.Divider className="fresheats-brown-color" />
                                    <Breadcrumb.Section>{activePage}</Breadcrumb.Section>
                                </Breadcrumb>
                            </h1>
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

                    <Menu.Item className="fresheats-brown-color" as='a' onClick={() => { this.changeActivePage("Home") }}>
                        <Icon name='home' />
                        Home
                    </Menu.Item>
                    <Menu.Item className="fresheats-brown-color" as='a' onClick={() => { this.changeActivePage("Orders")}}>
                        <Icon name='food' />
                        Orders
                    </Menu.Item>
                    <Divider/>
                    <Menu.Item className="fresheats-brown-color" as='a' onClick={() => { this.changeActivePage("Menu") }}>
                        <Icon name='clipboard' />
                        Menu
                    </Menu.Item>
                    <Menu.Item className="fresheats-brown-color" as='a' onClick={() => { this.changeActivePage("About") }}>
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