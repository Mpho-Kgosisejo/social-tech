import Link from "next/link"
import {Container, Menu} from "semantic-ui-react"

const Nav = () => (
    <Menu inverted fixed="top">
        <Container>
            <Link href="/" prefetch passHref>
                <Menu.Item as="a">Home</Menu.Item>
            </Link>
            <Link href="/about" prefetch passHref>
                <Menu.Item as="a">About</Menu.Item>
            </Link>
        </Container>
    </Menu>
)

export default Nav