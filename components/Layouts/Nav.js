import Link from "next/link"
import Router from "next/router"
import {Container, Menu, Image, Grid, Icon, Responsive, Dropdown} from "semantic-ui-react"

import AuthLayout from "./Features/Auth/AuthLayout";
import ContextAPI from "../../src/config/ContextAPI"
import {logout} from "../../src/providers/LoginSession"
import {isEmptyObj} from "../../src/utils/Objs"
import * as MessageTypes from "../../src/Types/MessageTypes"

const handleLogout = (dispatch) => {
    logout()
    Router.push({pathname: "/"})
    dispatch({type: "LOGIN", payload: {}})
    dispatch({type: "ALERT_PORTAL", payload: {type: "", header: "", message: MessageTypes.SUCCESSFULLY_LOGGED_OUT, open: true}})
}

const handleAboutDropdown = ({dispatch, aboutState, index}) => {
    dispatch({type: "ABOUT", payload: {...aboutState, index}})

    switch (index) {
        case 0:
            Router.push({pathname: "/about", query: { tab: 'ourstory' }})
            break;
        case 1:
            Router.push({pathname: "/about", query: { tab: 'ourchefs' }})       
            break;
        case 2:
        Router.push({pathname: "/about", query: { tab: 'ourcontacts' }})
            break;
        case 3:
        Router.push({pathname: "/about", query: { tab: 'ourfaqs' }})
            break;
    }
}

const ResponsiveFragmentBugFix = () => (<></>)

const RightNav = () => (
    <ContextAPI.Consumer>
        {({state}) => (
            <React.Fragment>
                <Menu.Item className="fresheats-brown-color">
                    <Dropdown
                        trigger={
                            <span>
                                <Image
                                    size="mini"
                                    alt="no-image"
                                    src={"http://i.pravatar.cc/100"}
                                    avatar
                                    style={{marginRight: "8px"}}
                                />
                                {state.login.username}
                            </span>
                        }
                        // pointing='top left'
                        // icon={null}
                    >
                        <Dropdown.Menu className="fresheats-light-green-bg">
                            <Link href="/profile" prefetch passHref>
                                <Menu.Item as="a">
                                    <Icon name="user" />
                                    Profile
                                </Menu.Item>
                            </Link>
                            <Menu.Item as="a" onClick={() => handleLogout(state.dispatch)}>
                                <Icon name="sign out" />
                                Logout    
                            </Menu.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </React.Fragment>
        )}
    </ContextAPI.Consumer>
)

const LeftTabletNav = () => (
    <ContextAPI.Consumer>
        {({state}) => (
            <React.Fragment>
                <Link href="/" prefetch passHref>
                    <Menu.Item as="a" className="fresheats-brown-color">Home</Menu.Item>
                </Link>
                <Menu.Item as="a" className="fresheats-brown-color" onClick={() => state.dispatch({type: "SIDEBAR"})}>
                    <Icon name="bars"  />
                </Menu.Item>
            </React.Fragment>
        )}
    </ContextAPI.Consumer>
)

export const LeftComputerNav = () => (
    <ContextAPI.Consumer>
        {({state}) => (
            <React.Fragment>
                <Link href="/" prefetch passHref>
                    <Menu.Item as="a" className="fresheats-brown-color">Home</Menu.Item>
                </Link>
                <Dropdown text='About' className='link item fresheats-brown-color'>
                    <Dropdown.Menu className="fresheats-light-green-bg">
                        <Dropdown.Item className="fresheats-brown-color" as="a" onClick={() => handleAboutDropdown({dispatch: state.dispatch, aboutState: state.about, index: 0})}>Our Story</Dropdown.Item>
                        <Dropdown.Item className="fresheats-brown-color" as="a" onClick={() => handleAboutDropdown({dispatch: state.dispatch, aboutState: state.about, index: 1})}>Our Chefs</Dropdown.Item>
                        <Dropdown.Item className="fresheats-brown-color" as="a" onClick={() => handleAboutDropdown({dispatch: state.dispatch, aboutState: state.about, index: 2})}>Contact Us</Dropdown.Item>
                        <Dropdown.Item className="fresheats-brown-color" as="a" onClick={() => handleAboutDropdown({dispatch: state.dispatch, aboutState: state.about, index: 3})}>FAQs</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Link href="/gallery" prefetch passHref>
                    <Menu.Item as="a" className="fresheats-brown-color">Gallery</Menu.Item>
                </Link>
                {(state.login) && (
                    <React.Fragment>
                        {state.login.isAdmin && (
                            <Link href="/dashboard" prefetch passHref>
                                <Menu.Item as="a" className="fresheats-brown-color">Dashboard</Menu.Item>
                            </Link>
                        )}
                        <Responsive maxWidth={991} as={React.Fragment}>
                            <Menu.Item as="a" onClick={() => handleLogout(state.dispatch)} className="fresheats-brown-color">Logout</Menu.Item>
                        </Responsive>
                    </React.Fragment>
                )}
            </React.Fragment>
        )}
    </ContextAPI.Consumer>
)

const LeftNav = () => (
    <Grid columns="equal">
        <Grid.Row only="computer">
            <LeftComputerNav />
        </Grid.Row>
        <Grid.Row only="mobile tablet">
            <LeftTabletNav />
        </Grid.Row>
    </Grid>
)

const Nav = () => (
    <Menu inverted fixed="top" className="appNav fresheats-light-green-bg">
        <Container className="nav-container">
            <ContextAPI.Consumer>
                {({state}) => (
                    <React.Fragment>
                        <LeftNav />
                    
                        {!state.root_loading &&
                            <Menu.Menu position="right">
                                {!isEmptyObj(state.login) ? <RightNav /> : <AuthLayout/>}
                            </Menu.Menu>
                        }
                    </React.Fragment>
                )}
            </ContextAPI.Consumer>
        </Container>
    </Menu>
)
export default Nav