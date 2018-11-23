import { Loader, Header, Container, Embed, Divider } from "semantic-ui-react"

import Router from "next/router"
import ContextAPI from "../src/config/ContextAPI";
import Layout from "../components/Layouts/Layout"
import MenuTab from "../components/Layouts/Features/Menu/MenuTab"
import api from "../src/providers/APIRequest"
import { MainMessage } from "../components/Messages/Message";

class Menu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMessage: "",
            isLoadingData: true
        }
    }

    getMenu = async (tab) => {
        const data = await api.menu.menu_items()

        if (data.status === 200) {
            const menu_res = data.data.menuWithProducts
            let index = 0

            menu_res.forEach(el => {
                if (tab === el.name)
                    index = menu_res.indexOf(el)
            });
            const menu = {
                index,
                data: menu_res
            }
            this.props.dispatch({ type: "MENU", payload: menu })
            this.setState({ isLoadingData: false })
        } else {
            this.setState({ errorMessage: data.error.message, isLoadingData: false })
        }
    }

    componentDidMount() {
        const { tab } = this.props.router.query
        this.props.dispatch({ type: "SIDEBAR", payload: false })
        this.props.dispatch({type: "PAGE", payload: "menu"})


        this.getMenu(tab)
    }

    render() {
        return (
            <div className="menuPageDiv" >
                <Layout title="Menu" includeContainer={false}>
                    <div className="MenuImageContainerDiv">
                        <Container>
                            <span className="menu-header-back-span" >Taste the best</span>
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
                        {
                            this.state.isLoadingData ? <Loader active inline='centered'>Loading Menu</Loader> :
                                <ContextAPI.Consumer>
                                    {({ state }) => (
                                        state.menu.data.length > 0 ? <MenuTab /> : <MainMessage type="error" icon="exclamation" header="Menu Error" message={this.state.errorMessage} />
                                    )}
                                </ContextAPI.Consumer>
                        }
                    </Container>
                </Layout>
            </div>
        )
    }
}

export default Menu
