import api from "../../../../src/providers/APIRequest"
import { Loader, Image, Card, Label, Button, Reveal, Tab } from "semantic-ui-react"
import {isEmptyObj} from "../../../../src/utils/Objs"
import MenuTab from "./menu-tab"

class Menu_Items extends React.Component {
    constructor()
    {
        super()
        this.state = {
            responseMessage : "",
            isLoadingData : true,
            menus : {}
        }
    }

    getMenu = async () => {
        const data = await api.menu.menu_items()
        console.log(data)

        if (data.status === 200){
            this.setState({responseMessage: data.data.message, isLoadingData: false, menus : data.data.menuCategories})
        }else{
            this.setState({responseMessage: data.error.message, isLoadingData: false})
        }
        
    }

    componentDidMount(){
        this.getMenu()
    }

    render () {
        const {isLoadingData, menus} = this.state

        return(
            <div>
                {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}
                
                {isLoadingData ? <Loader active inline='centered'>Loading Menu</Loader> : 
                  <MenuTab data={menus}/>  
                }
            </div>
        )}
}

export default Menu_Items   