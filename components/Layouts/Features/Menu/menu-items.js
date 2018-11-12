import api from "../../../../src/providers/APIRequest"
import { Loader, Image, Card, Label, Button, Reveal } from "semantic-ui-react"
import {isEmptyObj} from "../../../../src/utils/Objs"
import {MILKY_RED} from "../../../../src/Types/ColorsTypes"
import MenuCard from "./menu_card"

class Menu_Items extends React.Component {
    constructor()
    {
        super()
        this.state = {
            responseMessage : "",
            isLoadingData : true,
            foodmenu : {}
        }
    }

    getMenu = async () => {
        const data = await api.Foodmenu.Foodmenu_items()
        console.log(data)

        if (data.status === 200){
            this.setState({responseMessage: data.data.message, isLoadingData: false, foodmenu : data.data.Foodmenu})
        }else{
            this.setState({responseMessage: data.error.message, isLoadingData: false})
        }
        
    }

    componentDidMount(){
        this.getMenu()
    }

    render () {
        const {isLoadingData, foodmenu} = this.state

        return(
            <div>
                {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}
                
                {isLoadingData ? <Loader active inline='centered'>Loading Menu</Loader> : 
                    <Card.Group doubling itemsPerRow={3} stackable>
                        {foodmenu.map(item => (
                            <MenuCard key={item.id} {...item} />
                        ))}
                    </Card.Group>
                }
            </div>
        )}
}

export default Menu_Items   