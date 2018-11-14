import api from "../../../../src/providers/APIRequest"
import { Loader } from "semantic-ui-react"
import {isEmptyObj} from "../../../../src/utils/Objs"
import MenuTab from "./menu-tab"
import { MainMessage } from "../../../Messages/Message";

class Menu_Items extends React.Component {
    constructor()
    {
        super()
        this.state = {
            responseMessage : "",
            isLoadingData : true,
            menus : {},
            status : 0
        }
    }

    getMenu = async () => {
        const data = await api.menu.menu_items()
        console.log(data)

        if (data.status === 200){
            this.setState({responseMessage: data.data.message, isLoadingData: false, menus : data.data.menuCategories, status : data.status})
        }else{
            this.setState({responseMessage: data.error.message, isLoadingData: false, status : data.status})
        }
        
    }

    componentDidMount(){
        this.getMenu()
    }

    render () {
        const {responseMessage, status, isLoadingData, menus} = this.state

        return(
            <div >
                {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}
                
                {isLoadingData ? <Loader active inline='centered'>Loading Menu</Loader> : 
                    status === 200 ? 
                        <MenuTab data={menus}/>  
                    :   
                        <MainMessage type="error" header="Menu Error" message={responseMessage}/> 
                } 
            </div>
        )}
}

export default Menu_Items   