import { Tab, Card, Responsive, Dropdown, Segment } from "semantic-ui-react"
import MenuCard from "./MenuCard"
import { isEmptyObj } from "../../../../src/utils/Objs";
import IconMessage from "../../../Messages/IconMessage"

class menu_tab extends React.Component
{
    state = {
        activeIndex: 0
    }

    changeActiveIndex = (e, { value }) => {
        this.setState({activeIndex : value})
    }

    handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

    render()
    {
        var newData = this.props.data[this.state.activeIndex]
        //console.log(newData)
        return(
            <div>
                <Responsive minWidth={0} maxWidth={769}>
                    <Dropdown placeholder='Category' className="marginTopBottom centered-element" fluid selection onChange={this.changeActiveIndex} options={
                        this.props.data.map(item => (
                            { key: item._id, text: item.title, value: this.props.data.indexOf(item)}
                        ))
                    } selection />
                </Responsive>
                <Responsive minWidth={769} >
                    <Tab className="centered-element zero-border" activeIndex={this.state.activeIndex} onTabChange={this.handleTabChange} menu={{pointing: true, secondary: true }} panes={
                    this.props.data.map( item => (
                        item.show ? 
                        { menuItem: item.title } : console.log("Not showing ", item.title)
                    ))
                } />
                </Responsive>
                <div className="zero-border marginTopBottom">
                        <Card.Group doubling itemsPerRow={3} stackable>
                        {isEmptyObj(newData.items) ? IconMessage("exclamation", "Menu Error!", "Unfortunately the " + newData.title + " category has no products.") : 
                            newData.items.map(product => (
                                <MenuCard key={product._id} {...product} />
                            ))
                        }
                        </Card.Group>
                </div>
            </div>
        )
    }
}

// , render: () => <Tab.Pane className="zero-border" attached={false}>{ 
//     <Card.Group doubling itemsPerRow={3} stackable className="zero-border">
//         {isEmptyObj(item.items) ? IconMessage("exclamation", "Menu Error!", "Unfortunately the " + item.title + " category has no products.") : 
//             item.items.map(product => (
//                 <MenuCard key={product.id} {...product} />
//             ))
//         }
//     </Card.Group>
// }</Tab.Pane>  

export default menu_tab