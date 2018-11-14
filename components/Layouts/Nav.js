import Link from "next/link"
import Router from "next/router"
import {Container, Menu, Image, Dropdown, Divider, Placeholder} from "semantic-ui-react"

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

const RightNav = () => (
    <ContextAPI.Consumer>
        {({state}) => (
            <React.Fragment>
                <Link href="/profile" prefetch passHref>
                    <Menu.Item as="a" className="fresheats-brown-color">
                        <Image
                            size="mini"
                            alt="no-image"
                            src={"http://i.pravatar.cc/100"}
                            avatar
                            style={{marginRight: "8px"}}
                        />
                        {state.login.username}
                    </Menu.Item>
                </Link>
                <Menu.Item as="a" onClick={() => handleLogout(state.dispatch)} className="fresheats-brown-color">Logout</Menu.Item>
            </React.Fragment>
        )}
    </ContextAPI.Consumer>
)

const Nav = () => (
    <Menu inverted fixed="top" className="appNav fresheats-green-bg">
        <Container>
            <ContextAPI.Consumer>
                {({state}) => (
                    <React.Fragment>
                        <Link href="/" prefetch passHref>
                            <Menu.Item as="a" className="fresheats-brown-color">Home</Menu.Item>
                        </Link>
                        <Link href="/gallery" prefetch passHref>
                            <Menu.Item as="a" className="fresheats-brown-color">Gallery</Menu.Item>
                        </Link>
                        <Dropdown text='About' className="fresheats-brown-color" simple item>
                            <Dropdown.Menu>
                                <Link href="/about" className="fresheats-brown-color" prefetch passHref>
                                    <Dropdown.Item as="a">Our Story</Dropdown.Item>
                                </Link>
                                <Divider />
                                <Link href="/about" prefetch passHref>
                                    <Dropdown.Item as="a">Our Story</Dropdown.Item>
                                </Link>
                                <Divider />
                                <Link href="/about" prefetch passHref>
                                    <Dropdown.Item as="a">Our Story</Dropdown.Item>
                                </Link>
                                <Divider />
                                <Link href="/about" prefetch passHref>
                                    <Dropdown.Item as="a">Our Story</Dropdown.Item>
                                </Link>
                            </Dropdown.Menu>
                        </Dropdown>
                        {(state.login && state.login.isAdmin) && 
                            <Link href="/dashboard" prefetch passHref>
                                <Menu.Item as="a" className="fresheats-brown-color">Dashboard</Menu.Item>
                            </Link>
                        }
                    
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