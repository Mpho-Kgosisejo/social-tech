import Link from "next/link"
import {Container, Menu, Button} from "semantic-ui-react"
import AuthLayout from "./Auth/AuthLayout";

const Nav = () => (
    <Menu inverted fixed="top">
        <Container>
            <Link href="/" prefetch passHref>
                <Menu.Item as="a">Home</Menu.Item>
            </Link>
            <Link href="/about" prefetch passHref>
                <Menu.Item as="a">About</Menu.Item>
            </Link>

            <Menu.Menu position="right">
                <AuthLayout/>
            </Menu.Menu>
        </Container>
    </Menu>
)

export default Nav