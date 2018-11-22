import React from 'react'
import { Icon, Menu, Sidebar, Dropdown, Divider, Container } from 'semantic-ui-react'
import "../../../../static/css/dashboard.css"
import DashboardMainPage from './DashboardPages/DashboardMainPage';
import DashboardMenuPage from './DashboardPages/DashboardMenuPage';
import DashboardAboutsPage from './DashboardPages/DashboardAboutsPage'
import DashboardOrdersPage from './DashboardPages/DashboardOrdersPage'
import { RightNav } from '../../Nav';


class DashboardSidebar extends React.Component{

    constructor()
    {
        super()
        this.state = {
            activePage : 'home',
            openSidebar : false
        }
    }

    changeActivePage = (name) => {
        this.setState({activePage : name, openSidebar: false})
    }

    showSideBars = () => {
        if (this.state.openSidebar === true)
            this.setState({openSidebar : false})
        else
            this.setState({openSidebar : true})
    }

    renderPage = (pageName)  => {
        switch (pageName){
            case "home": 
                return(
                    <DashboardMainPage/>
                )
            case "orders" :
                return (
                    <DashboardOrdersPage/>
                )
            case "menu" :
                return (
                    <DashboardMenuPage/>
                )
            case "about" :
                return (
                    <DashboardAboutsPage/>
                )
            default :
                return (
                    <DashboardMainPage/>
                )
        }
    }

    render(){
        const {activePage, openSidebar} = this.state
        return (
            <div>
                <div className="dashboard-page-header fresheats-light-green-bg">
                    <Menu secondary>
                        <Menu.Item onClick={this.showSideBars}> 
                            <Icon className="header-content" name={openSidebar ? 'close' : 'bars'}/>
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
                    <Menu.Item className="fresheats-brown-color" as='a' onClick={() => { this.changeActivePage("orders")}}>
                        <Icon name='food' />
                        Orders
                    </Menu.Item>
                    <Divider/>
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
                            { this.renderPage(activePage) }

                            <pre>{JSON.stringify(this.state, "", 1)}</pre>
                        </div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default DashboardSidebar