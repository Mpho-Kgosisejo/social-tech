import Router from "next/router"
import { Loader, Image, Card, Label, Button, Segment, Header, Container } from "semantic-ui-react"
import Layout from "../components/Layouts/Layout"
import MenuItems from "../components/Layouts/Features/Menu/menu-items"

const Menu = (props) => (
    <div className="menuPageDiv">
        <div className="MenuImageContainerDiv">
            <Container>
                <Header as='h1'>First Header</Header>
                <Header as='h1'>First Header</Header>
            </Container>
        </div>
        <Layout title="Menu">
            <MenuItems/>
        </Layout>
    </div>
)

export default Menu