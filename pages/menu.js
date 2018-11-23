import { Label, Header, Container, Embed, Divider } from "semantic-ui-react"

import Router from "next/router"
import Layout from "../components/Layouts/Layout"
import MenuItems from "../components/Layouts/Features/Menu/MenuItems"

const Menu = (props) => (
    <div className="menuPageDiv" >
        <Layout title="Menu" includeContainer={false}>
            <div className="MenuImageContainerDiv">
                <Container>
                    {/* <span className="menu-header-back-span" >Taste the best</span> */}
                    <h3 className="menu-header-back-h3">Fresh Ingredients, Tasty Meals</h3>
                </Container>
            </div>
            <Divider hidden />
            <Container>
                <div className="centered-element">
                    <Header className="menu-header" as='h1'>Our Menu</Header>
                    <p>Everyone has taste, even if they don't realize it. Even if you're not a great chef, there's nothing to stop you understanding the difference between what tastes good and what doesn't.</p>
                </div>
                <Divider />

                <MenuItems />
            </Container>
        </Layout>
    </div>
)
export default Menu
