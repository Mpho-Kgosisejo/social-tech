import Router from "next/router"

import Layout from "../components/Layouts/Layout"
import ContextAPI from "../src/config/ContextAPI"
import MenuItems from "../components/Layouts/Features/Menu/menu-items"

const Menu = (props) => (
    <Layout title="Menu">
        <MenuItems/>
    </Layout>
)

Menu.getInitialProps

export default Menu