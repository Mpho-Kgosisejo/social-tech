import Router from "next/router"
import { Label, Header, Container, Embed } from "semantic-ui-react"
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
            <div className="centered-element">
                <h2 >Just simple text</h2>
                <p> This could be a paragraph explaining what the menu is about to grab the user.</p>
            </div>
            <MenuItems/>
        </Layout>
    </div>
)

export default Menu