import Router from "next/router"
import { Loader, Image, Card, Label, Button } from "semantic-ui-react"
import Layout from "../components/Layouts/Layout"
import MenuItems from "../components/Layouts/Features/Menu/menu-items"

const Menu = (props) => (
    <>
        <Image className="menuImage" src="https://i0.wp.com/www.healthline.com/hlcmsresource/images/AN_images/best-foods-for-diabetes-1296x728.jpg?w=1155&h=1528" fluid/>
        <Layout title="Menu">
            <MenuItems/>
        </Layout>
    </>
)

export default Menu