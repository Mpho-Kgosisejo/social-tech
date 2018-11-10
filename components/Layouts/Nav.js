import Link from "next/link"
import Router from "next/router"
import {Container, Menu, Image, Placeholder} from "semantic-ui-react"

import AuthLayout from "./Features/Auth/AuthLayout";
import ContextAPI from "../../src/config/ContextAPI"
import {logout} from "../../src/providers/LoginSession"
import {isEmptyObj} from "../../src/utils/Objs"

const handleLogout = (dispatch) => {
    logout()
    Router.push({pathname: "/"})
    dispatch({type: "LOGIN", payload: {}})
}

const RightNav = () => (
    <ContextAPI.Consumer>
        {({state}) => (
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
                <Menu.Item as="a" onClick={() => handleLogout(state.dispatch)}>Logout</Menu.Item>
            </React.Fragment>
        )}
    </ContextAPI.Consumer>
)

const Nav = () => (
    <Menu inverted fixed="top" className="appNav">
        <Container>
            <ContextAPI.Consumer>
                {({state}) => (
                    <React.Fragment>
                        <Link href="/" prefetch passHref>
                            <Menu.Item as="a">Home</Menu.Item>
                        </Link>
                        <Link href="/about" prefetch passHref>
                            <Menu.Item as="a">About</Menu.Item>
                        </Link>
                        {(state.login && state.login.isAdmin) && 
                            <Link href="/dashboard" prefetch passHref>
                                <Menu.Item as="a">Dashboard</Menu.Item>
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