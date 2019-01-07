import Link from "next/link"
import Router from "next/router"
import { Container, Menu, Image, Grid, Icon, Responsive, Dropdown, Label } from "semantic-ui-react"

import AuthLayout from "./Features/Auth/AuthLayout";
import ContextAPI from "../../src/config/ContextAPI"
import { logout } from "../../src/providers/LoginSession"
import { isEmptyObj } from "../../src/utils/Objs"
import * as MessageTypes from "../../src/Types/MessageTypes"
import { LIGHT_RED } from "../../src/Types/ColorsTypes";
import * as AboutHelper from "./Features/About/Helper"
import Avator from "../utils/Avator";

const handleLogout = (state) => {
    const {dispatch} = state

    logout()
    if ((`${Router.route}`).includes("/dashboard") || (`${Router.route}`).includes("/account"))
        Router.push({ pathname: "/" })
    dispatch({ type: "LOGIN", payload: {} })
    dispatch({ type: "ALERT_PORTAL", payload: { type: "", header: "", message: MessageTypes.SUCCESSFULLY_LOGGED_OUT, open: true } })
    dispatch({type: "SIDEBAR", payload: false})
}

const handleAboutDropdown = ({ dispatch, aboutState, index }) => {
    dispatch({ type: "ABOUT", payload: { ...aboutState, index } })
    dispatch({type: "SIDEBAR", payload: false})

    AboutHelper.RouterHandler({index})
}

const ResponsiveFragmentBugFix = () => (<div></div>)

const pushSideBar =({dispatch}) =>
{
    dispatch({ type: "SIDEBAR" })

    window.scrollTo({
        top: 0,
        behavior: "instant"
    })
}

const ResponsiveFix = () => <></>

export const RightNav = () => (
    <ContextAPI.Consumer>
        {({ state }) => (
            <React.Fragment>
                <Menu.Item className="fresheats-brown-color">
                    <Dropdown
                        trigger={
                            <span>
                                <Avator
                                    size="mini"
                                    url={null}
                                    avatar
                                    circular
                                    style={{ marginRight: "8px", display: "inline-block" }}
                                />
                                {state.login.username}
                            </span>
                        } 
                    // pointing='top left'
                    // icon={null}
                    >
                        <Dropdown.Menu className="profile fresheats-light-green-bg">
                            <Link href="/account" prefetch passHref>
                                <Menu.Item as="a">
                                    <Icon name="user" />
                                    Account
                                </Menu.Item>
                            </Link>
                            <Menu.Item as="a" onClick={() => handleLogout(state)}>
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
        {({ state }) => (
            <React.Fragment>
                <Menu.Item as="a" className="fresheats-brown-color" onClick={() => pushSideBar({dispatch: state.dispatch}) }>
                    {state.isSidebarOpen ? <Icon name="close" /> : <Icon name="bars" />}
                </Menu.Item>
            </React.Fragment>
        )}
    </ContextAPI.Consumer>
)

export const LeftComputerNav = () => (
    <ContextAPI.Consumer>
        {({ state }) => (
            <React.Fragment>
                <Link href="/" prefetch passHref>
                    <Menu.Item className="fresheats-brown-color nav-logo">
                        <img src="../static/imgs/Fresh-Eats-1.png"></img>
                    </Menu.Item>
                </Link>
                <Link href="/" prefetch passHref>
                    <Menu.Item as="a" className="fresheats-brown-color">Home</Menu.Item>
                </Link>
                <Link href="/menu" prefetch passHref>
                    <Menu.Item as="a" className="fresheats-brown-color">Menu</Menu.Item>
                </Link>
                <Dropdown text='About' className='link item fresheats-brown-color'>
                    <Dropdown.Menu className="about fresheats-light-green-bg">
                        <Dropdown.Item className="fresheats-brown-color" as="a" onClick={() => handleAboutDropdown({ dispatch: state.dispatch, aboutState: state.about, index: 0 })}>Our Story</Dropdown.Item>
                        <Dropdown.Item className="fresheats-brown-color" as="a" onClick={() => handleAboutDropdown({ dispatch: state.dispatch, aboutState: state.about, index: 1 })}>Our Chefs</Dropdown.Item>
                        <Dropdown.Item className="fresheats-brown-color" as="a" onClick={() => handleAboutDropdown({ dispatch: state.dispatch, aboutState: state.about, index: 2 })}>Contact Us</Dropdown.Item>
                        <Dropdown.Item className="fresheats-brown-color" as="a" onClick={() => handleAboutDropdown({ dispatch: state.dispatch, aboutState: state.about, index: 3 })}>FAQs</Dropdown.Item>
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
                        <Responsive maxWidth={991} as={"div"}>
                            {isEmptyObj(state.login) ? <AuthLayout /> : <Menu.Item as="a" onClick={() => handleLogout(state.dispatch)} className="fresheats-brown-color">Logout</Menu.Item>}
                            <Link href="/cart" prefetch passHref>
                                <Menu.Item as="a" className="fresheats-brown-color cart-icon">
                                    <Icon className="cart-icon-" name="cart" size="mini">
                                        {state.cart.details.itemsCount > 0 &&
                                            <Label circular size="mini" style={{background: LIGHT_RED}}>
                                                {state.cart.details.itemsCount}
                                            </Label>
                                        }
                                    </Icon>
                                    View Cart
                                </Menu.Item>
                            </Link>
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
    <ContextAPI.Consumer>
        {({ state }) => (
            <Menu inverted fixed="top" className={`appNav fresheats-light-green-bg signIn-button ${state.isSidebarOpen && "is-sidebar-open"} ${(Object.keys(state.main_layout_calculations).length > 0 && state.main_layout_calculations.topVisible && state.active_page === "index") ? "transparent" : ""}`}>
                <Container className="nav-container">
                    <React.Fragment>
                        <LeftNav />
                        {!state.root_loading &&
                            <Menu.Menu position="right">
                                {!isEmptyObj(state.login) ? <RightNav /> : <Responsive minWidth={992} as={React.Fragment}><AuthLayout /></Responsive>}
                            </Menu.Menu>
                        }
                        <Responsive minWidth={992} as={React.Fragment}>
                            <Link href="/cart" prefetch passHref>
                                <Menu.Item className="fresheats-brown-color">
                                <Icon className="cart-icon-nav" name="cart">
                                    {state.cart.details.itemsCount > 0 &&
                                        <Label circular size="mini" style={{background: LIGHT_RED}}>
                                            {state.cart.details.itemsCount}
                                        </Label>
                                    }
                                </Icon>
                                </Menu.Item>
                            </Link>
                        </Responsive>
                    </React.Fragment>
                </Container>
            </Menu>
        )}
    </ContextAPI.Consumer>
)
export default Nav