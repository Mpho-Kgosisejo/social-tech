import Router from "next/router"
import { Label, Header, Container, Embed, Divider } from "semantic-ui-react"
import Layout from "../components/Layouts/Layout"
import MenuItems from "../components/Layouts/Features/Menu/MenuItems"

class Menu extends React.Component{
    componentDidMount(){
        this.props.dispatch({type: "SIDEBAR", payload: false})
    }

    render(){
        return (
            <div className="menuPageDiv" >
                <Layout title="Menu" includeContainer={false}>
                    <div className="MenuImageContainerDiv">
                        <Container>
                            <Header as='h1'>First Header</Header>
                            <Header as='h1'>First Header</Header>
                        </Container>
                    </div>
                    <Divider hidden />
                    <Container>
                        <div className="centered-element">
                            <h2 >Just simple text</h2>
                            <p> This could be a paragraph explaining what the menu is about to grab the user.</p>
                        </div>
                        <MenuItems/>
                    </Container>
                </Layout>
            </div>
        )
    }
}

export default Menu