import { Tab, Card } from "semantic-ui-react"
import MenuCard from "./menu_card"
import { isEmptyObj } from "../../../../src/utils/Objs";

class menu_tab extends React.Component
{
    render()
    {
        console.log("mjgnjhhhhnjj>>", this.props.data)
        return(
            <Tab className="centered-element" menu={{pointing: true, secondary: true }} panes={
                this.props.data.map( item => (
                    item.show ? 
                    { menuItem: item.title , render: () => <Tab.Pane className="zero-border" attached={false}>{ 
                        <Card.Group doubling itemsPerRow={3} stackable>
                            {isEmptyObj(item.items) ? console.log("found empty") : null }
                            { item.items.map(product => (
                                <MenuCard key={product.id} {...product} />
                            ))}
                        </Card.Group>
                    }</Tab.Pane>  } : console.log("Not showing ", item.title)
                ))
            } />
        )
    }
}

export default menu_tab