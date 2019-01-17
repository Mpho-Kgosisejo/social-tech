import { Grid, Header, Container, Search, Divider, Input, Responsive } from "semantic-ui-react"

import Router from "next/router"
import ContextAPI from "../src/config/ContextAPI";
import Layout from "../components/Layouts/Layout"
import MenuTab from "../components/Layouts/Features/Menu/MenuTab"
import api from "../src/providers/APIRequest"
import { MainMessage } from "../components/Messages/Message";
import { PlaceholderSmallParagraphImage, PlaceHolderMenu } from "../components/utils/Placeholders";
import PageHeader from "../components/utils/PageHeader"

class Menu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMessage: "",
            isLoadingData: true,
            searchResult : {},
            isSearching : false,
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
            // this.props.dispatch({ type: "ORIGINAL_MENU", payload: menu })
            this.setState({ isLoadingData: false })
        } else {
            this.setState({ errorMessage: data.error.message, isLoadingData: false })
        }
    }

    filterList = async (event, state) => {
        const dispatch = state.dispatch
        const index = state.menu.index
        const menuList = state.menu.data[index]
        let currentList = [];
        let newList = [];

        // If the search bar isn't empty
        if (event.target.value !== "") {
            currentList = menuList.items

            newList = currentList.filter(item => {
                const lc = item.name.toLowerCase()
                const filter = event.target.value.toLowerCase()

                return lc.includes(filter)
            })

            if (newList.length > 0)
            {
                state.menu.data[index].items = newList
                const menu = state.menu
                dispatch({ type: "MENU", payload: menu })
            }
        }
        else {
            const data = await api.menu.menu_items()

            if (data.status === 200) {
                const menu_res = data.data.menuWithProducts

                const menu = {
                    index,
                    data: menu_res
                }
                this.props.dispatch({ type: "MENU", payload: menu })
            }
            else {
                this.setState({ errorMessage: data.error.message, isLoadingData: false })
            }
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
                    <PageHeader
                        color="rgb(212, 195, 176)"
                        title="Taste the best"
                        subtitle="Fresh Ingredients, Tasty Meals"
                        image="https://s3.envato.com/files/128199564/Restaurant%20Identity%20Branding%20Mock-Up_Previews%20Image%20Set/01_preview1.jpg"
                    />

                    <Divider hidden />
                    <Container>
                        <Grid>
                            <Grid.Column>
                                <div className="centered-element">
                                    <Header className="menu-header" as='h1'>Our Menu</Header>
                                    <p>Everyone has taste, even if they don't realize it. Even if you're not a great chef, there's nothing to stop you understanding the difference between what tastes good and what doesn't.</p>
                                </div>
                                <Responsive minWidth={0} maxWidth={767}>
                                    <Input fluid icon='search' type="text" onChange={() => this.filterList(event, state)} placeholder='Search...' />
                                </Responsive>
                                <Responsive minWidth={768}>
                                <ContextAPI.Consumer>
                                    {({ state }) => (
                                        <Input className="menu-search-bar" icon='search' type="text" onChange={() => this.filterList(event, state)} placeholder='Search...' />
                                    )}
                                </ContextAPI.Consumer>
                                </Responsive>
                                
                            </Grid.Column>
                        </Grid>
                        <Divider />
                        {
                            this.state.isLoadingData ? <PlaceHolderMenu active inline='centered'>Loading Menu</PlaceHolderMenu> :
                                <ContextAPI.Consumer>
                                    {({ state }) => (
                                        state.menu.data.length > 0 ? <MenuTab />  : <MainMessage type="error" icon="exclamation" header="Menu Error" message={this.state.errorMessage} />
                                    )}
                                </ContextAPI.Consumer>
                        }
                    </Container>
                    <Divider></Divider>
                    <pre>{JSON.stringify(this.state, "", 2)}</pre>
                </Layout>
            </div>
        )
    }
}

export default Menu
