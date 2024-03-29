import { Tab, Card, Responsive, Dropdown, Segment, Container, Message } from "semantic-ui-react"
import Router from "next/router"

import MenuCard from "./MenuCard"
import { isEmptyObj } from "../../../../src/utils/Objs"
import { ErrorMessage, WarningMessage, InfoMessage, GreyMessage } from "../../../Messages/Message"
import ContextAPI from "../../../../src/config/ContextAPI";

class menu_tab extends React.Component {
    handleTabChange = ({ index, state }) => {
        const dispatch = state.dispatch
        const menu = state.menu.data
        const tab = state.menu.data[index].name

        dispatch({ type: "MENU", payload: { index, data: menu } })

        Router.replace({ pathname: "/menu", query: { tab } })
    }

    render() {
        // var newData = this.props.data[this.state.activeIndex]

        return (
            <ContextAPI.Consumer>
                {({ state }) => (
                    <div>
                        <Responsive minWidth={0} maxWidth={769}>

                            <Dropdown defaultValue={state.menu.index} className="marginTopBottom centered-element" fluid selection onChange={(e, { value }) => this.handleTabChange({ index: value, state })} options={
                                state.menu.data.map(item => (
                                    { key: item._id, text: item.title, value: state.menu.data.indexOf(item) }
                                ))
                            } selection />
                        </Responsive>
                        <Responsive minWidth={769} >
                            <Tab className="centered-element zero-border" activeIndex={state.menu.index} onTabChange={(e, { activeIndex }) => this.handleTabChange({ index: activeIndex, state })} menu={{ pointing: true, secondary: true }} panes={
                                state.menu.data.map(item => (
                                    item.show ?
                                        { menuItem: item.title } : null
                                ))
                            } />
                        </Responsive>
                        <div className="zero-border marginTopBottom">
                            <Card.Group doubling itemsPerRow={3} stackable>
                                {isEmptyObj(state.menu.data[state.menu.index].items) ?
                                    <Container><GreyMessage icon="exclamation" header="Menu Error!" message={`Unfortunately the ${state.menu.data[state.menu.index].title} category has no products`} /></Container>
                                    :
                                    state.menu.data[state.menu.index].items.map(product => (
                                        <MenuCard key={product._id} {...product} />
                                    ))
                                }
                            </Card.Group>
                        </div>
                    </div>
                )}
            </ContextAPI.Consumer>
        )
    }
}
export default menu_tab