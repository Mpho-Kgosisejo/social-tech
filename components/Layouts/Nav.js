import Link from "next/link"
import Router from "next/router"
import {Container, Menu, Image, Dropdown, Divider} from "semantic-ui-react"

import AuthLayout from "./Features/Auth/AuthLayout";
import ContextAPI from "../../src/config/ContextAPI"
import {logout} from "../../src/providers/LoginSession"

const handleLogout = () => {
    logout()
    Router.push({pathname: "/"})
    location.reload(true)
}

const RightNav = () => (
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
                {"Username"}
            </Menu.Item>
        </Link>
        <Menu.Item as="a" onClick={handleLogout} className="fresheats-brown-color">Logout</Menu.Item>
    </React.Fragment>
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
                                {state.loggedIn ? <RightNav /> : <AuthLayout/>}
                            </Menu.Menu>
                        }
                    </React.Fragment>
                )}
            </ContextAPI.Consumer>
        </Container>
    </Menu>
)
export default Nav