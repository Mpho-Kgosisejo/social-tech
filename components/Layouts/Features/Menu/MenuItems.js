import { Loader } from "semantic-ui-react"

import api from "../../../../src/providers/APIRequest"
import { isEmptyObj } from "../../../../src/utils/Objs"
import MenuTab from "./MenuTab"
import { MainMessage } from "../../../Messages/Message";
import ContextAPI from "../../../../src/config/ContextAPI";

class Menu_Items extends React.Component {

    render() {
        return (
            <div >
                {/* {isLoadingData ? <Loader active inline='centered'>Loading Menu</Loader> :
                    status === 200 ?
                        <MenuTab data={menus} />
                        :
                        <MainMessage type="error" header="Menu Error" message={responseMessage} />
                } */}
                <ContextAPI.Consumer>
                    {({state}) => (
                        state.menu.data.length > 0 && <MenuTab />
                    )}
                </ContextAPI.Consumer>
            </div>
        )
    }
}

export default Menu_Items   