import Link from "next/link"
import Router from "next/router"
import {Container, Menu, Image} from "semantic-ui-react"

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
                        <Link href="/about" prefetch passHref>
                            <Menu.Item as="a" className="fresheats-brown-color">About</Menu.Item>
                        </Link>

                        <Link href="/menu" prefetch passHref>
                            <Menu.Item as="a">Menu</Menu.Item>
                        </Link>
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