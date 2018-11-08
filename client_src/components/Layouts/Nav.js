import Link from "next/link"
import Router from "next/router"
import {Container, Menu, Image, Dropdown} from "semantic-ui-react"

import AuthLayout from "./Features/Auth/AuthLayout";
import ContextAPI from "../../src/config/ContextAPI"
import {logout} from "../../src/providers/LoginSession"

const handleLogout = () => {
    logout()
    Router.push({pathname: "/"})
    location.reload(true)
}

const options = [
    { key: 1, text: 'Our Story', value: 1 },
    { key: 2, text: 'Our Chefs', value: 2 },
    { key: 3, text: 'Contact Us', value: 3 },
    { key: 4, text: 'FAQs', value: 4 },
  ]

const RightNav = () => (
    <React.Fragment>
        <Link href="/profile" prefetch passHref>
            <Menu.Item as="a">
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
        <Menu.Item as="a" onClick={handleLogout}>Logout</Menu.Item>
    </React.Fragment>
)

const Nav = () => (
    <Menu inverted secondary fixed="top" className="appNav">
        <Container>
            <ContextAPI.Consumer>
                {({state}) => (
                    <React.Fragment>
                        <Link href="/" prefetch passHref>
                            <Menu.Item as="a">Home</Menu.Item>
                        </Link>

                        <Link href="/about" prefetch passHref>
                            <Dropdown text='About' options={options} simple item />
                        </Link>
                        <Link href="/gallery" prefetch passHref>
                            <Menu.Item as="a">Gallery</Menu.Item>
                        </Link>
                        {(state.login && state.login.isAdmin) && 
                            <Link href="/dashboard" prefetch passHref>
                                <Menu.Item as="a">Dashboard</Menu.Item>
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